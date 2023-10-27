"use client";

import { FunctionComponent } from "react";

import { Progress } from "@renderer/components";
import { cn, batteryColor } from "@renderer/utils";

type SidebarBatteryProps = {
  id: number;
  value: number;
};
export const SidebarBattery: FunctionComponent<SidebarBatteryProps> = ({
  id,
  value,
}) => {
  return (
    <div className="border-b p-2 flex flex-col justify-between">
      <div className="flex justify-between">
        <span className="text-xs italic text-primary/70">#{id}</span>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "w-4 h-4 block rounded-full",
              batteryColor(id, "class"),
            )}
          />
          <span className="text-2xl font-semibold tracking-wider">{value}</span>
        </div>

        <Progress value={value} />
      </div>
    </div>
  );
};
