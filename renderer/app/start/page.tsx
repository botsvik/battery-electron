import { FunctionComponent } from "react";

import { RecentDocuments, BottomActionBar } from "./components";

const Start: FunctionComponent = () => {
  return (
    <div className="flex flex-col grow overflow-hidden">
      <h1 className="font-medium text-xl shrink-0 px-4 py-2">
        Open recent
      </h1>
      <RecentDocuments />
      <BottomActionBar />
    </div>
  );
};

export default Start;
