import path from "node:path";
import { BrowserWindow } from "electron";

import { View } from "@main/utils";

import { Project } from "@main/services/project/Project";

export interface ProjectWindowApiInterface {
  //
}

export class ProjectWindow {
  static async create(projectFilePath: string) {
    const project = await Project.create(projectFilePath);

    const projectWindow = new BrowserWindow({
      width: 1024,
      height: 728,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    projectWindow.loadURL(View.url("project"));
    projectWindow.once("ready-to-show", () => projectWindow.show());

    /**
     * Scoped ipc definitions
     */
    const ipc = projectWindow.webContents.ipc;
  }
}
