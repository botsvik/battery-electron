import { ReadyParser, SerialPort } from "serialport";
import _chunk from "lodash/chunk";

const FRAME_START = 0xfd;
const FRAME_ESCAPE = 0xfe;
const FRAME_END = 0xff;
const READY_BYTE = 0b10101010;

const COMMAND_READ = 0b00000000;
const COMMAND_WRITE = 0b10000000;

export class Board {
  private readonly _serialport: SerialPort;
  private _busy = false;

  static async create(port: string, baudRate = 9600) {
    return new Promise<Board>(async (resolve) => {
      const serialport = new SerialPort({ path: port, baudRate });

      /**
       * @see https://serialport.io/docs/api-stream#write
       *
       * There is a bug, where serialport gets paused after receiving 37765 ~37775 bytes and no longer emits `data` event because of parsers.
       * To mitigate this we explicitly call `serialport.unpause()` method in the `data` event handler.
       * @see https://github.com/serialport/node-serialport/issues/2068
       */
      const parser = serialport.pipe(
        new ReadyParser({ delimiter: [READY_BYTE] }),
      );
      parser.on("ready", () => resolve(new Board(serialport)));
    });
  }

  private constructor(serialport: SerialPort) {
    this._serialport = serialport;
  }

  /**
   * Read the voltage data
   *
   * @param timeout
   * @returns
   */
  async read(timeout = 2000) {
    if (this._busy) {
      throw new Error(
        "Board is busy. To avoid this error, do not call read method while other call is being executed.",
      );
    }

    return new Promise<number[]>((resolve, reject) => {
      this._busy = true;
      let startFrameReceived = false;
      let chunkEndWasFrameEscape = false;
      let bytes: number[] = [];

      const handler = (chunk: Buffer) => {
        /**
         * Resume because of bug in serialport.
         */
        this._serialport.resume();

        // Sometimes we skip first byte of chunk
        let skipFirstByte = false;

        if (!startFrameReceived && chunk[0] === FRAME_START) {
          // Denote that frame start byte has been received and we want to start collecting data.
          // Also skip the frame start byte
          startFrameReceived = true;
          skipFirstByte = true;
        }

        if (startFrameReceived) {
          // Check if previous chunk ended with escape byte
          if (chunkEndWasFrameEscape) {
            bytes.push(chunk[0]);
            skipFirstByte = true;
            chunkEndWasFrameEscape = false;
          }

          for (let i = skipFirstByte ? 1 : 0; i < chunk.length; i++) {
            const byte = chunk[i];
            if (byte === FRAME_ESCAPE) {
              const nextByte = chunk.at(i + 1); // i+1 may not exist, meaning we have to escape first byte from next chunk
              if (nextByte === undefined) {
                chunkEndWasFrameEscape = true;
                continue;
              }
              bytes.push(nextByte);
              i++;
              continue;
            }

            if (byte === FRAME_END) {
              clearTimeout(timer);
              this._serialport.removeListener("data", handler);
              const voltages = _chunk(bytes, 4).map((quartet) =>
                Buffer.from(quartet).readFloatLE(),
              );
              resolve(voltages);
              this._busy = false;
              break;
            }

            bytes.push(byte);
          }
        }
      };

      this._serialport.on("data", handler);
      this._serialport.write([COMMAND_READ], "binary", (error) => {
        if (error) reject(error);
      });

      // Create timeout to reject the promise if no frame end byte has been received after `timeout` milliseconds
      let timer = setTimeout(() => {
        this._serialport.removeListener("data", handler);
        reject(new Error("Waited for serial data for too long"));
        this._busy = false;
      }, timeout);
    });
  }

  /**
   * Set pin to high or low
   *
   * @param pin
   * @param value
   */
  async write(pin: number, value: "high" | "low") {
    pin = (pin & 0b00111111) << 1;
    this._serialport.write(
      [COMMAND_WRITE | pin | (value === "high" ? 0b1 : 0b0)],
      "binary",
    );
  }
}
