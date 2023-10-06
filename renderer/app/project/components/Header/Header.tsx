"use client";

import { FunctionComponent } from "react";
import { Tabs } from "@renderer/components/ui";
import { ConnectButton } from "../ConnectButton/ConnectButton";

export const Header: FunctionComponent = () => {
  return (
    <header className="flex items-center justify-between gap-2 shrink-0 border-b px-4 py-2">
      <div className="flex gap-2 self-start justify-self-start">
        <ConnectButton />
      </div>

      <Tabs defaultValue="idle" onValueChange={(value) => console.log(value)}>
        <Tabs.List>
          <Tabs.Trigger disabled value="idle">
            Idle
          </Tabs.Trigger>
          <Tabs.Trigger disabled value="charge">
            Charge
          </Tabs.Trigger>
          <Tabs.Trigger disabled value="discharge">
            Discharge
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    </header>
  );
};
