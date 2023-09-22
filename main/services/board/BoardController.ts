import {
  setIntervalAsync,
  clearIntervalAsync,
  type SetIntervalAsyncTimer,
} from "set-interval-async";

import { Board } from "./Board";

export type ChargingMode = "idle" | "charge" | "discharge";
export type SubsciptionFunction = (voltages: number[]) => void;
export type UnsubscribeFunction = () => void;

export class BoardController {
  private _board?: Board;

  private _chargingMode: ChargingMode = "idle";
  private _readInterval: number = 200;
  private _minCharge: number = 200;
  private _maxCharge: number = 1000;
  private _subscriberKey = 0;
  private _subscribers = new Map<number, SubsciptionFunction>();
  private _timer?: SetIntervalAsyncTimer<[]>;
  private _voltages: number[] = [];

  async connect(port: string, baudRate = 9600) {
    this._board = await Board.create(port, baudRate);
    this._timer = setIntervalAsync(async () => {
      if (this._board) {
        try {
          this._voltages = await this._board.read();
          console.log(this._voltages);
          this._notify();
        } catch (e) {
          if (e instanceof Error) console.log(e.message);
        }
      }
    }, this._readInterval);
  }

  async disconnect() {
    if (this._timer) await clearIntervalAsync(this._timer);
    // if (this._serialport && this._serialport.isOpen) this._serialport.close();
    this._timer = undefined;
    this._board = undefined;
  }

  async setMode(mode: ChargingMode) {
    this._chargingMode = mode;
    if (mode === "charge") {
      this._board?.write(13, "high");
    }
    if (mode === "idle") {
      this._board?.write(13, "low");
    }
  }

  async setMinCharge(minCharge: number) {
    this._minCharge = minCharge;
  }

  async setMaxCharge(maxCharge: number) {
    this._maxCharge = maxCharge;
  }

  private _notify() {
    this._subscribers.forEach((fn) => fn(this._voltages));
  }

  public subscribe(fn: SubsciptionFunction) {
    const key = ++this._subscriberKey;
    const unsubscribe = () => {
      this._subscribers.delete(key);
    };

    this._subscribers.set(key, fn);
    return unsubscribe;
  }
}
