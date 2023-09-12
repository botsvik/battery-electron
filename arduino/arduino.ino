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

#include <ADS1115_WE.h>
#include <Wire.h>

#define BAUD_RATE 9600    // 115200, 250000, 500000, 1000000, 2000000, 9600, 57600
#define WIRE_CLOCK 400000 // Set I2C clock to 400kHz. it is maximum for MEGA2560
#define I2C_ADDRESS 0x48

#define COMMAND_READ 0
#define COMMAND_WRITE 1

#define MULTIPLEXER_PIN 14
#define COUNTER_PIN_0 16
#define COUNTER_PIN_1 17
#define COUNTER_PIN_2 18
#define COUNTER_PIN_3 19

#define VOLTAGE_MULTIPLIER 5
#define NUMBER_OF_VOLTAGES_PER_CHANNEL 16
#define NUMBER_OF_VOLTAGE_CHANNELS 3

ADS1115_WE adc = ADS1115_WE(I2C_ADDRESS);

bool isPinWritable(byte pin)
{
  return (2 <= pin && pin <= 13) || (22 <= pin <= 53);
}

float measureVoltage(ADS1115_MUX channel)
{
  adc.setCompareChannels(channel);
  adc.startSingleMeasurement();
  while (adc.isBusy())
  {
    // Do nothing
  }
  return adc.getResult_V() * VOLTAGE_MULTIPLIER; // use getResult_mV for millivolts
}

void setup()
{
  // set particular pins as outputs
  // pinMode(13, OUTPUT); // heart bit generator
  pinMode(MULTIPLEXER_PIN, OUTPUT);
  pinMode(15, OUTPUT); // Spare

  pinMode(COUNTER_PIN_0, OUTPUT);
  pinMode(COUNTER_PIN_1, OUTPUT);
  pinMode(COUNTER_PIN_2, OUTPUT);
  pinMode(COUNTER_PIN_3, OUTPUT);

  for (byte pin = 2; pin < 53; pin++)
  {
    if (isPinWritable(pin))
    {
      pinMode(pin, OUTPUT);
    }
  }

  Wire.begin();
  Wire.setClock(WIRE_CLOCK);
  Serial.setTimeout(500); // set new value to 1 milliseconds
  Serial.begin(BAUD_RATE);
}

void loop()
{
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

    voltages[i] = measureVoltage(ADS1115_COMP_0_GND);
    voltages[i + 16] = measureVoltage(ADS1115_COMP_1_GND);
    voltages[i + 32] = measureVoltage(ADS1115_COMP_2_GND);
  }

  for (byte i = 0; i < numberOfVoltages; i++)
  {
    Serial.write(voltages[i]); // float is 4 bytes
  }
}

void write(byte input)
{
  byte pin = (input & 0b01111110) >> 1;
  if (isPinWritable(pin))
  {
    byte val = (input & 0b00000001);
    digitalWrite(pin, val);
  }
}
