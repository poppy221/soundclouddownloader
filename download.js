const { exec } = require("child_process");

function downloadSoundcloud(url, saveDir, title) {
  return new Promise((resolve, reject) => {
    const safeName = title.replace(/[\\/:"*?<>|]+/g, "");
    const outputPath = `${saveDir}/${safeName}.aac`;

    const cmd = `yt-dlp "${url}" --extract-audio --audio-format aac -o "${outputPath}"`;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error("yt-dlp error:", stderr);
        return reject(stderr);
      }
      console.log("yt-dlp output:", stdout);
      resolve(stdout);
    });
  });
}

module.exports = { downloadSoundcloud };