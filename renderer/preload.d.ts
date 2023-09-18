import { StartWindowApiInterface, ProjectWindowApiInterface } from "@main/windows";

declare global {
  interface Window {
    api: StartWindowApiInterface & ProjectWindowApiInterface;
  }
}
