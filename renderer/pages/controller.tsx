import { Button } from "@nextui-org/react";
import { FunctionComponent, useEffect } from "react";

const Controller: FunctionComponent = () => {
  useEffect(() => {
    const unsubscribe = window.backend.controller.handleVoltageUpdate((voltages) => {
      console.log(new Date(), voltages);
    });
    return unsubscribe;
  }, []);

  return <Button onClick={async () => {}}>Read</Button>;
};

export default Controller;
