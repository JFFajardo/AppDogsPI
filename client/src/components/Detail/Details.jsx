import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { getById, clearDetail, deleteDog, getDogs } from "../../redux/actions";
import Loader from '../Loader/Loader'
import styles from './Detail.module.css';

const Detail = () => {

   const {id} = useParams()
   const dispatch = useDispatch()
   const details = useSelector(state => state.details)

   useEffect(() => {
      dispatch(getById(id))
      dispatch(clearDetail())
   }, [dispatch, id])

   const handleDelete = () => {
      dispatch(deleteDog(id))       
   }

   useEffect(() => {
      return () => { dispatch(getDogs())}
  }, [dispatch])

  if (Array.isArray(details)) {
      return <Loader />; 
   }

   if (!Object.keys(details).length || typeof details === 'string') {
      return <h1>Dog Not Found</h1>;
   }

   return(         
      <div className={styles.container}>
         <Link to='/home'>  
            <button className={styles.button}>HOME</button>
         </Link>
        
         <div className={styles.card_container}>
            <div className={styles.header}>
               <p>{details.name}</p>
               <img  src={details.image} alt={details.name} />
            </div>            
            <div className={styles.card}>        
                              
               <div className={styles.details}>
                  
                  <h2>Height:<p>{details.height} cms</p> </h2>
                  <h2>Weight:  <p>{details.weight} Kgs</p></h2>
                  {
                     details.life_span && details.life_span[0] !== ' '
                     ? <h2>Life Span: <p>{details.life_span}</p></h2>
                     : null
                  }
                  {/*  Dogs DB */}
                  {
                     Array.isArray(details.DogTemperaments) && details.DogTemperaments.length
                     ? <h2>Temperaments: {details.DogTemperaments.map(t => Object.values(t)).join(', ')}</h2>
                     : null
                  }
                  {/* Dogs API */}
                  {
                     typeof details.temperaments === 'string' && details.temperaments.length
                     ? <h2>Temperaments: <p> {details.temperaments.length ? details.temperaments : null}</p></h2>
                     : null
                  }
                  <div>
                     <Link to= '/home'>
                     {details.DogTemperaments && <button className={styles.button} onClick={handleDelete}> DELETE</button>}
                     </Link>
                  </div>                  
               </div>                 
            </div>        
         </div>
      </div>  
   )                
}

export default Detail;