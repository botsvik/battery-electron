import { BrowserWindow, Rectangle } from "electron";

export const getWindowRect = (window: BrowserWindow): Rectangle => {
  const position = window.getPosition();
  const size = window.getSize();
  return {
    x: position[0],
    y: position[1],
    width: size[0],
    height: size[1],
  };
};
