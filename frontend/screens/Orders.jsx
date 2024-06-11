import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { colors, defaultStyle, formHeading } from '../styles/styles'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { Headline } from 'react-native-paper'
import OrderItem from '../components/OrderItem'

const orders = [
  {
    _id: "asasasaaassda",
    shippingInfo: {
      address: "73 easter",
      city: "New York",
      country: "USA",
      pinCode: 2029,
    },
    createdAt: "12-2-2022T1243",
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
    createdAt: "12-2-2022T1243",
    orderStatus: "Processing",
    PaymentMethod: "COD",
    totalAmount: 3220,
  }
]

const Orders = () => {

  const Loading = false;

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
                orders.length > 0 ? (orders.map((item, index) => (
                  <OrderItem 
                    key={item._id} 
                    id={item._id} 
                    i={index}
                    price={item.totalAmount}
                    status={item.orderStatus}
                    paymentMethod={item.paymentMethod}
                    orderedOn={item.createdAt.split("T")[0]}
                    address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${
                      item.shippingInfo.pinCode}`}
                  />
                ))) : (
                  <Headline style={{ textAlign: "center" }}>No Orders Yet</Headline>)
              }
            </ScrollView>
          </View>
        )
      }

    </View>
  )
}

export default Orders