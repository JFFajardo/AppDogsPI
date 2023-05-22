import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterByCreated, filterByTemperament, getDogs} from '../../redux/actions';
import styles from './Filters.module.css';

const Filters = ({setMinPage, setMaxPage, setActualPage}) => {
   const temperamentState = useSelector(state => state.temperaments)

   const dispatch = useDispatch();
   
   const handleFilterCreated = (event) => {
      console.log(event.target.value);
      setActualPage(1)
      setMinPage(0)
      setMaxPage(5)
      dispatch(filterByCreated(event.target.value))
      // dispatch(getDogs())
   }

   const handleFilterTemperaments = (event) => {
      setActualPage(1)
      setMinPage(0)
      setMaxPage(5)
      dispatch(filterByTemperament(event.target.value)) 
   }

   return (
      <div>         
         <div className={styles.box}>
            <h4>Filter by</h4>
            <div className={styles.box} > 
               <select  
               defaultValue='DEFAULT'
               onChange={(event) => handleFilterCreated(event)}>
                  <option value= 'DEFAULT'>Select Dogs</option> 
                  <option value='all'>ALL DOGS</option>                 
                  <option value= 'api'>API DOGS</option>
                  <option value= 'created'>CREATED DOGS</option>
               </select>
            
               <select 
               defaultValue='DEFAULT'
               onChange={(event) => handleFilterTemperaments(event)}>
                  <option value= 'DEFAULT'>Select Temperament</option>
                  <option key={0} value= 'all'>All</option>
                  {temperamentState.length
                     ? temperamentState.map((temp) => (
                        <option key={temp.id} value={temp.name}>
                           {temp.name}
                        </option>
                     )) : null
                  }                  
               </select>            
            </div>
         </div>
      </div>
   )
}

export default Filters;