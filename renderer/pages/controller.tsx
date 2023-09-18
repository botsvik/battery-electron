import { FunctionComponent, useEffect, useState } from "react";

import {
  createChart,
  LineStyle,
  CrosshairMode,
  ColorType,
  UTCTimestamp,
  ISeriesApi,
  IPriceLine,
} from "lightweight-charts";

const colors = [
  "#ef4444", // red-500
  "#f97316", // orange-500
  "#f59e0b", // amber-500
  "#eab308", // yellow-500
  "#84cc16", // lime-500
  "#22c55e", // green-500
  "#10b981", // emerald-500
  "#14b8a6", // teal-500
  "#06b6d4", // cyan-500
  "#0ea5e9", // sky-500
  "#3b82f6", // blue-500
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#a855f7", // purple-500
  "#d946ef", // fuchsia-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500

  "#fca5a5", // red-300
  "#fdba74", // orange-300
  "#fcd34d", // amber-300
  "#fde047", // yellow-300
  "#bef264", // lime-300
  "#86efac", // green-300
  "#6ee7b7", // emerald-300
  "#5eead4", // teal-300
  "#67e8f9", // cyan-300
  "#7dd3fc", // sky-300
  "#93c5fd", // blue-300
  "#a5b4fc", // indigo-300
  "#c4b5fd", // violet-300
  "#d8b4fe", // purple-300
  "#f5d0fe", // fuchsia-300
  "#f9a8d4", // pink-300
  "#fda4af", // rose-300

  "#b91c1c", // red-700
  "#c2410c", // orange-700
  "#b45309", // amber-700
  "#b45309", // yellow-700
  "#4d7c0f", // lime-700
  "#15803d", // green-700
  "#047857", // emerald-700
  "#0f766e", // teal-700
  "#0e7490", // cyan-700
  "#0369a1", // sky-700
  "#1d4ed8", // blue-700
  "#4338ca", // indigo-700
  "#6d28d9", // violet-700
  "#7e22ce", // purple-700
  "#a21caf", // fuchsia-700
  "#be185d", // pink-700
  "#be123c", // rose-700
];

const mountLineChart = () => {
  const container = document.getElementById("linechart")!;
  const chart = createChart(container, {
    autoSize: false,
    layout: {
      textColor: "black",
      background: { type: ColorType.Solid, color: "white" },
    },
    rightPriceScale: {
      scaleMargins: {
        top: 0.2,
        bottom: 0,
      },
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

  let maxPriceLine: IPriceLine;
  let minPriceLine: IPriceLine;
  const lines: ISeriesApi<"Line">[] = [];

  const unsubscribe = window.backend.controller.handleVoltageUpdate((voltages) => {
    // voltages = [voltages[0]];
    const time = (Date.now() / 1000) as UTCTimestamp;
    voltages.forEach((value, index) => {
      let line = lines[index];
      if (!line) {
        line = chart.addLineSeries({
          lastValueVisible: false,
          // crosshairMarkerVisible: false,
          crosshairMarkerBorderWidth: 0,
          priceLineVisible: false,
          lineType: 0,
          lineWidth: 1,
          color: colors[index],
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

        if (index === 0 && !minPriceLine) {
          line.createPriceLine({
            price: 1,
            color: "#be1238",
            lineWidth: 1,
            lineStyle: 1,
            axisLabelVisible: true,
            title: "minimum",
          });
        }
        if (index === 0 && !maxPriceLine) {
          line.createPriceLine({
            price: 5,
            color: "#be1238",
            lineWidth: 1,
            lineStyle: 1,
            axisLabelVisible: true,
            title: "maximum",
          });
        }

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
      <header className="w-full h-10 border-b shrink-0"></header>
      <div className="w-full h-full flex">
        <aside className="shrink-0 w-16 border-r">{/* sb */}</aside>
        <div className="flex flex-col w-full">
          <main className="grow p-4 flex flex-col">
            <div id="barchart" className="grow shrink-0 h-1/2" />
            <div id="linechart" className="grow shrink-0 h-1/2" />
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
