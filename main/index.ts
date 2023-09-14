import path from "path";
import { BrowserWindow, app, ipcMain } from "electron";
import { SerialPort } from "serialport";
import serve from "electron-serve";

import { createWindow, isDev } from "@main/utils";
import { BoardController } from "./board";

if (!isDev) serve({ directory: path.join(__dirname, "../renderer") });

const controller = new BoardController();

const openMainWindow = () => {
  const window = createWindow("Main", {
    title: "Battery App",
    show: false,
    autoHideMenuBar: true,
    width: 1024,
    height: 728,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  window.loadURL(isDev ? "http://localhost:8080" : "app://-");
  window.once("ready-to-show", () => {
    window.show();
  });

  const unsubscribe = controller.subscribe((voltages) => {
    console.log(new Date(), voltages);
    window.webContents.send("controller:voltagesUpdated", voltages);
  });

  window.on("close", async () => {
    unsubscribe();
    await controller.disconnect();
  });
};

app.on("ready", openMainWindow);

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) openMainWindow();
});

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") app.quit();
});

/**
 * IPC Communication
 *
 * define ipc event handlers here
 */

/**
 *
 */
ipcMain.handle("serialport:list", async () => await SerialPort.list());

/**
 *
 */
ipcMain.handle(
  "controller:connect",
  async (_, ...[port, baudRate]) => await controller.connect(port, baudRate),
);
ipcMain.handle("controller:disconnect", async () => await controller.disconnect());
ipcMain.handle("controller:setMode", async (_, ...[mode]) => await controller.setMode(mode));
