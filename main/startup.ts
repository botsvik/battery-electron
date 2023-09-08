import path from "path";
import { BrowserWindow, shell } from "electron";

import { isDev } from "@main/utils";

/**
 * Startup function
 */
export default function () {
  const window = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    width: 1024,
    height: 728,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.loadURL(isDev ? "http://localhost:8080" : "app://-");

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  window.once("ready-to-show", () => {
    window.maximize();
    window.show();

    // const device = new Adapter({
    //   port: "COM3", // Would be nice to auto detect
    //   baudRate: 9600, // will have default
    //   readInterval: 200, // will have default
    // })

    // device.on("connect", () => {});
    // device.on("disconnect", () => {});
    // device.on("mode-change", (mode) => {

    // });
    // // device.on("min-charge-change");
    // // device.on("max-charge-change")

    // controller.setMaxCharge(20);
    // controller.setMinCharge(30);

    // controller.connect({
    //   port: "COM3",
    //   baudRate: 9600
    // });
    // controller.disconnect();

    // controller.start({
    //   interval: 200
    // });

    // controller.setMode("idle");
    // controller.setMode("charge");
    // controller.setMode("discharge");

    // I2C | UART | SPI

    // // [float] // lenght 49
    // // 32 battery volt, 16 other sensor data
    // controller.on("data", (data) => {
    //   // gadaxate ui
    // })

    // start serial process
    window.once("close", () => {
      // close serial process
    });
  });
}
