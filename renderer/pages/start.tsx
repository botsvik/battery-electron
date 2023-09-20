import { FunctionComponent, useState } from "react";

import { Button } from "@renderer/components/ui";
import { IconFileImport, IconFilePlus } from "@tabler/icons-react";
import { RecentProjectsList } from "@renderer/components/app/start";

const Start: FunctionComponent = () => {
  const [disabled, setDisabled] = useState(false);

  const handleCreateProject = async () => {
    setDisabled(true);
    await window.api.createProject();
    setDisabled(false);
  };

  const handleLoadProject = async () => {
    setDisabled(true);
    await window.api.loadProject();
    setDisabled(false);
  };

  return (
    <div className="flex flex-col gap-4 h-screen w-full p-4">
      <section className="grow">
        <h1 className="mb-4 font-semibold">Get started</h1>
        <RecentProjectsList title="Recent" />
      </section>
      <section className="flex shrink-0 justify-end gap-2">
        <Button disabled={disabled} onClick={handleCreateProject}>
          <IconFilePlus className="mr-2 h-4 w-4" />
          Create a new project
        </Button>
        <Button disabled={disabled} onClick={handleLoadProject}>
          <IconFileImport className="mr-2 h-4 w-4" />
          Open existing project
        </Button>
      </section>
    </div>
  );
};

export default Start;
