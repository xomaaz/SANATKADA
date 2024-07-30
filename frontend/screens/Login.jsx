import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useMessageAndErrorUser } from '../utils/hooks';
import Toast from 'react-native-toast-message';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  //const loading = useMessageAndErrorUser(navigation, dispatch, "profile");
  const { loading, message, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  console.log(isAuthenticated)

  useEffect(() => {
    if(error){
      Toast.show({
        type: "error",
        text1: error
      });
      dispatch({
        type: "clearError"
      });
    }

    if(message){
      Toast.show({
        type: "success",
        text1: message
      });
      dispatch({
        type: "clearMessage"
      });
    }
  }, [error, message, dispatch]);

  const submitHandler = () => {
    dispatch(login(email, password))
  };

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

export default Login;