/**
 * One byte communication protocol
 * -----------------------------
 * | Command bit |  Data bits  |
 * -----------------------------
 * |      1      |   1111111   |
 * -----------------------------
 *
 * READ  - 0 | Data bits unused
 * WRITE - 1 | bit 0-5 (pin number), bit 6 (0 - LOW, 1 - HIGH)
 */

#define BAUD_RATE 57600 // 115200, 250000, 500000, 1000000, 2000000, 9600, 57600

#define COMMAND_READ 0
#define COMMAND_WRITE 1

#define COUNTER_PIN_0 11
#define COUNTER_PIN_1 10
#define COUNTER_PIN_2 9
#define COUNTER_PIN_3 8

#define NUMBER_OF_VOLTAGES_PER_CHANNEL 16
#define NUMBER_OF_VOLTAGE_CHANNELS 4
#define VOLTAGE_MULTIPLIER 1
#define VOLTAGE_COEFFICIENT 0.0048875855327468 // 5 / 1023

#define FRAME_START 0xfd
#define FRAME_ESCAPE 0xfe
#define FRAME_END 0xff

#define READY_BYTE 0b10101010

boolean ready = false;

float measureVoltage(byte pin)
{
  return analogRead(pin) * VOLTAGE_COEFFICIENT * VOLTAGE_MULTIPLIER; // use getResult_mV for millivolts
}

void setup()
{
  // set particular pins as outputs
  pinMode(COUNTER_PIN_0, OUTPUT);
  pinMode(COUNTER_PIN_1, OUTPUT);
  pinMode(COUNTER_PIN_2, OUTPUT);
  pinMode(COUNTER_PIN_3, OUTPUT);

  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  Serial.begin(BAUD_RATE);
}

void loop()
{
  if (!ready)
  {
    Serial.write(READY_BYTE);
    ready = true;
  }

  if (Serial.available() > 0)
  {
    byte input = Serial.read();
    byte command = (input & 0b10000000) >> 7;
    switch (command)
    {
    case COMMAND_READ:
      read(input);
      break;
    case COMMAND_WRITE:
      write(input);
      break;
    }
  }
}

void read(byte input)
{
  byte numberOfVoltages = NUMBER_OF_VOLTAGES_PER_CHANNEL * NUMBER_OF_VOLTAGE_CHANNELS;
  float voltages[numberOfVoltages];
  for (byte i = 0; i < NUMBER_OF_VOLTAGES_PER_CHANNEL; i++)
  {
    digitalWrite(COUNTER_PIN_0, (i & 0b0001));
    digitalWrite(COUNTER_PIN_1, (i & 0b0010) >> 1);
    digitalWrite(COUNTER_PIN_2, (i & 0b0100) >> 2);
    digitalWrite(COUNTER_PIN_3, (i & 0b1000) >> 3);

#if NUMBER_OF_VOLTAGE_CHANNELS > 0
    voltages[i] = measureVoltage(A0);
#endif
#if NUMBER_OF_VOLTAGE_CHANNELS > 1
    voltages[i + 16] = measureVoltage(A1);
#endif
#if NUMBER_OF_VOLTAGE_CHANNELS > 2
    voltages[i + 32] = measureVoltage(A2);
#endif
#if NUMBER_OF_VOLTAGE_CHANNELS > 3
    voltages[i + 48] = measureVoltage(A3);
#endif
  }

  Serial.write(FRAME_START);
  for (byte i = 0; i < numberOfVoltages; i++)
  {
    float voltage = voltages[i];
    byte *bytes = (byte *)&voltage;

    for (byte j = 0; j < 4; j++)
    {
      byte quartal = bytes[j];
      if (quartal == FRAME_START || quartal == FRAME_ESCAPE || quartal == FRAME_END)
      {
        Serial.write(FRAME_ESCAPE);
      }
      Serial.write(quartal);
    }
  }
  Serial.write(FRAME_END);
  Serial.flush();
}

void write(byte input)
{
  byte pin = (input & 0b01111110) >> 1;
  byte val = (input & 0b00000001);

  digitalWrite(pin, val);
}
