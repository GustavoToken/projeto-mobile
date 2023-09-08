import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

type MyButtonProps = {
  title: string;
  onPressButton: () => void;
  color: string;
  subtitle: string;
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
  },
});

const MyButton = ({title, onPressButton, color, subtitle}: MyButtonProps) => {
  return (
    <TouchableOpacity onPress={onPressButton}>
      <View style={{...styles.buttonContainer, backgroundColor: color}}>
        <Text style={styles.title}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyButton;
