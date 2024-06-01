import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { defaultStyle } from '../styles/styles'
import Header from '../components/Header'
import Heading from '../components/Heading'
import { Button } from 'react-native-paper'
import { colors } from '../styles/styles'
import CartItem from '../components/CartItem'

const cartItems = [
  {
    name: "Yeezy",
    image: "https://image.goat.com/attachments/product_template_pictures/images/078/084/523/original/64795_00.png.png",
    productID: "adad1a321",
    stock: 3,
    price: 250,
    quantity: 2,
  }, {
    name: "Yeezy V2",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/72/Adidas_Yeezy_Boost_350_Pirate_Black.gif",
    productID: "adad1a322",
    stock: 2,
    price: 450,
    quantity: 5,
  }
]

const Cart = () => {

  const incrementHandler = () => {}
  const decrementHandler = () => {}


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
        <ScrollView>
          {
            cartItems.map((i,index) => (
              <CartItem 
                key={i.productID}
                id={i.productID}
                name={i.name}
                stock={i.stock}
                amount={i.price}
                imgSrc={i.image}
                index={index}
                qty={i.quantity}
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
              />
            ))
          }
        </ScrollView>
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