import { FunctionComponent, useState } from "react";
import { FileIcon, FilePlusIcon } from "@radix-ui/react-icons";

import { Button } from "@renderer/components/ui";
import { RecentDocumentsList } from "@renderer/components/app/start";

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
    <div className="flex flex-col grow overflow-hidden">
      <h1 className="font-semibold text-2xl shrink-0 px-4 py-2">Get started</h1>
      <RecentDocumentsList className="overflow-hidden grow" />
      <div className="flex shrink-0 justify-end gap-2 p-4 border-t">
        <Button disabled={disabled} onClick={handleCreateProject}>
          <FilePlusIcon className="mr-2 h-4 w-4" />
          Create a new project
        </Button>
        <Button disabled={disabled} onClick={handleLoadProject}>
          <FileIcon className="mr-2 h-4 w-4" />
          Open existing project
        </Button>
      </div>
    </div>
  );
};

export default Start;
