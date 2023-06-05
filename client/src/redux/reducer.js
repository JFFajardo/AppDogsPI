import {  GET_BY_ID, GET_BY_NAME, GET_DOGS, GET_TEMPERAMENTS, CLEAR_DETAIL, CREATE_DOG, FILTERS, ORDER_BY_NAME, ORDER_BY_WEIGHT, DELETE_DOG } from "./action-types"

const initialState = {
  dogs: [],
  allDogs: [],  //es una copia de dogs, sirve para hacer el filtro sobre esta prop y no filtramos un array ya filtrado
  temperaments: [],
  details: [],
  dogsFilters: [], 
  order: "", // Variable para almacenar el tipo de ordenamiento actual
  orderedByName: "" // Variable para almacenar la última opción de ordenamiento por nombre
}

  
const filterDogsByOrigin = (origin, dogs) => {
  switch (origin){
    case 'api':
      return dogs.filter((dog) => !dog.DogTemperaments);

      case 'created':
        return dogs.filter((dog) => dog.DogTemperaments);

      default:
        return dogs
  }
}

  const filterDogsByTemperament = (temperament, dogs) => {
      if (temperament === 'any') return dogs
      return dogs.filter((dog) =>{        
        if (dog.id.length > 10){
          return dog.DogTemperaments.some(temp =>   temp.name === temperament) 
      } else {
         return dog.temperaments?.includes(temperament)
      }
    })
  }

const parseWeight = (weight) => {
  const weightNumber = parseInt(weight.split(" - ")[0]);
    return weightNumber;
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: payload,
          allDogs: payload,
          dogsFilters: payload
      };
  
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: payload,
      };

      case GET_BY_NAME:
      return {
        ...state,
        allDogs: payload,
        dogsFilters: payload
      };

      case GET_BY_ID:
        return {
          ...state,
          details: payload,
      };

      case CLEAR_DETAIL:
      return {
        ...state,
        details: []
      };

      case FILTERS:
        let filterDogs = state.allDogs
        console.log(payload);
        filterDogs = filterDogsByOrigin(payload.origin, filterDogs)

        filterDogs = filterDogsByTemperament(payload.temperament, filterDogs)

        return {
        ...state,
        dogsFilters: filterDogs
       }

      case ORDER_BY_NAME:  
        if (state.allDogs === 'Dog not found!') 
        return { ...state }

        const orderedByName =      
        payload === 'A'
        ? [...state.dogsFilters].sort((a,b) => { 
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
        : [...state.dogsFilters].sort((a,b) => { 
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        })
        return{
          ...state,
          dogsFilters: orderedByName,
          order: 'name',
          orderedByName: payload,
        };     

      case ORDER_BY_WEIGHT:
        if (state.allDogs === 'Dog not found!') 
        return { ...state }

        const orderedByWeight =
        payload === "min"
          ? [...state.dogsFilters].sort((a, b) => {

            const aWeight = parseWeight(a.weight);
            const bWeight = parseWeight(b.weight);
            return aWeight - bWeight;
          })
          : [...state.dogsFilters].sort((a, b) => {

            const aWeight = parseWeight(a.weight);
            const bWeight = parseWeight(b.weight);
            return bWeight - aWeight;
          });
        return {
          ...state,
          dogsFilters: orderedByWeight,
      };

      case CREATE_DOG:
        return {
          ...state,
          allDogs: [...state.allDogs, payload]
      };

      case DELETE_DOG:
        return {
          ...state,
      };

      default:
        return { 
          ...state
      };
    }
}

export default reducer;
