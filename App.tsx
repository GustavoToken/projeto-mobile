import React from "react";
import RandomActivity from "./src/screens/RandomActivity";
import ListPage from "./src/screens/ListPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;