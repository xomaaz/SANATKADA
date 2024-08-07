import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
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
import { loadUser } from './redux/actions/userActions';

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();

  //const { user } = useSelector(state => state.user)
  //console.log(user) // use this to console log user details

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
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="updateprofile" component={UpdateProfile} />
          <Stack.Screen name="orders" component={Orders} />
          <Stack.Screen name="login" component={Login} />
        </Stack.Group>
      </Stack.Navigator>

      <Toast position='top' />

    </NavigationContainer>
  )

}

export default Main