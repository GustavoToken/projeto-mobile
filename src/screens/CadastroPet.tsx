import React, { useState } from "react";
import { Text, SafeAreaView, TextInput, View, ImageBackground, StyleSheet, Alert, TouchableOpacity } from "react-native";
import axios from '../axios.config';

const CadastrarPets = ({ navigation }: any) => {
    const [nome, setNome] = useState<string>();

    const cadastrar = async () => {
        try {
            const cadastro = {
                name: nome,
            };
            await axios.post('/pet', cadastro);

            navigation.navigate('Home');

        } catch (error) {
            console.error(error);
        }
    }

    const pet = (value: string) => {
        setNome(value);
    }

    return (
        <ImageBackground
            source={require("../components/img/pokemon2.jpg")}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.transparentBox}>
                    <Text style={styles.text}>
                        Cadastre o seu pet
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Qual o nome do seu pet?"
                        value={nome}
                        onChangeText={pet}
                    />
                    <TouchableOpacity style={styles.button} onPress={cadastrar}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transparentBox: {
        backgroundColor: "rgba(48, 48, 48, 0.7)",
        borderRadius: 10,
        padding: 20,
        width: 300,
    },
    textInput: {
        margin: 5,
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: 'white',
        margin: 6,
        marginTop: 6,
        fontWeight: 'bold',
    },
    button: {
        margin: 5,
        width: "100%",
        height: 40,
        backgroundColor: 'darkred',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
    },
});

export default CadastrarPets;
