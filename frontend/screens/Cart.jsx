import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyle } from '../styles/styles'
import Header from '../components/Header'
import Heading from '../components/Heading'
import { Button } from 'react-native-paper'
import { colors } from '../styles/styles'

const cartItems = [
  {
  name: "Yeezy",
  image: "",
  productID: "adad1a321",
  stock: 3,
  price: 250,
  quantity: 2,
  }, {

  }
]

const Cart = () => {
  return (
    <View style={{
      ...defaultStyle,
      padding: 0,
    }}>

      {/* Header */}
      <Header back={true} emptyCart={true} />
      
      {/* Heading */}
      <Heading 
        text1='Shopping'
        text2='Cart'
        containerStyle={{paddingTop: 70, marginLeft: 35 }}
      />

      <View style={{
        paddingVertical: 20, 
        flex: 1,
      }}>
      
      </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}>
          <Text>Cart</Text>
          <Text>$5</Text>
        </View>

      <TouchableOpacity>
            <Button style={{
              backgroundColor: colors.color3,
              borderRadius: 100,
              padding: 5,
              margin: 30,
              }}
              icon={"cart"}
              textColor={colors.color2}
            >
              Checkout
            </Button>
      </TouchableOpacity>
      
    </View>
  )
}

export default Cart