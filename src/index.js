import awsIot from 'aws-iot-device-sdk';
import Motor from './motor';
import shadowConfig from './config';

const thingShadow = awsIot.thingShadow(shadowConfig);

const motor = new Motor();

const generateReportedShadowUpdate = (motor) => {
  return {
    state: {
      reported: {
        on: motor.on
      }
    }
  };
};

const onConnect = () => {
  thingShadow.register(shadowConfig.clientId, {}, () => {
    console.log(`connected on ${shadowConfig.clientId}`);
    thingShadow.update(shadowConfig.clientId, generateReportedShadowUpdate(motor));
  });
};

const onDelta = (thingName, stateObject) => {
   console.log(`received delta on ${thingName}: ${JSON.stringify(stateObject)}`);
   motor.update(stateObject.state.on);
   thingShadow.update(shadowConfig.clientId, generateReportedShadowUpdate(motor));
};

const onStatus = (thingName, stat, clientToken, stateObject) => {
  console.log(`received ${stat} on ${thingName}: ${JSON.stringify(stateObject)}`);
};

const onTimeout = (thingName, clientToken) => {
  console.log(`received timeout on ${thingName} with token: ${clientToken}`);
};


thingShadow.on('connect', onConnect);
thingShadow.on('delta', onDelta);
thingShadow.on('status', onStatus);
thingShadow.on('timeout', onTimeout);
