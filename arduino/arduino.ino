#include <ADS1115_WE.h>
#include <Wire.h>

/**
 * One byte communication protocol
 * ----
 * command bits |  data bits
 * --------------------------
 *    11        |  11 11 11
 *
 * available commands: 2
 * 
 * command READ_SENSORS - 0
 * command WRITE_PIN    - 1
 * 
 * 
 */

// Serial configuration
#define BAUD_RATE 9600
#define I2C_ADDRESS 0x48

// Command configuration
#define MAX_COMMAND_BUFFER_SIZE 16
#define COMMAND_BEGIN_MARKER 60 // < þ
#define COMMAND_END_MARKER 62   // > ÿ

// Available commands
#define COMMAND_READ_SENSORS 1
#define COMMAND_WRITE_PINS 2

// Loop state
#define STATE_AWAITING_COMMAND 0
#define STATE_READING_COMMAND 1
#define STATE_EXECUTING_COMMAND 2

// Initial state
byte state = STATE_AWAITING_COMMAND;

// Command buffer
byte commandSize = 0;
byte commandBuffer[MAX_COMMAND_BUFFER_SIZE];

void setup()
{
  Serial.begin(BAUD_RATE);
}

void loop()
{
  if (Serial.available() > 0)
  {
    byte x = Serial.read();
    if (x == COMMAND_BEGIN_MARKER)
    {
      String str = Serial.readStringUntil(COMMAND_END_MARKER);
      Serial.println(str);
      for (byte i = 0; i < commandSize; i++)
      {
        Serial.print(commandBuffer[i]);
        Serial.print(" ");
      }

      Serial.println("");
    }
  }
  // awaitCommand();
  // executeCommand();
}

void awaitCommand()
{
  if (state == STATE_AWAITING_COMMAND || state == STATE_READING_COMMAND)
  {
    if (Serial.available() > 0)
    {
      int x = Serial.readBytesUntil('g', commandBuffer, MAX_COMMAND_BUFFER_SIZE);

      if (x == COMMAND_BEGIN_MARKER)
      {
        commandSize = 0;
        state = STATE_READING_COMMAND;
      }

      if (state == STATE_READING_COMMAND)
      {
        commandBuffer[commandSize] = x;
        commandSize += 1;

        if (commandSize == MAX_COMMAND_BUFFER_SIZE && x != COMMAND_END_MARKER)
        {
          commandSize = 0;
          state = STATE_AWAITING_COMMAND;
        }

        if (x == COMMAND_END_MARKER)
        {
          state = STATE_EXECUTING_COMMAND;
        }
      }
    }
  }
}

void executeCommand()
{
  if (state == STATE_EXECUTING_COMMAND)
  {
    for (byte i = 0; i < commandSize; i++)
    {
      Serial.print(commandBuffer[i]);
    }
    commandSize = 0;
    state = STATE_AWAITING_COMMAND;
  }
}