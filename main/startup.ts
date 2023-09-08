import path from "path";
import { BrowserWindow, shell } from "electron";

import { isDev } from "@main/utils";

import Controller from "./controller";

/**
 * Startup function
 */
export default function () {
  const window = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    width: 1024,
    height: 728,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.loadURL(isDev ? "http://localhost:8080" : "app://-");
  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  window.once("ready-to-show", () => {
    window.maximize();
    window.show();

    const controller = new Controller({
      port: "COM3", // Would be nice to auto detect
      baudRate: 9600,
    });

    controller.connect();

    // start serial process
    window.once("close", () => {
      controller.disconnect();
    });
  });
}
