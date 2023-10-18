import React from "react";
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

const Home = ({ navigation }: any) => {
    const cadastrar = () => { navigation.navigate('CadastroPet') };
    const listar = () => { navigation.navigate('ListPage') };
    const login = () => { navigation.navigate('Login') };

    return (
        <ImageBackground
            source={require("../components/img/pokemon.jpg")}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={cadastrar}
                    >
                        <Text style={styles.buttonText}>Cadastrar Pets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={listar}
                    >
                        <Text style={styles.buttonText}>Seus Pets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={login}
                    >
                        <Text style={styles.buttonText}>Sair</Text>
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
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: "darkred",
        borderColor: 'white',
        borderWidth: 3,
        padding: 20,
        margin: 10,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Home;
