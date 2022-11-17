#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>
#include "WiFly.h"

#define SSID      "NETLAB-OIL010"
#define KEY       "DesignChallenge"
// check your access point's security mode, mine was WPA20-PSK
// if yours is different you'll need to change the AUTH constant, see the file WiFly.h for avalable security codes
#define AUTH      WIFLY_AUTH_WPA2_PSK

LiquidCrystal_I2C lcd(0x27, 16, 2);
// Pins' connection
// Arduino       WiFly
//  2    <---->    TX
//  3    <---->    RX
 
SoftwareSerial wiflyUart(2, 3); // create a WiFi shield serial object
WiFly wifly(&wiflyUart); // pass the wifi siheld serial object to the WiFly class

String subString;

#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance.
 
void setup()
{
    wiflyUart.begin(9600); // start wifi shield uart port
    Serial.begin(9600); // start the arduino serial port
    lcd.init();
    // Print a message to the LCD.
    lcd.backlight();
    lcd.setCursor(1,0);
    SPI.begin();        // Initiate  SPI bus
    mfrc522.PCD_Init(); // Initiate MFRC522
    Serial.println("--------- Scanner API --------");
 
    // wait for initilization of wifly
    delay(3000);
    wifly.reset(); // reset the shield
    Serial.println("Join " SSID );
    if (wifly.join(SSID, KEY, AUTH)) {
        Serial.println("OK");
        wifly.save();
    } else {
        Serial.println("Failed");
    }
 
    delay(5000);
 
    
 
}
 
void loop()
{
  // Zoeken naar nieuwe kaart
  if (!mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }
  // Selecteer de kaart
  if (!mfrc522.PICC_ReadCardSerial())
  {
    return;
  }
    //As soon as the data  received from the Internet ,output the data through the UART Port .
    // while (wifly.available())
    // {
    //   char c = wifly.read();

    //   if (c == '=')
    //   {
    //     while (wifly.available())
    //     {
    //       c = wifly.read();
    //       subString += c;
    //     }
    //   }
    // }

    // if (subString != "")
    // {
    //   lcd.clear();

    //   int commaIndex = subString.indexOf('.');
      
    //   lcd.print("GreenCoins: " + subString.substring(0, commaIndex));
      
    //   subString = "";
    // }

  //Laat het UID zien in de serial monitor en het aantal punten op het lcd scherm
  Serial.print("UID tag :");
  String content = "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
    delay(1000);
  }
  Serial.println();
  Serial.print("Message : ");
  content.toUpperCase();
  if (content.substring(1) == "A2 88 68 1C") // Dit zorgt ervoor dat de kaart met het opgegeven id het aantal punten laat zien.
  {
    lcd.clear();
    wifly.sendCommand("set ip proto 18\r"); //enable html client
    delay(100);
 
    wifly.sendCommand("set dns name 192.168.164.12\r"); // name of the webserver we want to connect to
    delay(100);
 
    wifly.sendCommand("set ip address 0\r"); // so WiFly will use DNS
    delay(100);
 
    wifly.sendCommand("set ip remote 8000\r"); /// standard webserver port
    delay(100);
 
    wifly.sendCommand("set com remote 0\r"); // turn off the REMOTE string so it does not interfere with the post
    delay(100);
 
    wifly.sendCommand("open\r"); // open connection
    delay(100);
 
    wiflyUart.print("GET /api/users/2/get_user_points/ \n\n");
    delay(1000);

        while (wifly.available())
    {
      char c = wifly.read();

      if (c == '=')
      {
        while (wifly.available())
        {
          c = wifly.read();
          subString += c;
        }
      }
    }

    if (subString != "")
    {
      lcd.clear();

      int commaIndex = subString.indexOf('.');
      
      lcd.print("GreenCoins: " + subString.substring(0, commaIndex));
      
      subString = "";
      wifly.reboot();
    }
    Serial.println();
    delay(3000);
  }
  else if (content.substring(1) == "07 8E 49 52") // Dit zorgt ervoor dat de kaart met het opgegeven id het aantal punten laat zien.
  {
    lcd.clear();
    wifly.sendCommand("set ip proto 18\r"); //enable html client
    delay(100);
 
    wifly.sendCommand("set dns name 192.168.164.12\r"); // name of the webserver we want to connect to
    delay(100);
 
    wifly.sendCommand("set ip address 0\r"); // so WiFly will use DNS
    delay(100);
 
    wifly.sendCommand("set ip remote 8000\r"); /// standard webserver port
    delay(100);
 
    wifly.sendCommand("set com remote 0\r"); // turn off the REMOTE string so it does not interfere with the post
    delay(100);
 
    wifly.sendCommand("open\r"); // open connection
    delay(100);
 
    wiflyUart.print("GET /api/users/1/get_user_points/ \n\n");
    delay(1000);
        while (wifly.available())
    {
      char c = wifly.read();

      if (c == '=')
      {
        while (wifly.available())
        {
          c = wifly.read();
          subString += c;
        }
      }
    }

    if (subString != "")
    {
      lcd.clear();

      int commaIndex = subString.indexOf('.');
      
      lcd.print("GreenCoins: " + subString.substring(0, commaIndex));
      
      subString = "";
      wifly.reboot();
    }
    Serial.println();
    delay(3000);
  } else {
    lcd.clear();
    lcd.print("Niet gevonden");
  }
}