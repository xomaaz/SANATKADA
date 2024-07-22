import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
  }

  const loading = true;

  const submitHandler = () => {
    alert("Yeah");
  }

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

      {/* Heading */}
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.heading}>Login</Text>
      </View>

      <View style={styles.container}>
        <TextInput 
          {...inputOptions} 
          placeholder='Email' 
          keyboardType='email-address' 
          value={email} 
          onChangeText={setEmail} 
        />

        <TextInput 
          {...inputOptions} 
          placeholder='Password' 
          secureTextEntry={true}
          value={password} 
          onChangeText={setPassword} 
        />

        <TouchableOpacity
          style={styles.forgetText}
          activeOpacity={0.8}
          onPress={()=>navigation.navigate("forgetpassword")}
        >
          <Text>Forget Password?</Text>
        </TouchableOpacity>

        <Button
          loading={loading}
          style={styles.btn}
          textColor={colors.color2}
          disabled={email == "" || password == ""}
          onPress={submitHandler}
        >
          Log In
        </Button>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("signup")}
        >
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>

      </View>
      </View>

      <Footer activeRoute='profile' />
    </>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 10,
  },
  forgetText: {
    color: colors.color2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
    fontWeight: "100",
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 6,
  },
  or: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color2,
  },
  link: {
    alignSelf: "center",
    color: colors.color2,
    fontSize: 18,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default Login