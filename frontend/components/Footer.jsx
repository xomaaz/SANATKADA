import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../styles/styles';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Footer = ({ activeRoute = "Home" }) => {
    const navigate = useNavigation();

    // using useSelector we can access any of the states
    const { loading, isAuthenticated } = useSelector((state) => state.user); // loading represents whether the database is connected or not

    const navigationHandler = (key) => {
        switch (key) {

            case 0:
                navigate.navigate("Home")
                break;

            case 1:
                navigate.navigate("cart")
                break;

            case 2:
                if (isAuthenticated) navigate.navigate("profile")
                else navigate.navigate("login")
                break;
        
            default:
                navigate.navigate("Home")
                break;
        }
    }

    const avatarOptions = {
        color: colors.color2,
        size: 50,
        style: { backgroundColor: colors.color1 } 
    }
 
  return (
    <View style={{
        backgroundColor: colors.color1,
        borderTopRightRadius: 120,
        borderTopLeftRadius: 120
    }}>

        <View style={{
            flexDirection: "row",
            justifyContent: "space-evenly"
        }}>
            <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={()=> navigationHandler(1) }
            >
                <Avatar.Icon
                { ...avatarOptions }
                icon={ activeRoute === "cart" ? "shopping" : "shopping-outline" } 
                />
            </TouchableOpacity>

            <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={()=> navigationHandler(2) }
            >
                <Avatar.Icon
                { ...avatarOptions }
                icon={ 
                    isAuthenticated === false
                    ? activeRoute === "profile" 
                        ? "login" 
                        : "login"
                    : activeRoute === "profile" 
                        ? "account" 
                        : "account-outline" 
                }
                />
            </TouchableOpacity>

        </View>

        <View style={{
            position: "absolute",
            width: 80,
            height: 80,
            backgroundColor: colors.color2,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            top: -50,
            alignSelf: "center"
        }}>
            <View style={{
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center"
            }}>

            <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={()=> navigationHandler(0) }
            >
                <Avatar.Icon
                { ...avatarOptions }
                icon={ activeRoute === "Home" ? "home" : "home-outline" }
                />
            </TouchableOpacity>

            </View>
        </View>

    </View>
  )
}

export default Footer