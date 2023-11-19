import config from "../config.js";

// 1. get all the html elements DOM
const searchBoxEl = document.querySelector("#search-box");
const imageResults = document.querySelector("#images");

// 2. listen to the event on the prompt input
searchBoxEl.addEventListener("blur", async () => {
  // Clear the existing images before making the API call
  imageResults.innerHTML = "";

  // 2a. Add a loading GIF
  const loadingGifEl = document.createElement("img");
  loadingGifEl.src = "src/image_processing.gif";
  loadingGifEl.style.width = "200px"; // set the width of the loading GIF
  loadingGifEl.style.height = "150px"; // set the height of the loading GIF
  loadingGifEl.style.borderRadius = "25%"; // set the border-radius of the loading GIF
  imageResults.appendChild(loadingGifEl);

  // 2b. on the blur event, call the image generate API
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.API_KEY}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: `civil rights movement ${searchBoxEl.value}`,
      n: 1,
      size: "1024x1024",
    }),
  });

  // 2c. show the image in the browser
  const data = await response.json();
  const imgUrl = data.data[0].url;
  const imgEl = document.createElement("img");
  imgEl.src = imgUrl;
  imageResults.innerHTML = "";
  imageResults.appendChild(imgEl);
});
