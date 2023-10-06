import { FunctionComponent } from "react";

import { Header } from "./components";

const Project: FunctionComponent = () => {
  return (
    <div className="flex flex-col grow overflow-hidden">
      <Header />
      <main className="grow"></main>
      <footer className="shrink-0 h-6 border-t">footer data</footer>
    </div>
  );
};

export default Project;
