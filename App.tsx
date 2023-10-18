import React from "react";
import RandomActivity from "./src/screens/RandomActivity";
import ListPage from "./src/screens/ListPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Cadastro from "./src/screens/Cadastro"
import Home from "./src/screens/Home"
import CadastroPet from "./src/screens/CadastroPet";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CadastroPet" component={CadastroPet} />
                <Stack.Screen name="ListPage" component={ListPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;