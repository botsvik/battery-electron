import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import {
  createChart,
  LineStyle,
  CrosshairMode,
  ColorType,
  UTCTimestamp,
  ISeriesApi,
} from "lightweight-charts";

const colors = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
];

const mountLineChart = () => {
  const container = document.getElementById("linechart")!;
  const chart = createChart(container, {
    autoSize: false,
    layout: {
      textColor: "black",
      background: { type: ColorType.Solid, color: "white" },
    },
    timeScale: {
      // fixLeftEdge: true,
      fixRightEdge: true,
      rightOffset: 10,
      timeVisible: true,
      // rightBarStaysOnScroll: true,
    },
  });

  const resizeHandler = () => {
    const rect = container.getBoundingClientRect();
    chart.resize(rect.width, rect.height);
  };
  window.addEventListener("resize", resizeHandler);

  const lines: ISeriesApi<"Line">[] = [];

  const unsubscribe = window.backend.controller.handleVoltageUpdate((voltages) => {
    // voltages = [voltages[0]];
    const time = (Date.now() / 1000) as UTCTimestamp;
    voltages.forEach((value, index) => {
      let line = lines[index];
      if (!line) {
        line = chart.addLineSeries({
          baseLineColor: "red",
          lastValueVisible: false,
          crosshairMarkerVisible: false,
          priceLineVisible: false,
          lineType: 1,
          lineWidth: 1,
          // crosshairMarkerVisible: false,
          color: "blue",
          autoscaleInfoProvider: () => {
            return {
              margins: {
                above: 0,
                below: 0,
              },
              priceRange: {
                minValue: 0,
                maxValue: 5,
              },
            };
          },
        });
        lines.push(line);
      }

      line.update({
        value,
        time,
      });
    });
  });

  return () => {
    window.removeEventListener("resize", resizeHandler);
    unsubscribe();
    chart.remove();
  };
};

const Controller: FunctionComponent = () => {
  const [mode, setMode] = useState("idle");

  useEffect(() => {
    const unmount = mountLineChart();
    return unmount;
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="w-full h-10 border-b shrink-0">
        <Button
          onClick={async () => {
            if (mode === "idle") {
              await window.backend.controller.setMode("charge");
              setMode("charge");
            } else {
              await window.backend.controller.setMode("idle");
              setMode("idle");
            }
          }}
        >
          Set mode to {mode === "idle" ? "charge" : "idle"}
        </Button>
      </header>
      <div className="w-full h-full flex">
        <aside className="shrink-0 w-16 border-r">{/* sb */}</aside>
        <div className="flex flex-col w-full">
          <main className="grow">
            <div id="barchart" className="w-full h-1/2" />
            <div id="linechart" className="w-full h-1/2" />
          </main>
          <footer className="shrink-0 w-full h-8 border-t text-xs flex items-center justify-between px-2">
            <div>&copy; BotsoCorp 2023</div>
            <div>Version 0.0.1</div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Controller;
