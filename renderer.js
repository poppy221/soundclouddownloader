const { searchSoundcloud } = require("./search.js");
const { downloadSoundcloud } = require("./download.js");
const { ipcRenderer } = require("electron");

const searchBox = document.getElementById("search");
const resultsList = document.getElementById("results");
const chooseDirBtn = document.getElementById("chooseDir");
const feedback = document.getElementById("feedback");
const toast = document.getElementById("toast");

let saveDirectory = null;

// Toast function
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("opacity-0");
  setTimeout(() => toast.classList.add("opacity-0"), 3000);
}

// Choose save folder
chooseDirBtn.addEventListener("click", async () => {
  const directory = await ipcRenderer.invoke("choose-directory");
  if (directory) {
    saveDirectory = directory;
    feedback.textContent = `Save directory set to: ${saveDirectory}`;
    feedback.classList.add("text-green-600");
  }
});

// Search input
searchBox.addEventListener("input", async () => {
  const q = searchBox.value.trim();
  if (!q) {
    resultsList.innerHTML = "";
    return;
  }

  const results = await searchSoundcloud(q);
  render(results);
});

// Render search results
function render(list) {
  resultsList.innerHTML = "";

  list.forEach(item => {
    const li = document.createElement("li");
    li.className =
      "flex items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition";

    const img = document.createElement("img");
    img.src = item.art || "";
    img.className = "w-16 h-16 rounded-lg object-cover mr-4 shadow-sm";

    const text = document.createElement("div");
    text.className = "flex flex-col justify-center flex-1";

    const title = document.createElement("span");
    title.textContent = item.title;
    title.className = "font-semibold text-gray-900 text-lg";

    text.appendChild(title);

    // Download button
    const btn = document.createElement("button");
    btn.textContent = "Download";
    btn.className =
      "ml-4 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition";

    btn.onclick = async () => {
      if (!saveDirectory) {
        showToast("Please choose a save directory first!");
        return;
      }

      try {
        console.log("Starting download:", item.title, "to", saveDirectory);
        await downloadSoundcloud(item.url, saveDirectory, item.title);
        showToast(`Downloaded: ${item.title}`);
      } catch (err) {
        console.error("Download error:", err);
        showToast(`Download failed: ${item.title}`);
        console.error(err);
      }
    };

    li.appendChild(img);
    li.appendChild(text);
    li.appendChild(btn);

    resultsList.appendChild(li);
  });
}
