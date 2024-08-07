import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors, defaultStyle, formHeading } from '../styles/styles'
import { Avatar, Button } from 'react-native-paper'
import ButtonBox from '../components/ButtonBox';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { logout } from '../redux/actions/userActions';
import { useMessageAndErrorUser } from '../utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { defaultImg } from '../styles/styles';

const Profile = ({ navigation }) => {
  const { user } = useSelector(state => state.user);

  const [avatar, setAvatar] = useState(
    user?.avatar ? user.avatar.url : defaultImg
  );
  
  const dispatch = useDispatch();

  const loading = useMessageAndErrorUser(navigation, dispatch, "login");

  const logoutHandler = () => {
    dispatch(logout());
  };

  const navigateHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("adminpanel");
        break;
      case "Orders":
        navigation.navigate("orders");
        break;
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Log Out":
        logoutHandler();
        break;
      default:
        case "Orders":
          navigation.navigate("orders");
        break;
    }
  }

  return (
    <>
      <View style={defaultStyle}>
        {/* Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Profile</Text>
        </View>

        {/* Loading*/}
        
        {
          loading ? <Loader /> : (
            <>
              <View style={styles.container}>
                <Avatar.Image 
                  source={{
                    uri: avatar
                    }} 
                  size={100} 
                  style={{ backgroundColor: colors.color1 }}
                />

                <TouchableOpacity 
                  onPress={() => navigation.navigate("camera", { updateProfile: true })}
                >
                  <Button textColor={colors.color1}>Change Photo</Button>
                </TouchableOpacity>

                <Text style={styles.name}>
                  {user?.name}
                </Text>

                <Text style={{
                  fontWeight: "300",
                  color: colors.color2,
                }}>
                  {user?.email}
                </Text>
              </View>

              <View>
                <View style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: 'space-between',
                }}
              >
                <ButtonBox handler={navigateHandler} text={"Orders"} icon={"format-list-bulleted-square"} />
                
                {
                  user?.role == "admin" && ( 
                    <ButtonBox handler={navigateHandler} text={"Admin"} icon={"view-dashboard"} reverse={true} />
                  )
                }
                
                <ButtonBox handler={navigateHandler} text={"Profile"} icon={"pencil"} />
                </View>

                <View style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: 'space-evenly',
                }}
              >
                <ButtonBox handler={navigateHandler} text={"Password"} icon={"pencil"} />
                <ButtonBox handler={navigateHandler} text={"Log Out"} icon={"exit-to-app"} reverse={true} />
                </View>

              </View>
            </>
          )
        }

      </View>
      <Footer />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10, 
    color: colors.color2,
  },
});

export default Profile