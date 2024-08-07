import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import mime from "mime";
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/userActions';
import { useMessageAndErrorUser } from '../utils/hooks';
import Header from '../components/Header';

const UpdateProfile = ({ navigation, route }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [avatar, setAvatar] = useState("");
  
  const dispatch = useDispatch();

  const disableBtn = !name || !email || !address || !city || !country || !pinCode;

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("name", name)
    myForm.append("email", email)
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
    console.log("Form Data: ", myForm);
    dispatch(register(myForm));
  };

  const loading = useMessageAndErrorUser(navigation, dispatch, "profile");

  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 80 }}>
        <Text style={formHeading}>Edit Profile</Text>
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
        <View>
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
            Update
          </Button>
        </View>
      </ScrollView>
      
    </View>
  )
}

export default UpdateProfile;
