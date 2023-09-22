import { Input, Select, Tabs } from "@renderer/components/ui";
import { FunctionComponent } from "react";

const Project: FunctionComponent = () => {
  return (
    <div className="flex flex-col grow overflow-hidden">
      <header className="flex items-center justify-between shrink-0 border-b px-4 py-2">
        <div className="flex gap-2">
          <Select>
            <Select.Trigger className="w-[100px]">
              <Select.Value placeholder="Port" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="COM3">COM3</Select.Item>
              {/* <Select.Item value="dark">Dark</Select.Item>
              <Select.Item value="system">System</Select.Item> */}
            </Select.Content>
          </Select>
          <Input className="w-[100px]" placeholder="Baud Rate" />
        </div>

        <Tabs defaultValue="idle" onValueChange={(value) => console.log(value)}>
          <Tabs.List>
            <Tabs.Trigger value="idle">Idle</Tabs.Trigger>
            <Tabs.Trigger disabled value="charge">
              Charge
            </Tabs.Trigger>
            <Tabs.Trigger disabled value="discharge">
              Discharge
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </header>

      <main className="grow"></main>
      <footer className="shrink-0 h-6 border-t">footer data</footer>
    </div>
  );
};

export default Project;
