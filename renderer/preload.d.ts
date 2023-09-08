import { ControllerInterface } from "@main/controller";

declare global {
  interface Window {
    controller: ControllerInterface;
  }
}
