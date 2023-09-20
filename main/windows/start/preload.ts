import { contextBridge, ipcRenderer } from "electron";
import { StartWindowApiInterface } from "./window";

const api: StartWindowApiInterface = {
  async createProject() {
    return await ipcRenderer.invoke("createProject");
  },
  async loadProject(projectFilePath?: string) {
    return await ipcRenderer.invoke("loadProject", projectFilePath);
  },
};

contextBridge.exposeInMainWorld("api", api);
