import { ipcMain } from "electron";

export type Mode = "idle" | "charge" | "discharge";

export interface ControllerInterface {
  connect(port: string, baudRate?: number): Promise<void>;
  disconnect(): Promise<void>;
  setMode(mode: Mode): Promise<void>;
  setMinCharge(minCharge: number): Promise<void>;
  setMaxCharge(maxCharge: number): Promise<void>;
}

class Controller implements ControllerInterface {
  private _serial: string = ""; // serialport setup

  private _readInterval: number = 200;
  private _mode: Mode = "idle";
  private _minCharge: number = 200;
  private _maxCharge: number = 1000;

  constructor() {
    ipcMain.handle("controller:connect", async (_, ...args) => {
      return await this.connect(args[0], args[1]);
    });
    ipcMain.handle("controller:disconnect", async () => {
      return await this.disconnect();
    });
    ipcMain.handle("controller:setMode", async (_, ...args) => {
      return await this.setMode(args[0]);
    });
  }

  get port() {
    // return this._port;
    return "COM3";
  }

  get baudRate() {
    // return this._baudRate;
    return 9600;
  }

  get readInterval() {
    return this._readInterval;
  }

  get mode() {
    return this._mode;
  }

  get minCharge() {
    return this._minCharge;
  }

  get maxCharge() {
    return this._maxCharge;
  }

  async connect(port: string, baudRate = 9600) {
    // connect to serial
    console.log(`Connected on port:${port} baudRate:${baudRate}`);
  }

  async disconnect() {
    // disconnect
    console.log("Disconnected");
  }

  async setMode(mode: Mode) {
    this._mode = mode;
    // send W command to mode pin
  }

  async setMinCharge(minCharge: number) {
    this._minCharge = minCharge;
    //
  }

  async setMaxCharge(maxCharge: number) {
    this._maxCharge = maxCharge;
    //
  }

  async start() {
    // Start read process
  }
}

export default Controller;
