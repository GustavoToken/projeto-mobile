import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      const user = {
        email: email,
        password: password,
      };

      const req = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/login/', user);

      navigation.navigate('Home', { email: email, senha: password });
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <ImageBackground
      source={require('../components/img/pet.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Login" onPress={submit} color="#950006" />

          <View style={styles.buttonSpacing}></View>

          <Button title="Cadastre-se" onPress={navigateToCadastro} color="#690004" />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginBox: {
    backgroundColor: 'rgba(200, 200, 200, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  buttonSpacing: {
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default LoginScreen;
