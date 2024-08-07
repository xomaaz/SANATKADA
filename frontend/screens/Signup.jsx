import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { colors, defaultImg, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Avatar, Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import mime from "mime";
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/userActions';
import { useMessageAndErrorUser } from '../utils/hooks';

const Signup = ({ navigation }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [avatar, setAvatar] = useState("");
  
  const dispatch = useDispatch();

  const loading = useMessageAndErrorUser(navigation, dispatch, "profile");

  const disableBtn = !name || !email || !password || !address || !city || !country || !pinCode;

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("name", name)
    myForm.append("email", email)
    myForm.append("password", password)
    myForm.append("address", address)
    myForm.append("city", city)
    myForm.append("country", country)
    myForm.append("pinCode", pinCode)

    if (avatar !== "") { // if avatar exists
      myForm.append("file", {
        uri: avatar,
        type: mime.getType(avatar),
        name: avatar.split("/").pop()
      })
    }

    dispatch(register(myForm));
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>

        {/* Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Sign Up</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
        >
          <View style={{ minHeight: 900 }}>
            <Avatar.Image 
              style={{ alignSelf: "center", backgroundColor: colors.color1, }}
              size={80}
              source={{
                uri: avatar ? avatar : defaultImg,
              }}
            />

            <TouchableOpacity onPress={() => navigation.navigate("camera")}>
              <Button textColor={colors.color1}>Change Photo</Button>
            </TouchableOpacity>

            <TextInput 
              {...inputOptions} 
              placeholder='Name' 
              value={name} 
              onChangeText={setName} 
            />

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

            <TextInput 
              {...inputOptions} 
              placeholder='Address'
              value={address} 
              onChangeText={setAddress} 
            />

            <TextInput 
              {...inputOptions} 
              placeholder='City'
              value={city} 
              onChangeText={setCity} 
            />

            <TextInput 
              {...inputOptions} 
              placeholder='Country'
              value={country} 
              onChangeText={setCountry} 
            />

            <TextInput 
              {...inputOptions} 
              placeholder='Pin Code'
              value={pinCode} 
              onChangeText={setPinCode} 
            />

            <Button
              loading={loading}
              style={styles.btn}
              textColor={colors.color2}
              disabled={disableBtn}
              onPress={submitHandler}
            >
              Sign Up
            </Button>

            <Text style={styles.or}>OR</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={styles.link}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
      </View>

      <Footer activeRoute='profile' />
    </>
  )
}

export default Signup;