import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/Demo/app";
import Recs from "@src/pages/content/components/Demo/recs";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content");

setTimeout(() => {
  const root = document.createElement("div");
  root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
  const commentsDiv = document.getElementById("comments");
  commentsDiv.parentNode.insertBefore(root, commentsDiv);
  createRoot(root).render(<App />);

  const secondaryRoot = document.createElement("div");
  secondaryRoot.id = "content-view-secondary-root";
  const secondaryDiv = document.getElementById("secondary");
  secondaryDiv.prepend(secondaryRoot);
  createRoot(secondaryRoot).render(<Recs />);
}, 5000);
