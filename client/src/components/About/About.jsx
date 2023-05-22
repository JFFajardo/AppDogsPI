import styles from "./About.module.css";
import johan from '../../assets/img/johan.jpg'
import { Link } from "react-router-dom";

export default function About () {
    return(
        <div className={styles.container}>
            <Link to='/home'>  
                <button className={styles.button}>HOME</button>
            </Link>
            <h3>Created by: Johan Fajardo</h3>
            <h4>Ingeniero Electronico</h4> 
            <h4>FT 37-A</h4> 
            <img className={styles.img} src={johan} alt="Johan"/>
                <div className={styles.button_container}>
                    <Link to='https://github.com/JFFajardo'>  
                        <button className={styles.button_git}></button>
                    </Link>                    
                    <Link to='https://www.linkedin.com/in/johan-arciniegas-fajardo-81500511a'>  
                        <button className={styles.button_linked}></button>
                    </Link>  
                </div>         
            <h3>Cali - Colombia</h3>
        </div>
    )
}