import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const KeyboardInput = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

export default KeyboardInput;