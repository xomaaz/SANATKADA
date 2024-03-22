import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import { Avatar, Button } from 'react-native-paper';

const Home = () => {
  return (
    <View style = {defaultStyle}>
        <Header/>

        <View style={{
            paddingTop: 55,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>

            <View>
                <Text style = {{ fontSize:25, fontWeight:"300" }}>Our</Text>    
                <Text style = {{ fontSize:25, fontWeight:"500" }}>Products</Text>
            </View> 

            <View>
                <TouchableOpacity>
                    <Avatar.Icon 
                    icon={"magnify"}
                    size={50} 
                    color={"gray"} 
                    style={{ backgroundColor:colors.color2, elevation: 12}} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={{flexDirection: "row", height:80}}>
            <Button style={{backgroundColor: colors.color5, borderRadius: 100, margin: 5}}>
                <Text style={{fontSize: 12, color: "gray"}}>Categories</Text>
            </Button>
        </View>

    </View>
  )
}

export default Home