import React from 'react';
import {useDispatch} from 'react-redux';
import { orderByName, orderByWeight } from '../../redux/actions';
import styles from './Order.module.css';

const Order = ({ setMinPage, setMaxPage, setActualPage, setOrder}) => {
    
    const dispatch = useDispatch();

    const handleOrder = (event) => {
        if (event.target.value === 'A' || event.target.value === 'D') {
            setActualPage(1);
            setMinPage(0)
            setMaxPage(5)  
            dispatch(orderByName(event.target.value))
            setOrder(`sort by ${event.target.value}`); 
        }
        else if (event.target.value === 'max' || event.target.value === 'min'){
            setActualPage(1);
            setMinPage(0)
            setMaxPage(5)  
            dispatch(orderByWeight(event.target.value))
            setOrder(`sort by ${event.target.value}`);
        }
    }

    return (
        <div className={styles.box} >
            <h4>Order by</h4>
            <div className={styles.box} > 
                <select defaultValue='DEFAULT' onChange={handleOrder} >
                    <option value= 'DEFAULT'>Select Order</option>
                    <option value= 'A'>Breeds A-Z</option>
                    <option value= 'D'>Breeds Z-A</option>
                    <option value= 'min'>Min Weight</option>
                    <option value= 'max'>Max Weight</option>
                </select>                  
            </div>
        </div>
    )
}

export default Order;