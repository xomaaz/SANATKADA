import { View, Text, Image } from 'react-native'
import React from 'react'
import { colors } from '../styles/styles'

const CartItem = ({
  name, amount, qty, stock, index, imgSrc, id, incrementHandler, decrementHandler
}) => {
  return (
    <View style={{
      flexDirection: "row",
      height: 100,
      marginVertical: 20,
    }}>
      
      <View style={{
        width: "40%",
        backgroundColor: index%2 == 0 ? colors.color1 : colors.color3,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
      }}>
        <Image
          source={{ uri: imgSrc, }}
          style={{
            width: 200,
            height: "100%",
            resizeMode: "contain",
            top: "-20%",
            left: "10%",
          }}
        />
      </View>
      
      <View style={{
        width: "40%",
        paddingHorizontal: 25,
      }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
          }}>
            {name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
            fontWeight: "900"
          }}>
            ${amount}
        </Text>
      </View>
      
      <View>

      </View>

    </View>
  )
}

export default CartItem