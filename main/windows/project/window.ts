import path from "path";
import { BrowserWindow } from "electron";

import { View } from "@main/utils";

export interface ProjectWindowApiInterface {
  //
}

export class ProjectWindow {
  static async create(projectFilePath: string) {
    const window = new BrowserWindow({
      width: 1024,
      height: 728,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    window.setRepresentedFilename(projectFilePath);

    window.loadURL(View.url("project"));
    window.once("ready-to-show", () => window.show());

    /**
     * Scoped ipc definitions
     */
    const ipc = window.webContents.ipc;
  }
}
