import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ImageBackground, } from "react-native";
import PedraPapelTesoura from "./PedraPapelTesoura";
import axios from "../axios.config";
// @ts-ignore
const getPetDetails = async (id) => {
  try {
    const response = await axios.get(`/pet/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do pet", error);
    return null;
  }
};

const getAvatarImage = (petName: string) => {
  switch (petName.toLowerCase()) {
    case "pikachu":
      return require('../components/img/pikachu.png');
    case "bulbassauro":
      return require('../components/img/bullbasaur.png');
    case "charmander":
      return require('../components/img/charmander.png');
    case "meowth":
      return require('../components/img/meowth.png');
    case "snorlax":
      return require('../components/img/snorlax.png');
    default:
      return require('../components/img/avatar.png');
  }
};
// @ts-ignore
const Detalhes = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [petDetails, setPetDetails] = useState<any>(null);
  const [jogoAberto, setJogoAberto] = useState(false);

  const voltar = () => {
    navigation.navigate('ListPage');
  };

  const handleGameEnd = () => {
    setJogoAberto(false);
    brincarComPet();
  };

  const alimentarPet = async () => {
    try {
      const lifeBefore = Math.floor(Math.round(petDetails?.life));
      const hungerBefore = Math.floor(Math.round(petDetails?.foodLevel));

      await axios.post(`/pet/${id}/food`);
      console.log("Pet alimentado.");

      if (petDetails) {
        const newLife = petDetails.life + 1;
        const newHunger = Math.floor(Math.round(petDetails.foodLevel - 10));

        setPetDetails({
          ...petDetails,
          life: newLife,
          foodLevel: newHunger,
        });

        const lifeAfter = Math.floor(Math.round(newLife));
        const hungerAfter = Math.floor(Math.round(newHunger));

        Alert.alert(
          "Pet alimentado!",
          `Nível de vida: ${lifeBefore} > ${lifeAfter}\nNível de fome: ${hungerBefore} > ${hungerAfter}`
        );
      }
    } catch (error) {
      Alert.alert("Houve um erro ao alimentar o pet");
    }
  };

  const aumentarDescansoPet = async () => {
    try {
      const lifeBefore = Math.floor(Math.round(petDetails?.life));

      await axios.post(`/pet/${id}/rest`);
      console.log("Descanso do pet aumentado.");

      if (petDetails) {
        const newLife = petDetails.life + 1;

        setPetDetails({
          ...petDetails,
          life: newLife,
        });

        const lifeAfter = Math.floor(Math.round(newLife));

        Alert.alert(
          "Pet Descansou",
          `Nível de vida: ${lifeBefore} > ${lifeAfter}`
        );
      }
    } catch (error) {
      Alert.alert(
        "Houve um erro ao aumentar o descanso do pet"
      );
    }
  };

  const brincarComPet = async () => {
    try {
      const DiversaoAntes = Math.floor(Math.round(petDetails?.funLevel));

      await axios.post(`/pet/${id}/play`);
      console.log("Pet se divertiu");

      if (petDetails) {
        const Novadiversao = petDetails.funLevel + 1;

        setPetDetails({
          ...petDetails,
          funLevel: Novadiversao,
        });

        const DiversaoDepois = Math.floor(Math.round(Novadiversao));

        Alert.alert(
          "Foi muito divertido!",
          `Nível de Diversão: ${DiversaoAntes} > ${DiversaoDepois}`
        );
      }
    } catch (error) {
      Alert.alert(
        "Houve um erro ao aumentar o descanso do pet"
      );
    }
  };

  useEffect(() => {
    const { id } = route.params;
    const fetchPetDetails = async () => {
      const details = await getPetDetails(id);
      setPetDetails(details);
    };
    fetchPetDetails();
  }, []);

  return (
    <ImageBackground
      source={require('../components/img/paisagem.jpeg')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {jogoAberto ? (
          <PedraPapelTesoura onGameEnd={handleGameEnd} />
        ) : petDetails ? (
          <View style={styles.card}>
            <View style={styles.petInfoContainer}>
              <Image source={getAvatarImage(petDetails.name)} style={styles.avatar} />
              <View style={styles.petDetails}>
                <Text style={styles.petDetailsNome}>{petDetails.name}</Text>
                <Text style={styles.petDetailsNivel}>
                  Level: {Math.round(petDetails.restLevel)}
                </Text>
                <Text style={styles.petDetailsStats}>
                  Vida: {Math.round(petDetails.life)}
                </Text>
                <Text style={styles.petDetailsStats}>
                  Diversão: {Math.round(petDetails.funLevel)}
                </Text>
                <Text style={styles.petDetailsStats}>
                  Fome: {Math.round(petDetails.foodLevel)}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.btnAlimentar]}
                onPress={alimentarPet}
              >
                <Text style={[styles.buttonText, { color: 'black' }]}>Alimentar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonContainer, styles.btnDormir]}
                onPress={aumentarDescansoPet}
              >
                <Text style={[styles.buttonText, { color: 'black' }]}>Dormir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonContainer, styles.btnBrincar]}
                onPress={() => {
                  setJogoAberto(true);
                }}
              >
                <Text style={[styles.buttonText, { color: 'black' }]}>Brincar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.btnLogout]}
              onPress={voltar}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>Voltar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  petInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  petDetails: {
    marginLeft: 10,
  },
  petDetailsNome: {
    fontSize: 28,
    color: "#333333",
    marginVertical: 5,
    fontWeight: "bold",
  },
  petDetailsNivel: {
    fontSize: 20,
    color: "#333333",
    marginVertical: 10,
    fontWeight: "bold",
  },
  petDetailsStats: {
    fontSize: 16,
    color: "#333333",
    marginVertical: 5,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    marginBottom: 0,
    marginRight: 30,
  },
  buttonContainer: {
    marginVertical: 10,
    width: 200,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnAlimentar: {
    borderColor: 'black',
    borderWidth: 2,
    marginRight: 5,
    width: 90,
    backgroundColor: '#ffcc85',
  },
  btnDormir: {
    borderColor: 'black',
    borderWidth: 2,
    marginRight: 5,
    width: 90,
    backgroundColor: '#c7c8ff',
  },
  btnBrincar: {
    borderColor: 'black',
    borderWidth: 2,
    width: 90,
    backgroundColor: 'pink',
  },
  btnLogout: {
    borderColor: 'black',
    borderWidth: 2,
    width: 280,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
});

export default Detalhes;
