import { contextBridge, ipcRenderer } from "electron";

import { ApiInterface, Mode } from "./api";

const api: ApiInterface = {
  listAvailablePorts: async () =>
    await ipcRenderer.invoke("api:listAvailablePorts"),
  connect: async (path, baudRate) =>
    await ipcRenderer.invoke("api:connect", path, baudRate),
  disconnect: async () => await ipcRenderer.invoke("api:disconnect"),
  setMode: async (mode: Mode) =>
    await ipcRenderer.invoke("api:setMode", mode),
  setMinCharge: async (minCharge: number) =>
    await ipcRenderer.invoke("api:setMinCharge", minCharge),
  setMaxCharge: async (maxCharge: number) =>
    await ipcRenderer.invoke("api:setMaxCharge", maxCharge),
};

contextBridge.exposeInMainWorld("api", api);
