export default class Motor {
  constructor() {
    this.on = false;
  }

  update(on) {
    console.log(`MOCK MOTOR IS TURNING ${on ? 'ON' : 'OFF'}`);
    this.on = on;
  }
}
