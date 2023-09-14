import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";
import { PortInfo } from "@serialport/bindings-interface";

import { ChargingMode } from "@main/board";

const controller = {
  connect: async (port: string, baudRate: number) =>
    (await ipcRenderer.invoke("controller:connect", port, baudRate)) as void,
  disconnect: async () => (await ipcRenderer.invoke("controller:disconnect")) as void,
  setMode: async (mode: ChargingMode) =>
    (await ipcRenderer.invoke("controller:setMode", mode)) as void,
  setMinCharge: async (minCharge: number) =>
    (await ipcRenderer.invoke("controller:setMinCharge", minCharge)) as void,
  setMaxCharge: async (maxCharge: number) =>
    (await ipcRenderer.invoke("controller:setMaxCharge", maxCharge)) as void,
  handleVoltageUpdate: (fn: (voltages: number[]) => void) => {
    const handler = (event: IpcRendererEvent, voltages: number[]) => fn(voltages);
    const unsubscribe = () =>
      ipcRenderer.off("controller:voltagesUpdated", handler) as unknown as void;
    ipcRenderer.on("controller:voltagesUpdated", handler);
    return unsubscribe;
  },
};

const serialport = {
  list: async () => (await ipcRenderer.invoke("serialport:list")) as Promise<PortInfo[]>,
};

const backend = {
  controller,
  serialport,
};

contextBridge.exposeInMainWorld("backend", backend);

export type Backend = typeof backend;
