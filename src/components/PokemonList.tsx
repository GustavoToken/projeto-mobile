import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Pokemon = {
  name: string;
  type: string;
};

type PokemonListProps = {
  pokemons: Pokemon[];
};

const styles = StyleSheet.create({
  pokemonItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
});

const PokemonList = ({pokemons}: PokemonListProps) => {
  return (
    <View>
      {pokemons.map(pokemon => (
        <View style={styles.pokemonItem}>
          <Text>{pokemon.name}</Text>
          <Text>{pokemon.type}</Text>
        </View>
      ))}
    </View>
  );
};

export default PokemonList;
