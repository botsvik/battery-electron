import { contextBridge, ipcRenderer } from "electron";

const serialport = {
  list: async () => await ipcRenderer.invoke("serialport:list"),
};

const backend = {
  serialport,
};

contextBridge.exposeInMainWorld("backend", backend);
