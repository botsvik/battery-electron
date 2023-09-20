import path from "node:path";
import fs from "node:fs/promises";

import { app, BrowserWindow, dialog } from "electron";

import { View } from "@main/utils";
import { ProjectWindow } from "../project/window";

export interface StartWindowApiInterface {
  createProject(): Promise<void>;
  loadProject(projectFilePath?: string): Promise<void>;
  // listRecentProjects(): Promise<any>;
}

export class StartWindow {
  static async create() {
    const startWindow = new BrowserWindow({
      width: 800,
      minWidth: 800,
      maxWidth: 800,
      height: 600,
      minHeight: 600,
      maxHeight: 600,
      show: false,
      maximizable: false,
      autoHideMenuBar: true,
      titleBarStyle: "hidden",
      titleBarOverlay: {
        color: "#ffffff",
        symbolColor: "#0a0a0a",
        // height: 30
      },
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    startWindow.loadURL(View.url("start", { test: "param" }));
    startWindow.once("ready-to-show", () => startWindow.show());

    /**
     * Scoped ipc definitions
     */
    const ipc = startWindow.webContents.ipc;

    ipc.handle("createProject", async () => {
      const result = await dialog.showSaveDialog(startWindow, {
        defaultPath: app.getPath("documents"),
        properties: ["createDirectory", "showOverwriteConfirmation", "dontAddToRecent"],
        filters: [
          {
            extensions: ["badb"],
            name: "Battery App DB File",
          },
        ],
      });

      if (result.canceled || !result.filePath) return;
      const projectFilePath = result.filePath;

      try {
        await fs.unlink(projectFilePath);
      } catch (e) {
        console.error(e);
        if (e instanceof Error && "code" in e && typeof e.code === "string") {
          if (e.code === "EBUSY") {
            return;
          }
        }
      }

      await ProjectWindow.create(projectFilePath);
      startWindow.close();
    });

    ipc.handle("loadProject", async (_, ...[projectFilePath]: [string?]) => {
      if (!projectFilePath) {
        const result = await dialog.showOpenDialog(startWindow, {
          defaultPath: app.getPath("documents"),
          properties: ["openFile", "dontAddToRecent"],
          filters: [
            {
              extensions: ["badb"],
              name: "Battery App DB File",
            },
          ],
        });
        if (result.canceled) return;
        projectFilePath = result.filePaths[0];
      }

      await ProjectWindow.create(projectFilePath);
      startWindow.close();
    });

    ipc.handle("listRecentProjects", async (event) => {
      console.log("scoped ipc handle");
    });

    ipc.handle("pinRecentProject", async (event) => {
      //
    });

    return startWindow;
  }
}
