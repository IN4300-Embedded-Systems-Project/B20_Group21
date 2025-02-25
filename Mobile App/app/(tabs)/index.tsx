import React, { useState } from 'react';
import { View, Text, Button, Switch, StyleSheet, Alert, TextInput } from 'react-native';

const App = () => {
  // States for light control
  const [isLightOn, setIsLightOn] = useState(false);
  const [brightness, setBrightness] = useState(50); // Brightness scale from 0 to 100
  const [timer, setTimer] = useState(0); // Timer for auto turn-off in minutes

  // Function to toggle light on/off
  const toggleLight = () => {
    setIsLightOn(!isLightOn);
  };

  // Function to handle timer
  const setAutoTurnOff = () => {
    if (timer === 0) {
      Alert.alert('Set a timer', 'Please set a timer to auto turn off the light.');
    } else {
      Alert.alert('Timer Set', `The light will turn off in ${timer} minutes.`);
    }
  };

  // Function to handle brightness change
  const adjustBrightness = (value: string) => {
    const brightnessValue = parseInt(value, 10);
    if (brightnessValue >= 0 && brightnessValue <= 100) {
      setBrightness(brightnessValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Smart Light Rail Control</Text>

      {/* Light On/Off Switch */}
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Light: {isLightOn ? 'ON' : 'OFF'}</Text>
        <Switch
          value={isLightOn}
          onValueChange={toggleLight}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isLightOn ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {/* Brightness Control - Text Input */}
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Brightness: {brightness}%</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(brightness)}
          onChangeText={adjustBrightness}
          placeholder="Enter brightness (0-100)"
        />
      </View>

      {/* Timer Control - Text Input */}
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Set Auto Turn-Off Timer (minutes):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(timer)}
          onChangeText={(value) => setTimer(parseInt(value, 10))}
          placeholder="Enter timer in minutes"
        />
      </View>

      {/* Set Timer Button */}
      <Button title="Set Auto Turn-Off Timer" onPress={setAutoTurnOff} disabled={timer === 0} />

      {/* Reset Button */}
      <Button
        title="Reset Settings"
        color="red"
        onPress={() => {
          setIsLightOn(false);
          setBrightness(50);
          setTimer(0);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  controlLabel: {
    fontSize: 18,
    color: '#333',
    width: '60%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: '30%',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default App;
