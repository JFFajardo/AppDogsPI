import React from "react";
import styles from './Loader.nodule.css';
import load from '../../assets/img/dogLoader.gif'


const Loader = () => {
    return (
        <div className={styles.loader} >
             <img  src={load} alt="Not Found" />
        </div>
    )
}

export default Loader;