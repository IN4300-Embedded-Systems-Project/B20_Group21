import React from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  const handlePress = () => {
    alert('Button clicked!');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, world!</Text>
      <Button title="Click Me" onPress={handlePress} />
    </View>
  );
};

export default App;
