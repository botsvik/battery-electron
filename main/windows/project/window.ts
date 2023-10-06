import path from "node:path";
import { BrowserWindow } from "electron";
import { PortInfo } from "@serialport/bindings-interface";
import { View } from "@main/utils";
import {
  Project,
  ProjectSettings,
  VoltageSeriesItem,
} from "@main/services/project";
import { UserPreferences } from "@main/services/user-preferences";
import { BoardController } from "@main/services/board";
import { SerialPort } from "serialport";

export interface ProjectWindowApiInterface {
  getProjectSettings(): Promise<ProjectSettings>;
  getAvailablePorts(): Promise<Array<PortInfo & { friendlyName?: string }>>;
  getVoltageSeries(from: number, to: number): Promise<VoltageSeriesItem>;
}

export class ProjectWindow {
  static async create(projectFilePath: string) {
    const project = await Project.create(projectFilePath);
    const controller = new BoardController();

    const projectWindow = new BrowserWindow({
      width: 1024,
      height: 728,
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

    projectWindow.loadURL(View.url("project"));
    projectWindow.once("ready-to-show", () => projectWindow.show());
    projectWindow.once("show", async () => {
      await UserPreferences.addRecentDocument(projectFilePath);
    });

    /**
     * Scoped ipc definitions
     */
    const ipc = projectWindow.webContents.ipc;

    ipc.handle("getProjectSettings", async () => {
      return await project.getSettings();
    });

    ipc.handle("getAvailablePorts", async () => {
      return await SerialPort.list();
    });

    ipc.handle(
      "getVoltageSeries",
      async (event, ...[from, to]: [number, number]) => {
        return await project.getVoltageSeries(from, to);
      },
    );

    return projectWindow;
  }
}
