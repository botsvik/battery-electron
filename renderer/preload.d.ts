import { ApiInterface } from "@main/api";
import { SerialPort } from "serialport";

declare global {
  interface Window {
    api: ApiInterface;
  }
}
