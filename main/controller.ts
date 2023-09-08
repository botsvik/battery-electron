export type Mode = "idle" | "charge" | "discharge";

export type ControllerOptions = {
  port: string;
  baudRate: number;
  readInterval?: number;
  minCharge?: number;
  maxCharge?: number;
};

class Controller {
  private readonly _port: string;
  private readonly _baudRate: number;
  private _readInterval: number = 200;
  private _mode: Mode = "idle";
  private _minCharge: number = 200;
  private _maxCharge: number = 1000;

  constructor(options: ControllerOptions) {
    this._port = options.port;
    this._baudRate = options.baudRate;
    if (options.readInterval) this._readInterval = options.readInterval;
    if (options.minCharge !== undefined) this._minCharge = options.minCharge;
    if (options.maxCharge !== undefined) this._maxCharge = options.maxCharge;
  }

  get port() {
    return this._port;
  }

  get baudRate() {
    return this._baudRate;
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

  async connect() {
    // connect to serial
  }

  async disconnect() {
    // disconnect
  }

  async setMode(mode: Mode) {
    this._mode = mode;
    // send W command to mode pin
  }

  setMinCharge(minCharge: number) {
    this._minCharge = minCharge;
    //
  }

  setMaxCharge(maxCharge: number) {
    this._maxCharge = maxCharge;
    //
  }

  
}

export default Controller;
