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

  return (
    <div
      className="content-view"
      style={{ marginBottom: "2000px", fontSize: "20px" }}
    >
      <h1>What did I say?</h1>
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
