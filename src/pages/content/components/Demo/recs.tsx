import { useEffect } from "react";

export default function Recs() {
  useEffect(() => {
    console.log("recs loaded");
  }, []);

  return (
    <div className="content-view" style={{ marginBottom: "1500px" }}>
      recs
    </div>
  );
}
