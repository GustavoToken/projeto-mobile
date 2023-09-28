import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

const CadastroScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage('As senhas não coincidem');
        setPasswordsMatch(false);
        return;
      }

      setErrorMessage('');
      setPasswordsMatch(true);

      const user = {
        email: email,
        password: password,
      };

      const req = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/register/', user);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../components/img/pokemon2.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.cadastroBox}>
          <Text style={styles.title}>Cadastro</Text>
          <TextInput
            placeholder="Digite seu email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={[styles.input, !passwordsMatch && styles.inputError]}
          />
          <TextInput
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
            style={[styles.input, !passwordsMatch && styles.inputError]}
          />
          {!passwordsMatch && <Text style={styles.errorMessage}>{errorMessage}</Text>}
          <View style={styles.button}>
            <Button title="Cadastrar" onPress={submit} color="#A34704" />
          </View>
          <Text style={styles.textCadastro}>
            Já tem conta? <Text style={styles.textLink} onPress={navigateToLogin}>Entrar</Text>
          </Text>
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
  textCadastro: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textLink: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'blue'
  },
  cadastroBox: {
    backgroundColor: 'rgba(255, 180, 74, 0.9)',
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
  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: -10,
    marginBottom: 6,
  },
  button: {
    marginBottom: 14,
  },
  buttonSpacing: {
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default CadastroScreen;
