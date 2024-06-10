import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { colors, defaultStyle, formHeading } from '../styles/styles'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { Headline } from 'react-native-paper'

const orders = [
  {
    _id: "asasasaaassda",
    shippingInfo: {
      address: "73 easter",
      city: "New York",
      country: "USA",
      pinCode: 2029,
    },
    createdAt: "12-2-2022",
    orderStatus: "Processing",
    PaymentMethod: "COD",
    totalAmount: 2000,
  },
  {
    _id: "pspsadad",
    shippingInfo: {
      address: "74 easter",
      city: "New York",
      country: "USA",
      pinCode: 2029,
    },
    createdAt: "12-2-2022",
    orderStatus: "Processing",
    PaymentMethod: "COD",
    totalAmount: 3220,
  }
]

const Orders = () => {

  const Loading = true;

  return (
    <View style={{
      ...defaultStyle,
      backgroundColor: colors.color5,
    }}>

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70, }}>
        <Text style={formHeading}>Orders</Text>
      </View>

      {
        Loading ? <Loader /> : (
          <View style={{
            padding: 10,
            flex: 1,
          }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {
                orders.length > 0 ? (null) : <Headline style={{ textAlign: "center" }}>No Orders Yet</Headline>
              }
            </ScrollView>
          </View>
        )
      }

    </View>
  )
}

export default Orders