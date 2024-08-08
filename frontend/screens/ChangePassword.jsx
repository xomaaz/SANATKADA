import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { colors, defaultStyle, formHeading, inputOptions, formStyles as styles } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useMessageAndErrorUser } from '../utils/hooks';
import Header from '../components/Header';
import { updatePassword } from '../redux/actions/otherAction';
import { useMessageAndErrorOther } from '../utils/hooks';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorOther(dispatch);

  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 80 }}>
        <Text style={formHeading}>Change Password</Text>
      </View>

      <View style={styles.container}>
        <TextInput 
          {...inputOptions} 
          placeholder='Old Password' 
          secureTextEntry={true}
          value={oldPassword} 
          onChangeText={setOldPassword} 
        />

        <TextInput 
          {...inputOptions} 
          placeholder='New Password' 
          secureTextEntry={true}
          value={newPassword} 
          onChangeText={setNewPassword} 
        />

        <Button
          loading={loading}
          style={styles.btn}
          textColor={colors.color2}
          disabled={oldPassword == "" || newPassword == ""}
          onPress={submitHandler}
        >
          Change Password
        </Button>

      </View>
    </View>
  )
}

export default ChangePassword;
