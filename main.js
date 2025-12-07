const { app, BrowserWindow, ipcMain, dialog } = require("electron");

function createWindow() {
  new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  }).loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle("choose-directory", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    title: "Select a folder to save songs to",
  });

  return result.canceled ? null: result.filePaths[0];
});
