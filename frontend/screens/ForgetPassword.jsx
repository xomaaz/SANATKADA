import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';

const ForgetPassword = ({ navigation }) => {

  const [email, setEmail] = useState("");

  const loading = true;

  const submitHandler = () => {
    alert("Yeah");
    // will remove this in future
    navigation.navigate("verify");
  }

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

      {/* Heading */}
      <View style={{ marginBottom: 20 }}>
        <Text style={formHeading}>Forget Password</Text>
      </View>

      <View style={styles.container}>
        <TextInput 
          {...inputOptions} 
          placeholder='Email' 
          keyboardType='email-address' 
          value={email} 
          onChangeText={setEmail} 
        />

        <Button
          loading={loading}
          style={styles.btn}
          textColor={colors.color2}
          disabled={email == ""}
          onPress={submitHandler}
        >
          Send OTP
        </Button>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.link}>Log In</Text>
        </TouchableOpacity>

      </View>
      </View>

      <Footer activeRoute='profile' />
    </>
  )
}

export default ForgetPassword;