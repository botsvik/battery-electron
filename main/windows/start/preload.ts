import { contextBridge, ipcRenderer } from "electron";
import { StartWindowApiInterface } from "./window";

const api: StartWindowApiInterface = {
  async createProject(path: string) {
    return await ipcRenderer.invoke("createProject", path);
  },
  async loadProject() {
    return await ipcRenderer.invoke("loadProject");
  }
};

contextBridge.exposeInMainWorld("api", api);
