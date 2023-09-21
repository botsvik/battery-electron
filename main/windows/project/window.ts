import path from "node:path";
import { BrowserWindow, app } from "electron";

import { View } from "@main/utils";

import { Project } from "@main/services/project";
import { UserPreferences } from "@main/services/user-preferences";

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
    projectWindow.once("show", async () => {
      await UserPreferences.addRecentDocument(projectFilePath);
    });

    /**
     * Scoped ipc definitions
     */
    const ipc = projectWindow.webContents.ipc;

    return projectWindow;
  }
}
