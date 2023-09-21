import { contextBridge, ipcRenderer } from "electron";
import { StartWindowApiInterface } from "./window";

const api: StartWindowApiInterface = {
  async createProject() {
    return await ipcRenderer.invoke("createProject");
  },
  async loadProject(path?: string) {
    return await ipcRenderer.invoke("loadProject", path);
  },
  async getRecentDocuments() {
    return await ipcRenderer.invoke("getRecentDocuments");
  },
  async removeRecentDocument(path?: string) {
    return await ipcRenderer.invoke("removeRecentDocument", path);
  },
};

contextBridge.exposeInMainWorld("api", api);
