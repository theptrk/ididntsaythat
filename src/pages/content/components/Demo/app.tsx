import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log("content view loaded");
  }, []);

  return (
    <div className="content-view" style={{ marginBottom: "1500px" }}>
      content view
      <div className="mb-2">What comments should go here?</div>
    </div>
  );
}
