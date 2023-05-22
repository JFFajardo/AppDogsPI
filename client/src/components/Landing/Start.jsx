import { useEffect } from "react";
import styles from "./Start.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";



export default function Start () {
    const dispatch = useDispatch ()

    useEffect(() => {
        return () => { dispatch(getDogs())}
    }, [])

    return(          
        <div className={styles.container}>          
           
                <div className={styles.div}> 
                    <h1>WELCOME TO JOHAN DOGS APP</h1>
                    <div className={styles.dot}></div>
                        <div >
                            <Link className={styles.neon_button} to='/home'>
                                ENTER
                            </Link>          
                        </div>
                </div>     
        </div>
    )
} 