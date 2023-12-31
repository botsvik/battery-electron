import path from "node:path";
import fs from "node:fs/promises";
import { app, BrowserWindow, dialog } from "electron";

import { View } from "@main/utils";
import {
  UserPreferences,
  RecentDocument,
} from "@main/services/user-preferences";

import { ProjectWindow } from "../project/window";

export interface StartWindowApiInterface {
  createProject(): Promise<void>;
  loadProject(projectFilePath?: string): Promise<void>;
  getRecentDocuments(): Promise<Array<RecentDocument>>;
  removeRecentDocument(path: string): Promise<void>;
}

export class StartWindow {
  static async create() {
    const startWindow = new BrowserWindow({
      width: 600,
      minWidth: 600,
      height: 450,
      minHeight: 450,
      show: false,
      autoHideMenuBar: true,
      titleBarStyle: "hidden",
      // titleBarOverlay: true,
      titleBarOverlay: {
        // theme-light
        color: "#171717", // hsl(0 0% 9%)
        symbolColor: "#fafafa", // hsl(0 0% 98%)
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
        properties: [
          "createDirectory",
          "showOverwriteConfirmation",
          "dontAddToRecent",
        ],
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
            return; // TODO: show alert that file is busy
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

    ipc.handle("getRecentDocuments", async (event) => {
      return await UserPreferences.getRecentDocuments();
    });

    ipc.handle("removeRecentDocument", async (event, ...[path]: [string]) => {
      return await UserPreferences.removeRecentDocument(path);
    });

    ipc.handle("pinRecentProject", async (event) => {
      //
    });

    return startWindow;
  }
}
