import { server } from "../store";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ // first dispatch a login request
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