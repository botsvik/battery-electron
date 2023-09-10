import path from "path";
import { shell } from "electron";

import { createWindow, isDev } from "@main/utils";

import Api from "./api";

/**
 * Startup function
 */
const startup = () => {
  const window = createWindow("Main", {
    show: false,
    autoHideMenuBar: true,
    width: 1024,
    height: 728,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load renderer
  window.loadURL(isDev ? "http://localhost:8080" : "app://-");

  // Disable
  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  window.once("ready-to-show", () => {
    window.show();

    //
    const api = Api.getInstance();

    window.once("close", async () => {
      await api.disconnect();
    });
  });
};

export default startup;
