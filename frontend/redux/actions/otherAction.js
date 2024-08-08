import axios from "axios";
import { server } from "../store";

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePasswordRequest",
    });

    const { data } = await axios.put(`${server}/user/changepassword`, {
      oldPassword,
      newPassword,
    },{
      headers: {
        "Content-Type" : "application/json"
      },
      withCredentials: true, // without this line we won't be able to send cookies to the backend and we'll get a not logged-in error
    })

    dispatch({
      type: "updatePasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updatePasswordFail",
      payload: error.response.data.message,
    });
  }
};


export const updateProfile = (name, email, address, city, country, pinCode) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.put(`${server}/user/updateprofile`, {
      name,
      email,
      address,
      city,
      country,
      pinCode
    },{
      headers: {
        "Content-Type" : "application/json"
      },
      withCredentials: true, // without this line we won't be able to send cookies to the backend and we'll get a not logged-in error
    })

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};
