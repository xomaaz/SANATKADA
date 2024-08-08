import { useEffect } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSelector } from "react-redux";
import { loadUser } from "../redux/actions/userActions";

export const useMessageAndErrorUser = (
  navigation,
  dispatch,
  navigateTo = "login"
) => {
  const { loading, message, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      navigation.reset({ // resets navigation once user logs in or logs out to prevent the back button from going to previous screens
        index: 0,
        routes: [{ name: navigateTo }],
      });
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({
        type: "clearMessage",
      });
      dispatch(loadUser());
    }
  }, [error, message, dispatch]);

  return loading;
};


export const useMessageAndErrorOther = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector(
    (state) => state.other
  );

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo); // if navigateTo != null, then statement on the right of && operator will be executed
      
      func && dispatch(func()); // if func != null, then statement on the right of && operator will be executed
    }
  }, [error, message, dispatch]);

  return loading;
};
