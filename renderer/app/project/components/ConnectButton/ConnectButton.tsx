"use client";

import { FunctionComponent, useState } from "react";
import { PlayIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useAvailablePorts } from "@renderer/data";
import { Button, DropdownMenu } from "@renderer/components/ui";

export const ConnectButton: FunctionComponent = () => {
  const { data: ports } = useAvailablePorts();
  const [selectedPort, setSelectedPort] = useState<string>();

  if (!ports) return;

  return (
    <div className="flex">
      <Button
        className="rounded-r-none"
        disabled={!selectedPort}
        variant="outline"
      >
        <PlayIcon className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button className="rounded-l-none -ml-px px-1.5" variant="outline">
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.RadioGroup
            value={selectedPort}
            onValueChange={setSelectedPort}
          >
            {ports.map((port) => (
              <DropdownMenu.RadioItem key={port.path} value={port.path}>
                {port.friendlyName || port.path}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};
