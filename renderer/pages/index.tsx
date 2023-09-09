import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";

const Home: FunctionComponent = () => {
  const router = useRouter();

  const [ports, setPorts] = useState<
    Awaited<ReturnType<typeof window.api.listAvailablePorts>>
  >([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      port: "",
      baudRate: 9600,
    },
  });

  useEffect(() => {
    window.api.listAvailablePorts().then((ports) => {
      setPorts(ports);
    });
  }, []);

  const handleConnect = handleSubmit(async ({ port, baudRate }) => {
    setIsConnecting(true);
    await window.api.connect(port, baudRate);
    setIsConnecting(false);
    router.push("/controller");
  });

  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-full md:max-w-md" radius="md">
        <CardBody className="gap-4">
          <h1 className="text-foreground italic font-light">
            Provide details to establish a connection with a device.
          </h1>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="port"
            render={({ field }) => (
              <Select
                isRequired
                selectionMode="single"
                label="Port"
                selectedKeys={field.value ? [field.value] : []}
                onChange={field.onChange}
                onBlur={field.onBlur}
                radius="sm"
                items={ports}
              >
                {(port) => (
                  <SelectItem key={port.path}>
                    {"friendlyName" in port &&
                    typeof port.friendlyName === "string"
                      ? port.friendlyName
                      : port.path}
                  </SelectItem>
                )}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="baudRate"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input
                radius="sm"
                label="Baud Rate"
                value={field.value.toString()}
                onValueChange={(value) => {
                  const number = Number(value);
                  if (!isNaN(number)) field.onChange(number);
                }}
                isRequired
              />
            )}
          />

          <Button
            size="lg"
            fullWidth
            radius="sm"
            color="primary"
            isLoading={isConnecting}
            onClick={handleConnect}
          >
            Connect
          </Button>
        </CardBody>
      </Card>
    </section>
  );
};

export default Home;
