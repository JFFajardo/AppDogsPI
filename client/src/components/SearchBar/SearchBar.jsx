import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { getByName, getDogs } from '../../redux/actions';
import styles from './SearchBar.module.css'


const SearchBar = ({setMinPage, setMaxPage, setActualPage}) => {

   const dispatch = useDispatch();
   
   let [name, setName]= useState('')
   

   const handleChange = (event) => {
      setName(event.target.value)    
      if (event.target.value === ''){
         dispatch(getDogs())
      }   
   }
   
   const handleSearch = (event) => {
      event.preventDefault();
      if(!name){
         alert('Enter a Valid Name!!')
      } else {
         dispatch(getByName(name.trim()))
         setActualPage(1)
         setMinPage(0)
         setMaxPage(5)
         setName('')
      }
   }
   const handleRefresh = () => {
      dispatch(getDogs())
    }

   return (
      <div className= {styles.divSearch}>
         <input 
         className= {styles.input} 
         type='text' 
         placeholder='Insert Dog Name'         
         onChange= {(event) => handleChange(event)}></input>
         <button 
         className= {styles.button} 
         type='submit'
         onClick={ (event) => handleSearch(event)} >Search</button>
         <button className={styles.button} 
         onClick={handleRefresh}>Refresh</button>
      </div>
   );
}

export default SearchBar;