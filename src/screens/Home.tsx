import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text } from 'react-native';
import Header from '../components/Header';
import PokemonList from '../components/PokemonList';

const pokemons = [
  {
    name: 'pikachu',
    type: 'eletric',
  },
  {
    name: 'piplup',
    type: 'water',
  },
  {
    name: 'magikarp',
    type: 'water',
  },
];

const Home = ({ route }: any) => {
  const { params } = route;
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar />
        <Header title="Home Page" />
        <PokemonList pokemons={pokemons} />
        <Text style={{ fontSize: 32 }}>ID: {params.id}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
