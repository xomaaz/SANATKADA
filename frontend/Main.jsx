import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home"
import ProductDetails from './screens/ProductDetails';
import Toast from 'react-native-toast-message';
import Cart from './screens/Cart';
import ConfirmOrder from './screens/ConfirmOrder';
import Payment from './screens/Payment';
import Profile from './screens/Profile';
import UpdateProfile from './screens/UpdateProfile';
import Orders from './screens/Orders';
import Login from './screens/Login';
import ForgetPassword from './screens/ForgetPassword';
import Verify from './screens/Verify';
import Signup from './screens/Signup';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/userActions';

const Stack = createNativeStackNavigator();

const Main = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
  <NavigationContainer>
    <Stack.Navigator 

    initialRouteName='Home'
    screenOptions={{ headerShown:false }}
    >
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="productdetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="confirmorder" component={ConfirmOrder} />
        <Stack.Screen name="payment" component={Payment} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="updateprofile" component={UpdateProfile} />
        <Stack.Screen name="orders" component={Orders} />
        {/* Password Resetting Route */}
        <Stack.Screen name="forgetpassword" component={ForgetPassword} />
        <Stack.Screen name="verify" component={Verify} />
        <Stack.Screen name="signup" component={Signup} />
      </Stack.Group>
    </Stack.Navigator>

    <Toast position='top' />

  </NavigationContainer>
  )

}

export default Main