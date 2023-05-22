import { GET_BY_ID, GET_BY_NAME, GET_DOGS, GET_TEMPERAMENTS, CLEAR_DETAIL, CREATE_DOG, FILTER_BY_CREATED, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME, ORDER_BY_WEIGHT, DELETE_DOG } from "./action-types"

const initialState = {
  dogs: [],
  allDogs: [],  //es una copia de dogs, sirve para hacer el filtro sobre esta prop y no sobre dogs para q no haya problemas como q filtramos un array ya filtrado
  temperaments: [],
  details: [],
  dogsFilters: [],
  order: "", // Variable para almacenar el tipo de ordenamiento actual
  orderedByName: "" // Variable para almacenar la última opción de ordenamiento por nombre
}

const parseWeight = (weight) => {
  // Aquí realizas la lógica para convertir el formato de peso a numérico
  // Por ejemplo, si weight es "10 - 20 kg", podrías extraer el número inicial "10"
  // y convertirlo a un número entero para realizar la comparación de ordenamiento.
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

      case FILTER_BY_CREATED:

        let filterCreation = [];

        if (payload === "all") filterCreation = state.allDogs;
        else if (payload === 'created')
          filterCreation = state.allDogs.filter((dog) => dog.DogTemperaments);
        else if (payload === 'api')
          filterCreation = state.allDogs.filter((dog) => !dog.DogTemperaments);

         // Aplicar el ordenamiento si ya se ha establecido
        if (state.order === "name") {
          filterCreation.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
        } else if (state.order === "weight") {
          filterCreation.sort((a, b) => {
            const aWeight = parseWeight(a.weight);
            const bWeight = parseWeight(b.weight);
            return aWeight - bWeight;
          });
        }  
        return {
        ...state,
        dogsFilters: filterCreation,
      };

      case FILTER_BY_TEMPERAMENT:
        const allDogs = state.allDogs;
        let perros = [];      
        
      
          if (payload === "all") {
            perros = allDogs;
          } else { allDogs.forEach((dog) => { if (dog.id.length > 10){
           dog.DogTemperaments.forEach(temp =>{ if (temp.name === payload) {
            perros.push(dog)
           }})
          }
          else {
            if (dog.temperaments?.includes(payload)) perros.push(dog)
                      
          }})  
          
            // allDogs.forEach((dog) => perros.push(dog.Dogtemperaments.name === payload))        
          }
          console.log(perros);
          

         // Aplicar el ordenamiento si ya se ha establecido
        if (state.order === "name") {
          perros.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
        } else if (state.order === "weight") {
          perros.sort((a, b) => {
            const aWeight = parseWeight(a.weight);
            const bWeight = parseWeight(b.weight);
            return aWeight - bWeight;
          });
        }

        return {
        ...state,
        dogsFilters: perros, 
      };

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
            // if (a.weight.includes('NaN')) {
            //   return 1000;
            // } else {
            //     if (parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])) return 1;
            //     if (parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])) return -1;
            //   return 0;
            // }
            const aWeight = parseWeight(a.weight);
            const bWeight = parseWeight(b.weight);
            return aWeight - bWeight;
          })
          : [...state.dogsFilters].sort((a, b) => {
            // if (a.weight.includes('NaN')) {
            //   return 1000;
            // } else {
            //     if (parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])) return 1;
            //     if (parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])) return -1;
            //   return 0;
            // }
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