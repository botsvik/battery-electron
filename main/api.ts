import { ipcMain } from "electron";
import { SerialPort, SerialPortMock } from "serialport";
import {
  setIntervalAsync,
  clearIntervalAsync,
  type SetIntervalAsyncTimer,
} from "set-interval-async";

export type Mode = "idle" | "charge" | "discharge";

export interface ApiInterface {
  listAvailablePorts(): ReturnType<typeof SerialPort.list>;
  connect(port: string, baudRate?: number): Promise<void>;
  disconnect(): Promise<void>;
  setMode(mode: Mode): Promise<void>;
  setMinCharge(minCharge: number): Promise<void>;
  setMaxCharge(maxCharge: number): Promise<void>;
}

class Api implements ApiInterface {
  private _readInterval: number = 200;
  private _mode: Mode = "idle";
  private _minCharge: number = 200;
  private _maxCharge: number = 1000;

  private _serialport?: SerialPort;
  private _timer?: SetIntervalAsyncTimer<[]>;

  constructor() {
    ipcMain.handle(
      "api:listAvailablePorts",
      async (_event) => await this.listAvailablePorts()
    );
    ipcMain.handle(
      "api:connect",
      async (_event, ...args) => await this.connect(args[0], args[1])
    );
    ipcMain.handle("api:disconnect", async () => await this.disconnect());
    ipcMain.handle(
      "api:setMode",
      async (_event, ...args) => await this.setMode(args[0])
    );
  }

  async listAvailablePorts() {
    return await SerialPort.list();
  }

  async connect(port: string, baudRate = 9600) {
    this._serialport = new SerialPort({ path: port, baudRate });
    // this._serialport.on("data", (chunk) => {
    //   // handle data?
    // })

    // trigger disconnect if closed for whatever reason;
    this._serialport.on("close", async () => {
      await this.disconnect();
    });

    // We can either send read commands or listen to device output by this._serialport.on("data", handler);
    this._timer = setIntervalAsync(async () => {
      if (this._serialport) {
        this._serialport.write("R");
        const data = this._serialport.read();
      }
    }, this._readInterval);
  }

  async disconnect() {
    if (this._timer) await clearIntervalAsync(this._timer);
    if (this._serialport && this._serialport.isOpen) this._serialport.close();

    this._timer = undefined;
    this._serialport = undefined;
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

export default Api;
