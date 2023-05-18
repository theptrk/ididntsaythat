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
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}
function TagSection(props: { tag: string }) {
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
        <div>
          Here are three easy breakfast recipes to try during the week! Merguez
          & fontina stuffed croissants, Spiced egg & spinach breakfast wrap &
          the classic Scotch egg.
          {/* <YouTubeVideo videoId="d-XL05EYWrQ" />{" "} */}
        </div>
        <div>comment 2</div>
        <div>comment 3</div>
      </div>
    </div>
  );
}
export default function App() {
  const [tags, setTags] = useState([]); // ["breakfast", "lunch", "dinner"
  useEffect(() => {
    console.log("content view loaded");
    setTags(["breakfast", "lunch", "dinner"]);

    // fetch("http://10.10.245.96:8080/get_summarized_topics", {
    console.log("BROK");
    fetch("https://e480-136-24-74-186.ngrok-free.app", {
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
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="content-view" style={{ marginBottom: "1500px" }}>
      Open Debate-ly
      <div className="mb-2">
        {tags.map((tag, index) => (
          <TagSection tag={tag} key={index} />
        ))}
      </div>
    </div>
  );
}
