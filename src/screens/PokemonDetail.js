import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import generalStyles from '../styles/generalStyles';
import { backgroundColors, colors } from '../assets/colors';

const PokemonDetail = ({navigation, route}) => {
    const [pokeData, setPokeData] = useState([]);
    const [backColor, setBackColor] = useState('');
    const  [isLoading, setIsLoading] = useState(false);
    const image = {uri: ''};
    const backgColor = {
        "bug": backgroundColors.bug,
        "dark": backgroundColors.dark,
        "dragon": backgroundColors.dragon,
        "electric": backgroundColors.electric,
        "fairy": backgroundColors.fairy,
        "fighting": backgroundColors.fighting,
        "fire": backgroundColors.fire,
        "flying": backgroundColors.flying,
        "ghost": backgroundColors.ghost,
        "grass": backgroundColors.grass,
        "ground": backgroundColors.ground,
        "ice": backgroundColors.ice,
        "normal": backgroundColors.normal,
        "poison": backgroundColors.poison,
        "psychic": backgroundColors.psychic,
        "rock": backgroundColors.rock,
        "steel": backgroundColors.steel,
        "water": backgroundColors.water,
    };

    const pokeFun = async() => {
        setIsLoading(true);
        await getPokemonDetail();
        setIsLoading(false);
    }
    const getPokemonDetail = async () => {
        const uri = route.params.uri;
        const result = await axios.get(uri);
        setPokeData(result.data);
        setBackColor(result.data.types[0].type.name);
    }
    
    useEffect(() => {
        pokeFun();
    }, []);
  return (
    <>
        <View style={{flex:1, flexDirection:'row', backgroundColor: backgColor[backColor]}}>
            <Image style={{width: 200, height: 200}} source={ (pokeData?.sprites) ? 
            { uri: pokeData?.sprites?.front_default } : require('../assets/Images/pokeball.png')} />
            <View>
                <Text style={{color: 'white', ...generalStyles.fontBold, paddingTop:15}}>{`#${pokeData?.id}`}</Text>
                <Text style={styles.title}>
                    {pokeData?.name?.toUpperCase()}
                </Text>
            </View>
        </View>
        <View style={styles.bottomSection}> 
            <Text style={generalStyles.subHeading}>Abilities</Text>
            {pokeData?.abilities?.map((item) => {
                return <Text key={item.slot}>{item.ability.name}</Text>
            })}
        </View>
    </>
  )
}

export default PokemonDetail

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
      },
    title: {
        flex: 1,
        color: 'white', 
        ...generalStyles.fontBold, 
        fontSize: 25,
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    bottomSection: {
        flex:3,
        borderRadius:15,
        marginTop: -20,
        backgroundColor: 'white'
    }
})