#include <Servo.h>

Servo myServo;
const int servoPin = 3;    // Servo control pin

const int redLedPin = 4;   // Red LED when servo is at 0°
const int greenLedPin = 5; // Green LED when servo is at 90°
const int redBlink1 = 6;   // First blinking red LED
const int redBlink2 = 7;   // Second blinking red LED

String receivedData = "";
int currentAngle = 0; // Stores the servo's current position
bool blinkState = false; // Keeps track of blinking state
unsigned long previousMillis = 0;
const int blinkInterval = 500; // Blinking interval in milliseconds

void setup() {
  myServo.attach(servoPin);
  pinMode(redLedPin, OUTPUT);
  pinMode(greenLedPin, OUTPUT);
  pinMode(redBlink1, OUTPUT);
  pinMode(redBlink2, OUTPUT);

  Serial.begin(115200);
  Serial.println("Setting up");
}

void loop() {
  handleSerialInput();
  handleBlinking(); // Keeps the LEDs blinking independently
}

// Handle incoming serial data
void handleSerialInput() {
  while (Serial.available()) {
    char incomingByte = Serial.read();

    if (incomingByte == '\n') {  
      processCommand(receivedData);
      receivedData = "";
    } else {
      receivedData += incomingByte;
    }
  }
}

// Process incoming commands
void processCommand(String command) {
  Serial.print("Received Data: ");
  Serial.println(command);

  if (command.startsWith("servo:")) {
    int targetAngle = command.substring(6).toInt();
    targetAngle = constrain(targetAngle, 0, 180);
    moveServoSlowly(targetAngle);
    updateLEDs(targetAngle);
  }
}

// Slowly move the servo to the target angle
void moveServoSlowly(int targetAngle) {
  if (targetAngle > currentAngle) {
    for (int angle = currentAngle; angle <= targetAngle; angle++) {
      myServo.write(angle);
      delay(20); 
    }
  } else {
    for (int angle = currentAngle; angle >= targetAngle; angle--) {
      myServo.write(angle);
      delay(20);
    }
  }
  currentAngle = targetAngle; 
}

// Update LED states based on servo position
void updateLEDs(int angle) {
  if (angle == 0) {
    digitalWrite(redLedPin, HIGH);
    digitalWrite(greenLedPin, LOW);
    digitalWrite(redBlink1, LOW);
    digitalWrite(redBlink2, LOW);
  } 
  else if (angle == 90) {
    digitalWrite(redLedPin, LOW);
    digitalWrite(greenLedPin, HIGH);
  } 
  else {
    digitalWrite(redLedPin, LOW);
    digitalWrite(greenLedPin, LOW);
  }
}

// Handle blinking LEDs independently
void handleBlinking() {
  unsigned long currentMillis = millis();

  // Blink red LEDs alternatively when the servo is at 90°
  if (currentAngle == 90) {
    if (currentMillis - previousMillis >= blinkInterval) {
      previousMillis = currentMillis;
      blinkState = !blinkState; // Toggle the state

      digitalWrite(redBlink1, blinkState ? HIGH : LOW);
      digitalWrite(redBlink2, blinkState ? LOW : HIGH);
    }
  } else {
    // Ensure blinking LEDs are OFF when not at 90°
    digitalWrite(redBlink1, LOW);
    digitalWrite(redBlink2, LOW);
  }
}
