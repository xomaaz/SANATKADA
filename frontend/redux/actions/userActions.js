import axios from "axios";
import { server } from "../store";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ // first, dispatch a login request
      type: "loginRequest",
    });

    // Axios here; then fetch the data
    const { data } = await axios.post(`${server}/user/login`, {
      email,
      password,
      },{
        headers: {
          "Content-Type" : "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ // finally, after fetching the data, dispatch success
      type: "loginSuccess",
      payload: data.message,
    });
    
  } catch (error) {
    dispatch({ // if login fails
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ // first, dispatch a load user request
      type: "loadUserRequest",
    });

    const { data } = await axios.get(`${server}/user/me`,
      {
        withCredentials: true,
      }
    );

    dispatch({ // after fetching the data, dispatch success
      type: "loadUserSuccess",
      payload: data.user,
    });
    
  } catch (error) {
    dispatch({ // if loading user fails
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

