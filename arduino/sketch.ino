// ARDUINO CODE: 3_X_ADS1115_print

#include <ADS1115_WE.h>
#include <Wire.h>
#include <millisDelay.h>
#define I2C_ADDRESS 0x48

millisDelay shutDown;

unsigned long timeBegin = 0; // to calculate code execution time
unsigned long exeTime = 0;

// ================  PINS =============================
int ContrPins[] = {
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 51, 52, 53, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13}; // 22 -> 53;( 32 cell control, digital outputs)  2  -> 13;(AUX DEV) ---   control channel, digital IO

int ContrPinCount = 44; // must be equal to  data lenght  (contr_pin_list) from Python

int pin0 = 13; // heart bit generator

// ------------ BINARY COUNTER PINS -----------------------------------

int pin1 = 14; //   multiplexer 74HC4067 ENable pin
int pin2 = 15; // pins 15,16,17,18 used for binary counter
int PIN_3 = 16;
int PIN_4 = 17;
int PIN_5 = 18;
int PIN_6 = 19; // spare

// pins 20, 21; used for I2C communiication; not in code

// int timr = 50;

int i = 0;
int n = 0;
int t = 0;

float I2cArray[48]; // init empy array for I2C data collection

const int BUFFER_SIZE = 44;
char buf[BUFFER_SIZE];

ADS1115_WE adc = ADS1115_WE(I2C_ADDRESS);

void setup()
{
  pinMode(pin0, OUTPUT); // set particular pins as outputs
  pinMode(pin1, OUTPUT); // set particular pins as outputs
  pinMode(pin2, OUTPUT);
  pinMode(PIN_3, OUTPUT);
  pinMode(PIN_4, OUTPUT);
  pinMode(PIN_5, OUTPUT);
  pinMode(PIN_6, OUTPUT); // spare
  {
    for (int Pin = 0; Pin < ContrPinCount; Pin++)
    { // set all control pins as outputs
      pinMode(ContrPins[Pin], OUTPUT);
    }
  }

  Wire.begin();
  Wire.setClock(400000UL); // Set I2C clock to 400kHz. it is maximum for MEGA2560
  Serial.begin(1000000);   // 115200, 250000, 500000, 1000000, 2000000, 9600, 57600
  Serial.setTimeout(500);  // set new value to 1 milliseconds
  while (!Serial)
  {
    // Do nothing
  }

  adc.setVoltageRange_mV(ADS1115_RANGE_6144); // set ADS input range to 6,144 mV
  adc.setConvRate(250);
}

void loop()
{
  timeBegin = millis(); // to calculate code execution time
  if (Serial.available() > 0)
  {
    char command = Serial.read(); // read character from serial connection
    if (command == 'R')
    {
      for (int i = 0; i < 16; i++)
      {
        digitalWrite(PIN_3, i % 2 > 0 ? HIGH : LOW);
        digitalWrite(PIN_4, i % 4 > 1 ? HIGH : LOW);
        digitalWrite(PIN_5, i % 8 > 3 ? HIGH : LOW);
        digitalWrite(PIN_6, i % 16 > 7 ? HIGH : LOW);

        // ===== collect I2C & Analog data  =========

        I2cArray[i] = readChannel(ADS1115_COMP_0_GND);
        I2cArray[i + 16] = readChannel(ADS1115_COMP_1_GND);
        I2cArray[i + 32] = readChannel(ADS1115_COMP_2_GND);
      }
      // =======   send I2C & Analog data --> Python =============

      for (int i = 0; i < 48; i++)
      {
        Serial.print(I2cArray[i]);
        Serial.print(",");
      }
      exeTime = millis() - timeBegin;
      Serial.println(exeTime);
    }

    else if (command == 'W')
    {
      byte inByte;
      for (n = 0; n < ContrPinCount; n++)
      {
        if (byte(Serial.read()) == '\x01')
        {
          digitalWrite(ContrPins[n], HIGH);
        }
        else
        {
          digitalWrite(ContrPins[n], LOW);
        }
      }
    }
    Serial.flush();
  }

  delay(5); // necessary for output signal stability
}
// ========== code to RUN ADS1115 ADC ===============

float readChannel(ADS1115_MUX channel)
{
  float voltage = 0.0;
  adc.setCompareChannels(channel);
  adc.startSingleMeasurement();
  while (adc.isBusy())
  {
  }
  voltage = adc.getResult_V(); // alternative: getResult_mV for Millivolt
  return voltage;
}
