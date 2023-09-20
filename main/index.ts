import { BrowserWindow, app } from "electron";

import { View } from "@main/utils";
import { ProjectWindow, StartWindow } from "@main/windows";

// Run static file server
View.serve();

app.on("open-file", async (event, path) => {
  event.preventDefault();
  await app.whenReady();
  await ProjectWindow.create(path);
});

app.on("ready", async () => {
  console.log(process.argv, process.argv0);
  await StartWindow.create();
});

app.on("activate", async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) await StartWindow.create();
});

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") app.quit();
});
