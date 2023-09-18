import { BrowserWindow, app } from "electron";

import { View } from "@main/utils";
import { StartWindow } from "@main/windows";

// Run static file server
View.serve();

app.on("ready", () => StartWindow.create());
app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) StartWindow.create();
});
app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") app.quit();
});
