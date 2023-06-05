import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions";
import Nav from '../Nav/Nav';
import SearchBar from '../SearchBar/SearchBar';
import Filters from '../Filters/Filters';
import Order from '../Order/Order';
import Paginate from '../Paginate/Paginate';
import Card from "../Card/Card";
import Loader from '../Loader/Loader';

import styles from './Home.module.css'
import gato from '../../assets/img/billy.jpg'


const Home = () => {

  const dispatch = useDispatch();
  
  const dogsFilters = useSelector(state => state.dogsFilters)

  
  useEffect(() => {
    console.log(dogsFilters);
  }, [dogsFilters])

  const [order, setOrder] = useState("");

  //Paginado
  const [actualPage, setActualPage] = useState(1); //Inicio desde la page 1
  const [dogsPerPage] = useState(8); // dogs por page  
  const indexOfLastDog = actualPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const actualDogs = dogsFilters.slice(indexOfFirstDog, indexOfLastDog); //recorta el arreglo con todos los dogs
  const [minPage, setMinPage] = useState(0)
  const [maxPage, setMaxPage] = useState(5)

  const pages = (pageNum) => {
    setActualPage(pageNum);

    if(pageNum >= maxPage) {
      setMinPage(minPage+4)
      setMaxPage(maxPage+4)
    } else if(pageNum <= minPage+1 && pageNum !== 1) {
      setMinPage(minPage-4)
      setMaxPage(maxPage-4)
    }
  };


  useEffect(() => {
    console.log(actualDogs);
  }, [actualDogs])

  useEffect(() => {
    dispatch(getDogs())
  }, [])

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch])



  return (
    <div className={styles.container} >      
      <Nav/>
      <div className={styles.div_filters}>
      <SearchBar 
      setMinPage={setMinPage} 
      setMaxPage={setMaxPage} 
      setActualPage={setActualPage}/>
      <Filters 
      setMinPage={setMinPage}
      setMaxPage={setMaxPage}
      setActualPage={setActualPage}
      />        
      <Order 
      setMinPage={setMinPage}
      setMaxPage={setMaxPage}
      setActualPage={setActualPage}
      setOrder={setOrder} />
      </div>                
      <div className={styles.div_pages}>
          <Paginate          
            actualPage={actualPage}
            minPage={minPage}
            maxPage={maxPage}
            dogsPerPage={dogsPerPage}
            dogs={Array.isArray(dogsFilters) ? dogsFilters.length : 1}
            pages={pages}
          />
        </div>      
      <div className={styles.div_card}>
      {actualDogs.length && Array.isArray(actualDogs) ? (
            actualDogs.map((dog) =>  {
            return(
              <Card
                id={dog.id}
                key={dog.id}
                name={dog.name}
                image={dog.image}
                temperaments={dog.DogTemperaments ? dog.DogTemperaments.map(t => t.name).join(', ') : dog.temperaments}
                weight={dog.weight}
              />
            );
          })
        ) : (
          !dogsFilters.length 
          ? <Loader /> 
          : <div >
            <h3>Dog not found!</h3>
            <img className={styles.img} src={gato} alt="Not Found" />
            </div>
        )} 
      </div>  
        <footer>
          <p>Johan Fajardo@. All rights reserved</p>
        </footer>           
    </div>    
  )
} 

export default Home;