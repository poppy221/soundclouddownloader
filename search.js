const axios = require("axios");

async function searchSoundcloud(query) {
  const headers = {
    "accept": "application/json, text/javascript etc, */*; q=0.01",
    "accept-encoding": "gzip, deflate, br, zstd",
    "accept-language": "en-US,en;q=0.5",
    "connection": "keep-alive",
    "host": "api-v2.soundcloud.com",
    "origin": "https://soundcloud.com",
    "referer": "https://soundcloud.com/",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0"
  };

  const url =
    `https://api-v2.soundcloud.com/search` +
    `?q=${encodeURIComponent(query)}` +
    `&facet=model` +
    `&client_id=Tbe9YspsDY5jcNlK6GmSimUxBQeXn8Ho` +
    `&limit=20&offset=0`;

  const response = await axios.get(url, { headers });
  const data = response.data;

  return data.collection
    .filter(item => item.title && item.permalink_url)
    .map(item => ({
      title: item.title,
      url: item.permalink_url,
      art: item.artwork_url
    }));
}

module.exports = { searchSoundcloud };