import { contextBridge, ipcRenderer } from "electron";

import { ControllerInterface, Mode } from "./controller";

const controller: ControllerInterface = {
  connect: async (port, baudRate) =>
    await ipcRenderer.invoke("controller:connect", port, baudRate),
  disconnect: async () => await ipcRenderer.invoke("controller:disconnect"),
  setMode: async (mode: Mode) =>
    await ipcRenderer.invoke("controller:setMode", mode),
  setMinCharge: async (minCharge: number) =>
    await ipcRenderer.invoke("controller:setMinCharge", minCharge),
  setMaxCharge: async (maxCharge: number) =>
    await ipcRenderer.invoke("controller:setMaxCharge", maxCharge),
};

contextBridge.exposeInMainWorld("controller", controller);
