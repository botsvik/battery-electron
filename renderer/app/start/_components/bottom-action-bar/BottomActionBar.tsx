"use client";

import { FunctionComponent } from "react";
import { FileIcon, FilePlusIcon } from "@radix-ui/react-icons";

import { Button } from "@renderer/components";

export const BottomActionBar: FunctionComponent = () => {
  const handleCreateProject = async () => {
    await window.api.createProject();
  };

  const handleLoadProject = async () => {
    await window.api.loadProject();
  };

  return (
    <div className="flex shrink-0 justify-end gap-2 p-4 border-t">
      <Button onClick={handleCreateProject}>
        <FilePlusIcon className="-ml-2 mr-2 h-5 w-5" />
        Create a new project
      </Button>
      <Button onClick={handleLoadProject}>
        <FileIcon className="-ml-2 mr-2 h-5 w-5" />
        Open existing project
      </Button>
    </div>
  );
};
