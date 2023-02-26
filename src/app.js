import config from "../config.js";

// 1. get all the html elements DOM
const searchBoxEl = document.querySelector('#search-box');
const imageResults = document.querySelector('#images');

console.log(searchBoxEl); // Add this line

// 2. listen to the event on the prompt input
searchBoxEl.addEventListener('blur', async () => {
    // 2a. on the blur event, call the image generate API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`,
        },
        body: JSON.stringify({
            model: 'image-alpha-001',
            prompt: `civil rights movement ${searchBoxEl.value}`,
            num_images: 1,
            size: '256x256',
            response_format: 'url',
        }),
    });

    // 2b. show the image in the browser
    const data = await response.json();
    const imgUrl = data.data[0].url;
    const imgEl = document.createElement('img');
    imgEl.src = imgUrl;
    imageResults.appendChild(imgEl);
});
