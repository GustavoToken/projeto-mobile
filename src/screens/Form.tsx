import React, { useState } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, Button } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});

const Form = ({ navigation }: any) => {
  const [text, setText] = useState<string>();
  const [hasError, setHasError] = useState(false);

  const onChangeInput = (value: string) => {
    if (value.length >= 6) {
      setHasError(false);
    } else {
      setHasError(true);
    }
    setText(value);
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeInput}
      />
      {hasError ? <Text>Digite pelo menos 6 caracteres</Text> : null}

      <Button
        onPress={() => {
          navigation.navigate('Home', { id: 1 });
        }}
        title="Navegar para a tela Home"
      />
    </SafeAreaView>
  );
};

export default Form;
