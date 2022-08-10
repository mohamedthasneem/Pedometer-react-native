/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet, Text, View, Button, TextInput,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
// import {
//   observeSteps,
//   unobserveSteps,
//   askPermissions,
//   addListener,
// } from 'react-native-onfoot';
// import StepcounterIosAndroid from "react-native-stepcounter-ios-android";
import Pedometer from 'rn-pedometer';

const App = () => {
  const [steps, setSteps] = useState(0);
  const [stepsBetween, setStepsBetween] = useState(0);

  // const [date, setDate] = useState(new Date().toISOString());
  // const [active, setActive] = useState(false);

  // const listener = useRef(null);

  // useEffect(() => {
  //   askPermissions();
  // }, []);

  // useEffect(() => {
  //   if (active) {
  //     observeSteps(date);
  //     listener.current = addListener(steps => setSteps(steps));
  //   } else {
  //     unobserveSteps();
  //     listener.current?.remove();
  //   }
  // }, [setSteps, active, date]);

  // useEffect(() => {
  //   StepcounterIosAndroid.isSupported()
  //     .then((result) => {
  //       if (result) {
  //         console.log('Sensor TYPE_STEP_COUNTER is supported on this device');

  //         const myModuleEvt = new NativeEventEmitter(
  //           NativeModules.StepcounterIosAndroid
  //         );
  //         myModuleEvt.addListener('StepCounter', (data) => {
  //           console.log('STEPS', data.steps);
  //           setSteps(data.steps);
  //         });

  //         StepcounterIosAndroid.startStepCounter();
  //       } else {
  //         console.log(
  //           'Sensor TYPE_STEP_COUNTER is not supported on this device'
  //         );
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   return () => StepcounterIosAndroid.stopStepCounter();
  // }, []);

  useEffect(() => {

    Pedometer.isStepCountingAvailable((error, isAvailable) => {
      // do something
      console.log("StepCounting", isAvailable);
    });

    Pedometer.isDistanceAvailable((error, isAvailable) => {
      // do something
      console.log("Distance", isAvailable);

    });

    Pedometer.isFloorCountingAvailable((error, isAvailable) => {
      // do something
      console.log("FloorCounting", isAvailable);

    });

    Pedometer.isCadenceAvailable((error, isAvailable) => {
      // do something
      console.log("Cadence", isAvailable);

    });

    const now = new Date();
    Pedometer.startPedometerUpdatesFromDate(now.getTime(), pedometerData => {
      // do something with pedometer data
      console.log("PedometerUpdates", pedometerData);
      setSteps(pedometerData.numberOfSteps);
    });

    const startDate = new Date();
    // console.log("startDate", startDate);
    // startDate.setDate(startDate.getDate() - 1);
    console.log("startDate", startDate);


    // const startDate = `2022-08-09T18:30:00.000Z`;
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    console.log("endDate", startDate);

    Pedometer.queryPedometerDataBetweenDates(startDate.getTime(), endDate.getTime(), pedometerData => {
      // do something with pedometer data
      console.log("DataBetweenDates", pedometerData);
      setStepsBetween(pedometerData.numberOfSteps);
    });

  }, []);


  return (
    <View style={styles.container}>
      <Text>Steps count: {steps}</Text>
      <Text>Steps count B: {stepsBetween}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
});

export default App;
