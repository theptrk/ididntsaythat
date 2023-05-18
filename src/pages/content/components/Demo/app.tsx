import { useEffect, useState } from "react";

// Define the YouTubeVideo component
function YouTubeVideo(props: { videoId: string }) {
  const videoUrl = `https://www.youtube.com/embed/${props.videoId}`;

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
function TagSection(props: { tag: string; tagDetails: string }) {
  const tagDivStyles = {
    padding: "5px",
    margin: "5px",
  };
  const tagStyles = {
    backgroundColor: "#FBCFE8",
    borderRadius: "15px",
    color: "#DB2777",
    padding: "5px 10px",
    margin: "5px",
  };

  return (
    <div style={tagDivStyles}>
      <span style={tagStyles}>#{props.tag}</span>
      <div style={{ margin: "15px" }}>
        {props.tagDetails ? props.tagDetails : "No details available"}
        {/* <div>
          Here are three easy breakfast recipes to try during the week! Merguez
          & fontina stuffed croissants, Spiced egg & spinach breakfast wrap &
          the classic Scotch egg.
        </div>
        <div>comment 2</div>
        <div>comment 3</div> */}
        {/* <YouTubeVideo videoId="d-XL05EYWrQ" />{" "} */}
      </div>
    </div>
  );
}
export default function App() {
  const [tags, setTags] = useState([]); // ["breakfast", "lunch", "dinner"
  const [tagOverview, setTagOverview] = useState(null);
  // useEffect(() => {
  //   console.log("content view loaded");
  //   setTags(["breakfast", "lunch", "dinner"]);

  //   // fetch("http://10.10.245.96:8080/get_summarized_topics", {
  //   console.log("BROK");
  //   fetch("https://e480-136-24-74-186.ngrok-free.app", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ videoid: "2SORT6-Fv8s" }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle the response data
  //       console.log("KALE");
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.error("Error:", error);
  //     });
  // }, []);
  useEffect(() => {
    const handleMessage = (message) => {
      console.log(message); // You can access the message object here
      setTagOverview(message["result"]);
      setTags(Object.keys(message["result"]));
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div className="content-view" style={{ marginBottom: "1500px" }}>
      Open Debate-ly
      <div className="mb-2">
        {Object.keys(tagOverview || {}).map((tag, index) => (
          <div key={index}>
            <TagSection tag={tag} tagDetails={tagOverview[tag]} />
          </div>
        ))}
      </div>
    </div>
  );
}
