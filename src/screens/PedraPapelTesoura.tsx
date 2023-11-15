import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const JogoPedraPapelTesoura = ({
  onGameEnd,
}: {
  onGameEnd: (isWinner: boolean) => void;
}) => {
  const [escolhaDoUsuario, setEscolhaDoUsuario] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [userWins, setUserWins] = useState(false);

  const opcoes = ['Pedra', 'Papel', 'Tesoura'];

  const handlePlayGame = (escolhaUsuario: string) => {
    const escolhaAdversario =
      opcoes[Math.floor(Math.random() * opcoes.length)];
    console.log('Escolha do Adversário:', escolhaAdversario);

    const resultadoJogo =
      escolhaUsuario === escolhaAdversario
        ? 'Empate'
        : (escolhaUsuario === 'Pedra' && escolhaAdversario === 'Tesoura') ||
          (escolhaUsuario === 'Papel' && escolhaAdversario === 'Pedra') ||
          (escolhaUsuario === 'Tesoura' && escolhaAdversario === 'Papel')
          ? 'Vitória'
          : 'Derrota';

    const userWins = resultadoJogo === 'Vitória';

    setModalContent(
      `${resultadoJogo === 'Empate' ? 'Empate' : userWins ? 'Você ganhou!' : 'Você perdeu!'}\n
      Sua escolha: ${escolhaUsuario}\n
      Escolha do Adversário: ${escolhaAdversario}\n`
    );

    setModalVisible(true);
    setUserWins(userWins);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        ></KeyboardAwareScrollView>

        <Text style={styles.text}>
          Escolha entre Pedra, Papel ou Tesoura:
        </Text>
        <View style={styles.choiceContainer}>
          {opcoes.map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={styles.choiceButton}
              onPress={() => setEscolhaDoUsuario(opcao)}
            >
              <Text style={styles.choiceText}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePlayGame(escolhaDoUsuario)}
        >
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setEscolhaDoUsuario('');
              }}
            >
              <Text style={styles.buttonTextModal}>Continuar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                onGameEnd(userWins);
              }}
            >
              <Text style={styles.buttonTextModalEncerrar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 100,
  },
  choiceButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    width: 120,
    alignItems: 'center',
  },
  choiceText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: 'black',
    padding: 30,
    borderRadius: 12,
    marginTop: 20,
    width: 280,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 60,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonTextModal: {
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 120,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonTextModalEncerrar: {
    backgroundColor: 'darkred',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 120,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default JogoPedraPapelTesoura;
