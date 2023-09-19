import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

const CadastroScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
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
      source={require('../components/img/pet.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.cadastroBox}>
          <Text style={styles.title}>Cadastro</Text>
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
          <View style={styles.button}>
            <Button title="Cadastrar" onPress={submit} color="darkgreen" />
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
        backgroundColor: 'rgba(213, 255, 213, 0.8)',
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
