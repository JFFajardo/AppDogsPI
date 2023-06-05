import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterData} from '../../redux/actions';
import styles from './Filters.module.css';

const Filters = ({setMinPage, setMaxPage, setActualPage}) => {

   const temperamentState = useSelector(state => state.temperaments)

   const [filters, setFilters] = useState({origin: 'all', temperament: 'any'})
   const dispatch = useDispatch();
   
   const handleFilterCreated = (event) => {
      console.log(event.target.value);
      setActualPage(1)
      setMinPage(0)
      setMaxPage(5)
      setFilters({...filters, origin: event.target.value})
   }

   const handleFilterTemperaments = (event) => {
      setActualPage(1)
      setMinPage(0)
      setMaxPage(5)
      setFilters({...filters, temperament: event.target.value})   
   }

   useEffect (() => {
      dispatch(filterData(filters)) 
   }, [dispatch, filters])

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
                  <option value= 'any'>Select Temperament</option>
                  <option key={0} value= 'any'>ANY</option>
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