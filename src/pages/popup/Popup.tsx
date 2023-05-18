import React, { useEffect } from "react";
import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";

const Popup = () => {
  const [factCheck, setFactCheck] = React.useState(null);
  useEffect(() => {
    console.log("content view loaded");
    // fetch("http://10.10.245.96:8080/get_summarized_topics", {
    console.log("BROK");
    fetch("https://e480-136-24-74-186.ngrok-free.app/get_summarized_topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoid: "2SORT6-Fv8s" }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log("KALE");
        console.log(data);
        console.log(data["result"]);
        const result = JSON.parse(data["result"]);
        console.log(result);
        setFactCheck(data["result"]);
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            const currentUrl = tabs[0].url;
            const response = {
              result: result,
              url: currentUrl,
            };
            // const message = { message: "hello world" };
            // console.log("sending message");
            // chrome.tabs.sendMessage(tabs[0].id, message);
            chrome.tabs.sendMessage(tabs[0].id, response);
          }
        );
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>I didn't say that!</h1>
        {factCheck ? <div>{factCheck}</div> : <div>fact check loading...</div>}
      </header>
    </div>
  );
};

export default Popup;
