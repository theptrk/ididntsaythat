import { log } from "console";
import { useEffect, useState } from "react";

// Define the YouTubeVideo component
function YouTubeVideo(props: { videoId: string; summary: string }) {
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
// Define the YouTubeVideo component
function YouTubeVideoNew(props: { videoId: string; summary: string }) {
  const videoUrl = `https://www.youtube.com/embed/${props.videoId}`;

  return (
    <div>
      <div>{props.summary}</div>
      <div style={{ display: "flex" }}>
        <div className="bg-gray-200 p-4">
          <iframe
            // width="560"
            // height="315"
            width="336"
            height="189"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="bg-gray-200 p-4">{props.summary}</div>
      </div>
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

  const sentences = props.tagDetails.split(". ");

  return (
    <div style={tagDivStyles}>
      <span style={tagStyles}>#{props.tag}</span>
      <div style={{ margin: "15px" }}>
        {/* {props.tagDetails ? props.tagDetails : "No details available"} */}
        <ul>
          {sentences.map((sentence, index) => (
            <li key={index}>{sentence}</li>
          ))}
        </ul>
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
function logVideoTimestamp() {
  // Find the video element on the page
  var videoElement = document.querySelector("video");

  if (videoElement) {
    // Get the current time of the video in seconds
    var currentTime = videoElement.currentTime;

    // Log the timestamp to the console
    console.log("Current timestamp:", currentTime);
  } else {
    console.log("Video element not found.");
  }
}
export default function App() {
  const [tagOverview, setTagOverview] = useState(null);

  useEffect(() => {
    const handleMessage = (message) => {
      console.log(message); // You can access the message object here
      setTagOverview(message["result"]);
    };
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  setInterval(() => {
    logVideoTimestamp();
    // let nodes = document.getElementsByClassName("ytp-time-current");
    // if (nodes.length > 0) {
    // console.log(nodes[0]);
    // }
  }, 1000);

  return (
    <div
      className="content-view"
      style={{ marginBottom: "2000px", fontSize: "20px" }}
    >
      <h1>Related Quotes:</h1>
      <div className="mb-2">
        {/* https://www.youtube.com/watch?v=x8PfxbN1_TE */}
        <strong>Timestamp: 1:01</strong>
        <TagSection
          tag={"investor and VC involvement"}
          tagDetails={
            "Accusations that investors and VCs fed the problem early on by raising the alarm on social media and private channels."
          }
        />
        <YouTubeVideo
          videoId="x8PfxbN1_TE"
          summary="Accusations that investors and VCs fed the problem early on by raising the alarm on social media and private channels."
        />
        {/* {Object.keys(tagOverview || {}).map((tag, index) => (
          <div key={index}>
            <TagSection tag={tag} tagDetails={tagOverview[tag]} />
          </div>
        ))} */}
      </div>
    </div>
  );
}
