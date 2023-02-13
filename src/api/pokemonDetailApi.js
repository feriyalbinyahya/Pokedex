import { View, Text } from 'react-native'
import React from 'react'
import { POKEMON_DETAIL_URL } from '../config';
import axios from 'axios';

const pokemonDetailApi = async (uri) => {
    const result = await axios.get(uri);
    return result.data;
}

export default pokemonDetailApi