
void setup() {
  // put your setup code here, to run once:
 Serial.begin(9600);  // Debugging only
  Serial.println("setup");
}

void loop() {
  // put your main code here, to run repeatedly:
  int value = analogRead(A7);
  //Serial.print("sensor = " );
  Serial.println(value);
 delay(200);
}
