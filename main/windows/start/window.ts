import path from "path";
import { BrowserWindow } from "electron";

import { View } from "@main/utils";

export interface StartWindowApiInterface {
  //
}

export class StartWindow {
  static async create() {
    const window = new BrowserWindow({
      width: 800,
      minWidth: 800,
      maxWidth: 800,
      height: 600,
      minHeight: 600,
      maxHeight: 600,
      show: false,
      maximizable: false,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    window.loadURL(View.url("start"));
    window.once("ready-to-show", () => window.show());

    /**
     * Scoped ipc definitions
     */
    const ipc = window.webContents.ipc;
    ipc.handle("serialport:list", async (event) => {
      console.log("scoped ipc handle");
    });

    return window;
  }
}
