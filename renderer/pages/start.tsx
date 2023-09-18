import { FunctionComponent } from "react";

import { Button } from "@renderer/components/ui";
import { IconFileImport, IconFilePlus } from "@tabler/icons-react";
import { RecentProjectsList } from "@renderer/components/app/start";

const Start: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-4 h-screen w-full p-4">
      <section className="grow">
        <h1 className="mb-4 font-semibold">Get started</h1>
        <RecentProjectsList title="Recent" />
      </section>
      <section className="flex shrink-0 justify-end gap-2">
        <Button>
          <IconFilePlus className="mr-2 h-4 w-4" />
          Create a new project
        </Button>
        <Button
          onClick={() => {
            window.api.loadProject();
          }}
        >
          <IconFileImport className="mr-2 h-4 w-4" />
          Open existing project
        </Button>
      </section>
    </div>
  );
};

export default Start;
