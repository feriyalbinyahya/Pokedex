import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import generalStyles from '../styles/generalStyles';
import { backgroundColors, colors, customColor, textColor } from '../assets/colors';
import TypesPokemon from '../components/TypesPokemon';
import IconButton from '../components/IconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'
import AbilityPokemon from '../components/AbilityPokemon';
import { ProgressBar } from 'react-native-paper';
import { height } from '../assets/constants';
import pokemonDetailApi from '../api/pokemonDetailApi';

const PokemonDetail = ({navigation, route}) => {
    const [pokeData, setPokeData] = useState([]);
    const [backColor, setBackColor] = useState('');
    const  [isLoading, setIsLoading] = useState(false);
    const image = {uri: ''};
    let total = 0;
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
        const result = await pokemonDetailApi(route.params.uri);
        setPokeData(result);
        setBackColor(result.types[0].type.name);
        setIsLoading(false);
    }
    
    useEffect(() => {
        pokeFun();
    }, []);
  return (
    <>
        {pokeData?.sprites ? 
        <>
        <View style={{flex:1, flexDirection:'row', backgroundColor: backgColor[backColor]}}>
            <Image style={{width: 180, height: 180}} source={ (pokeData.sprites) ? 
            { uri: pokeData.sprites.front_default } : require('../assets/Images/pokeball.png')} />
            <View style={{flex:1}}>
                <Text style={{color: 'white', ...generalStyles.fontBold, paddingTop:15}}>{`#${pokeData.id}`}</Text>
                <Text style={styles.title}>
                    {pokeData.name.toUpperCase()}
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {pokeData?.types?.map((item) => {
                        return <TypesPokemon key={item.slot} text={item.type.name} /> 
                    })}
                </View>
            </View>
        </View>

        
        <View style={styles.bottomSection}>
            <Swiper>
                <View style={styles.pokeInfo}>
                    <View style={{height:10}}></View>
                    <View style={styles.generalInfo}>
                        <View style={{flexDirection: 'row', marginHorizontal: 10, marginTop: 1}}>
                            <Text style={generalStyles.buttonBlack}>Base exp.</Text>
                            <Text style={{...generalStyles.text, marginLeft:6}}>{pokeData.base_experience}</Text>
                        </View>
                        <View style={{flexDirection: 'row',  marginHorizontal: 10}}>
                            <Ionicons name='barbell' size={20} color='black'/>
                            <Text style={{...generalStyles.text, marginLeft:5, marginTop: 1}}>{parseFloat(pokeData.weight/10)} kg</Text>
                        </View>
                        <View style={{flexDirection: 'row',  marginHorizontal: 10}}>
                            <Ionicons name='arrow-up' size={20} color='black'/>
                            <Text style={{...generalStyles.text, marginLeft:5, marginTop: 1}}>{parseFloat(pokeData.height/10)} m</Text>
                        </View>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={styles.boxAbilities}>
                        <Text style={{...generalStyles.fontBold, fontSize: 16, color: textColor.grey}}>Abilities</Text>
                        <View style={{flexDirection: 'row'}}>
                            {pokeData.abilities.map((item) => {
                            return <AbilityPokemon key={item.ability.slot} text={item.ability.name} color='#FD8A8A'/>
                            })}
                        </View>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={styles.boxStats}>
                        <Text style={{...generalStyles.fontBold, fontSize: 16, color: textColor.grey}}>Base stats</Text>
                        <View style={{height:5}}></View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text style={styles.textStat}>HP</Text>
                                <Text style={styles.textStat}>Attack</Text>
                                <Text style={styles.textStat}>Defense</Text>
                                <Text style={styles.textStat}>Sp. Attack</Text>
                                <Text style={styles.textStat}>Sp. Defense</Text>
                                <Text style={styles.textStat}>Speed</Text>
                                <View style={{height:5}}></View>
                                <Text style={{...styles.textStat, ...generalStyles.fontBold, color: backgColor[backColor]}}>Total</Text>
                            </View>
                            <View style={{flex:3}}>
                                {pokeData.stats.map((item) => {
                                    total = total + parseInt(item.base_stat);
                                    return (
                                    <View key={item.stat.name} style={{flexDirection:'row'}}>
                                        <Text style={{...styles.textStat, color:textColor.grey}}>{item.base_stat}</Text>
                                        <View style={{width:25}}></View>
                                        <ProgressBar style={styles.progressbar} progress={parseFloat(item.base_stat)/100} color={backgColor[backColor]} />
                                    </View>)
                                })}
                                <View style={{height:5}}></View>
                                <Text style={{...styles.textStat, color:backgColor[backColor], ...generalStyles.fontBold}}>{total}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.boxMoves}>
                    <Text style={{...generalStyles.fontBold, fontSize: 16, color: textColor.grey}}>Moves</Text>
                    <ScrollView>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            {pokeData.moves.map((item) => {
                            return <AbilityPokemon key={item.move.name} text={item.move.name} color='#FD8A8A'/>
                            })}
                        </View>
                    </ScrollView>
                </View>
            </Swiper>


            <View style={styles.footerComponent}>
                <View style={{flex: 1}}></View>
                <View style={{...styles.box, backgroundColor: backgColor[backColor]}}>
                </View>
                <View style={{flex: 1}}></View>
            </View>
        </View>
        </> : <View style={{alignItems: 'center'}}>
                <ActivityIndicator size='large' style={{marginTop: 100}} color={textColor.grey} />
                <View style={{height:20}}></View>
                <Text style={{...generalStyles.fontRegular, fontSize: 16}}>Loading...</Text>
            </View>}
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
    },
    boxAbilities: {
        borderColor: '#B2B2B2',
        borderRadius: 5,
        borderWidth:1,
        marginHorizontal: 20,
        padding: 10
    },
    boxMoves: {
        borderColor: '#B2B2B2',
        borderRadius: 5,
        borderWidth:1,
        marginHorizontal: 25,
        marginTop: 20,
        padding: 10,
        height: height/1.85
    },
    boxStats:{
        padding: 15,
        marginHorizontal: 10,
    },
    footerComponent: {
        flexDirection: 'row',
    },
    pokeInfo: {
        flex: 3
    },
    box:{
        width: 200,
        height:100,
        marginBottom: -50,
        borderRadius: 20
    },
    generalInfo:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
        marginHorizontal: 15
    },
    textStat:{
        color: customColor.pink,
        ...generalStyles.fontRegular,
        fontSize: 12
    },
    progressbar:{
        width: 200, 
        height: 8,
        marginTop: 5,
    },
})