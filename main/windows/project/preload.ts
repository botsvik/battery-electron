import { contextBridge, ipcRenderer } from "electron";
import { ProjectWindowApiInterface } from "./window";

const api: ProjectWindowApiInterface = {
  async getProjectSettings() {
    return await ipcRenderer.invoke("getProjectSettings");
  },
  async getAvailablePorts() {
    return await ipcRenderer.invoke("getAvailablePorts");
  },
  async getVoltageSeries(from: number, to: number) {
    return await ipcRenderer.invoke("getVoltageSeries", from, to);
  },
};

contextBridge.exposeInMainWorld("api", api);
