import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  ImageBackground,
  Image,
  KeyboardAvoidingView,  // Adicionando o import da biblioteca
  Platform,  // Adicionando o import da biblioteca
} from "react-native";
import axios from '../axios.config';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

type ListItemProps = {
  pets: {
    id: string;
    name: string;
    vida: number;
    nivelSono: number;
  };
  onDelete: (id: string) => void;
  onEdit: () => void;
};

const ListItem = ({ pets, onDelete, onEdit }: ListItemProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(pets.name);
  const navigation = useNavigation();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (id: string) => {
    try {
      await axios.put(`/pet/${pets.id}`, { name: editedName });
      await onEdit();
    } catch (error) {
      Alert.alert('Erro', 'Tivemos problemas ao editar o pet');
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/pet/${pets.id}`);
      onDelete(pets.id);
    } catch (error) {
      Alert.alert('Erro', 'Tivemos problemas ao excluir o pet');
    }
  };

  const getAvatarImage = (petName: string) => {
    if (petName.toLowerCase() === "pikachu") {
      return require('../components/img/pikachu.png');
    }
    else if (petName.toLowerCase() === "bulbassauro") {
      return require('../components/img/bullbasaur.png');
    }
    else if (petName.toLowerCase() === "charmander") {
      return require('../components/img/charmander.png');
    }
    else if (petName.toLowerCase() === "meowth") {
      return require('../components/img/meowth.png');
    }
    else if (petName.toLowerCase() === "snorlax") {
      return require('../components/img/snorlax.png');
    }
    else {
      return require('../components/img/avatar.png');
    }
  };

  const navigateToDetalhes = () => {
    //@ts-ignore
    navigation.navigate('Detalhes', { id: pets.id, name: pets.name });
  };

  return (
    <TouchableOpacity onPress={() => navigateToDetalhes()}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image source={getAvatarImage(pets.name)} style={styles.avatar} />
        </View>
        <View style={styles.cardTextContainer}>
          {editing ? (
            <TextInput
              style={styles.editInput}
              value={editedName}
              onChangeText={(text) => setEditedName(text)}
            />
          ) : (
            <>
              <Text style={styles.cardText}>Nome: {pets.name}</Text>
              {/* @ts-ignore */}
              <Text style={styles.additionalInfo}>Vida: {Math.round(pets.life)}</Text>
              {/* @ts-ignore */}
              <Text style={styles.additionalInfo}>Fome: {Math.round(pets.foodLevel)}</Text>
            </>
          )}
        </View>
        <TouchableOpacity onPress={() => handleEdit()} style={styles.editButton}>
          <Feather name="edit" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowConfirmation(true)} style={styles.deleteButton}>
          <Feather name="trash-2" size={20} color="red" />
        </TouchableOpacity>
        {editing && (
          <TouchableOpacity onPress={() => handleSave(pets.id)} style={styles.saveButton}>
            <Feather name="check" size={20} color="green" />
          </TouchableOpacity>
        )}
        <Modal transparent={true} animationType="slide" visible={showConfirmation}>
          <View style={styles.confirmationBox}>
            <Text style={styles.confirmationText}>Deseja realmente deletar o pet?</Text>
            <View style={styles.confirmationButtonContainer}>
              <TouchableOpacity
                style={[styles.confirmationButton, styles.confirmButton]}
                onPress={() => handleDelete()}
              >
                <Text style={styles.buttonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmationButton, styles.cancelButton]}
                onPress={() => setShowConfirmation(false)}
              >
                <Text style={styles.buttonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const ListPage = () => {
  const [pets, setPets] = useState<{ id: string; name: string; vida: number; nivelSono: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleDeletePet = (deletedId: string) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== deletedId));
  };

  const getPets = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/pets');
      setPets(data.pets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEditPet = async () => {
    await getPets();
  };

  useFocusEffect(
    React.useCallback(() => {
      getPets(); // Recarrega os dados quando a tela recebe foco
    }, [])
  );

  useEffect(() => {
    getPets(); // Carrega os dados quando o componente é montado
  }, []);

  return (
    <ImageBackground source={require('../components/img/paisagem.jpeg')} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.container}>
          {loading === true ? (
            <ActivityIndicator />
          ) : (
            <>
              <FlatList
                data={pets}
                renderItem={({ item }) => (
                  <ListItem pets={item} onDelete={handleDeletePet} onEdit={handleEditPet} />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </>
          )}
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate('Login')}
              style={[styles.bottomButton, { backgroundColor: 'orange' }]}
            >
              <Text style={styles.buttonText}>Deslogar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate('CadastroPet')}
              style={[styles.bottomButton, { backgroundColor: 'lightblue' }]}
            >
              <Text style={styles.buttonText}>Cadastrar Pet</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    padding: 20
  },
  card: {
    borderWidth: 2,
    borderRadius: 20,
    margin: 5,
    padding: 14,
    width: 368,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalInfo: {
    fontSize: 14,
    color: 'gray',
  },
  editInput: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  confirmationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmationButton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: 'orange',
  },
  cancelButton: {
    backgroundColor: 'lightblue',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginRight: 5,
    gap: 5,
  },
  bottomButton: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '36%',
  },
});

export default ListPage;
