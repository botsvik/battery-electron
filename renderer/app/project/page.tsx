import { FunctionComponent } from "react";

import { Header, SidebarBattery } from "./_components";

const Project: FunctionComponent = () => {
  return (
    <div className="flex flex-col grow overflow-hidden">
      <Header />
      <div className="grow">
        <aside className="shrink-0 w-72 border-r h-full flex flex-col">
          <SidebarBattery id={1} value={22} />
          <SidebarBattery id={2} value={50.12354} />
          <SidebarBattery id={3} value={45} />
          <SidebarBattery id={4} value={97} />
        </aside>
        <main className="grow"></main>
      </div>

      <footer className="shrink-0 h-6 border-t">footer data</footer>
    </div>
  );
};

export default Project;
