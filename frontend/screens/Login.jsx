import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = true;

  const submitHandler = () => {
    alert("Yeah");
    // will remove this in future
  }

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

      {/* Heading */}
      <View style={{ marginBottom: 20 }}>
        <Text style={formHeading}>Login</Text>
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

export default Login