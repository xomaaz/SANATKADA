import axios from "axios";
import { server } from "../store";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ // first, dispatch a request
      type: "getAllProductRequest",
    });

    const { data } = await axios.get(`${server}/product/all`,
      {
        withCredentials: true,
      }
    );

    dispatch({ // after fetching the data, dispatch success
      type: "getAllProductSuccess",
      payload: data.products,
    });
    
  } catch (error) {
    dispatch({ // if request fails, dispatch fail
      type: "getAllProductFail",
      payload: error.response.data.message,
    });
  }
};


export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ // first, dispatch a request
      type: "getAdminProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/admin`,
      {
        withCredentials: true,
      }
    );

    dispatch({ // after fetching the data, dispatch success
      type: "getAdminProductsSuccess",
      payload: data,
    });
    
  } catch (error) {
    dispatch({ // if request fails, dispatch fail
      type: "getAdminProductsFail",
      payload: error.response.data.message,
    });
  }
};


export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ // first, dispatch a request
      type: "getProductDetailsRequest",
    });

    const { data } = await axios.get(`${server}/product/single/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ // after fetching the data, dispatch success
      type: "getProductDetailsSuccess",
      payload: data.product,
    });
    
  } catch (error) {
    dispatch({ // if request fails, dispatch fail
      type: "getProductDetailsFail",
      payload: error.response.data.message,
    });
  }
};