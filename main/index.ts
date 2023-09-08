import path from "path";
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import serve from "electron-serve";

import { isDev } from "@main/utils";

import startup from "./startup";

if (!isDev) {
  serve({ directory: path.join(__dirname, "../renderer") });
}

app.on("ready", () => {
  startup();
});

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) startup();
});

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
