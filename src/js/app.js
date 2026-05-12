import NewsWidget from "./NewsWidget";

const widget = new NewsWidget(document.getElementById("root"));

widget.init();

(async () => {
  try {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register("./service-worker.js");
      console.log("Service worker register success");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
})();
