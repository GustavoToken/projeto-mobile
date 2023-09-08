import React from "react";
import RandomActivity from "./src/screens/RandomActivity";
import ListPage from "./src/screens/ListPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Form from "./src/screens/Form";
import Home from "./src/screens/Home";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Form" component={Form} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;