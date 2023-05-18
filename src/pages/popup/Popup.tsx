import React, { useEffect } from "react";
import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";

const NGROK_URL = "https://e480-136-24-74-186.ngrok-free.app";

const Popup = () => {
  const [factCheck, setFactCheck] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  useEffect(() => {
    const init = async () => {
      console.log("popup script loaded");
      const queryOptions = { active: true, lastFocusedWindow: true };
      // `tab` will either be a `tabs.Tab` instance or `undefined`.
      const [tab] = await chrome.tabs.query(queryOptions);
      // console.log("tab: ", tab);
      const currentUrl = tab.url;
      // console.log(currentUrl);
      const params = new URLSearchParams(new URL(currentUrl).search);
      const videoId = params.get("v");
      if (videoId === null) {
        return;
      }
      console.log(videoId); // Output: OeZca1UljWw
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {});
      });
      fetch(`${NGROK_URL}/get_summarized_topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoid: videoId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          console.log(data);
          // Handle the response data
          const result = JSON.parse(data["result"]);
          setFactCheck(result);
          setTags(Object.keys(result));
          console.log(result);
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              const currentUrl = tabs[0].url;
              const response = {
                result: result,
                url: currentUrl,
              };
              chrome.tabs.sendMessage(tabs[0].id, response);
            }
          );
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error:", error);
        });
    };
    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>I didn't say that!</h1>
        {factCheck ? <div>DONE</div> : <div>fact check loading...</div>}
      </header>
    </div>
  );
};

export default Popup;
