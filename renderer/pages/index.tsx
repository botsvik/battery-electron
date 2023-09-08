import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Divider,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleConnect = () => {
    window.controller.connect("COM24", 25490);
  };

  return (
    <section className="bg-primary flex items-center justify-center h-screen">
      <Card className="w-full md:max-w-md" radius="md">
        <CardBody className="gap-4">
          <h1 className="text-foreground-400 italic text-sm font-light">
            Provide details to establish a connection with a device.
          </h1>
          <Input radius="sm" label="Port" defaultValue="COM3" isRequired />
          <Input radius="sm" label="Baud Rate" defaultValue="9600" isRequired />
          <Button
            size="lg"
            fullWidth
            radius="sm"
            color="primary"
            onClick={handleConnect}
          >
            Connect
          </Button>
        </CardBody>
      </Card>
    </section>
  );
}
