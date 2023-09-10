import path from "path";
import { BrowserWindow, app } from "electron";
import serve from "electron-serve";

import { isDev } from "@main/utils";

import startup from "./startup";

if (!isDev) {
  serve({ directory: path.join(__dirname, "../renderer") });
}

app.on("ready", () => {
  startup();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) startup();
});

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") app.quit();
});
