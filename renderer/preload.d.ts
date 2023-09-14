import { Backend } from "@main/preload";

declare global {
  interface Window {
    backend: Backend;
  }
}
