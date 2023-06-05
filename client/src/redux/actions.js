import axios from 'axios'
import { GET_DOGS, GET_TEMPERAMENTS, GET_BY_NAME, GET_BY_ID, CLEAR_DETAIL, CREATE_DOG, FILTERS, ORDER_BY_NAME, ORDER_BY_WEIGHT, DELETE_DOG } from "./action-types";

export const getDogs = () => {
  const endpoint = 'http://localhost:3001/dogs';
  return async (dispatch) => {
    try{
      const {data} = await axios(endpoint)
      return dispatch({
        type: GET_DOGS,
        payload: data,
      });
    }
    catch(error){
      console.log('No hay Datos');
    }
  }
}

export const getTemperaments = () => {
  const endpoint = 'http://localhost:3001/temperaments';
  return async (dispatch) => {
    try{
      const {data} = await axios(endpoint)
        return dispatch({
          type: GET_TEMPERAMENTS,
          payload: data,
      });
    }
    catch(error){
      console.log('No hay Datos');
    }
  }
}

export const getByName = (name) => {
  return async (dispatch) => {
    try{
      const {data} = await axios(`http://localhost:3001/dogs?name=${name}`)
      console.log(data);  
      return dispatch({
          type: GET_BY_NAME,
          payload: data,
      });
    }
    catch(error){
      return dispatch({
        type: GET_BY_NAME,
        payload: error.response.data,
      });
    }
  }
}

export const getById = (id) => {
  return async (dispatch) => {
    try{
      const {data} = await axios(`http://localhost:3001/dogs/${id}`)
        return dispatch({
          type: GET_BY_ID,
          payload: data,
      });
    }
    catch(error){
      return dispatch({
        type: GET_BY_ID,
        payload: error.response.data,
      });
    }
  }
}

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL
  }
}

export const filterData = (payload) => {
  return{
    type: FILTERS,
    payload,
  }
}

export const orderByName= (payload) => {
  return{
    type: ORDER_BY_NAME,
    payload,
  }
}

export const orderByWeight= (payload) => {
  return{
    type: ORDER_BY_WEIGHT,
    payload,
  }
}

export const createDog = (payload) => {
  return async (dispatch) => {
    const {data} = await axios.post(`http://localhost:3001/dogs`, payload)
    return dispatch({
      type: CREATE_DOG,
      payload: data,
    });
  }
}

export const deleteDog= (id) => {
  return async (dispatch) => {
    const {data} = await axios.delete(`http://localhost:3001/dogs/${id}`)
    return dispatch({
      type: DELETE_DOG,
      payload: data,
    });
  }
}
