
import { NavLink } from "react-router-dom";
import styles from './Nav.module.css';
import logo from '../../assets/img/dogs_intro.png'

const Nav =() => {
  return (
    <nav className={styles.navBar}>
      <div>
        <img className={styles.img} src={logo} alt="Logo Pagina" />
      </div>
        <p>Johan Dog's APP</p>
      <div >
      <NavLink to='/dogs'>  
        <button className={styles.button}>CREATE A NEW BREED DOG</button>
        </NavLink>                
      <NavLink to='/about'>  
        <button className={styles.button}>ABOUT</button>
      </NavLink>
      <NavLink to='/'>
        <button className={styles.button}>LOGOUT</button>  
      </NavLink>  
      </div>         
    </nav>     
  );
}

export default Nav;


