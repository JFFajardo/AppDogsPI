import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css';

const Card = ({ id, name, image, weight, temperaments }) => {
    return (
      <div className={styles.container} >
        <div className={styles.card_container} >
            <Link className={styles.header} to={"/dogs/" + id}>
            <div >
              <img src={image} alt={name}/>
               <p>{name}</p>                        
            </div>
            </Link>
        <div className={styles.text_container}>        
          <p >{temperaments}</p>      
          <h5 >{weight} kg</h5>        
        </div>
        
      </div>
    </div>
    );
 };
  
export default Card;


