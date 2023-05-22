import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createDog, getTemperaments, getDogs } from '../../redux/actions';
import { Link } from "react-router-dom";
import validation from './validation'
import styles from './Create.module.css'

const Create = () => {

    const dispatch = useDispatch();
    const temps = useSelector(state => state.temperaments)
    const [tempsDB, setTempsDB] = useState([]);
    const [errors, setErrors] = useState({})
    const [dogImage, setDogImage] = useState('');
    const [dogCreated, setDogCreated] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',        
        life_span_min: '',
        life_span_max: '',
        temperaments: []
    })   

    useEffect(() => {
        return () => { dispatch(getDogs())}
    }, [dispatch])

    useEffect (() => {
        dispatch(getTemperaments())
    }, [dispatch])

    useEffect(() => {
        if (dogCreated) {
          setShowForm(false); // Oculta el formulario
          setTimeout(() => {
            setShowForm(true); // Muestra el formulario 
          }, 200);
        }
      }, [dogCreated]);

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!errors.name && !errors.weight_min && !errors.weight_max && !errors.height_min && !errors.height_max && !errors.image && !errors.life_span_min && !errors.life_span_max){

            const newDog ={
                ...input,
                name: input.name.trim(),
                // image: input.image.trim(),
                temperaments: tempsDB
            }
            dispatch(createDog(newDog))

            setInput({
                name: '',
                height_min: '',
                height_max: '',
                weight_min: '',
                weight_max: '',                
                life_span_min: '',
                life_span_max: '',
                temperaments: []
            })
            setDogCreated(true);
            setTempsDB([])
            setDogImage('')
        }
    }

    const handleChange = (event) => {
        setInput({
            ...input, 
            [event.target.name]: event.target.value
        })

        const newErrors= validation({
            ...input, 
            [event.target.name]: event.target.value
        })

        setErrors(newErrors)

        const isValid = Object.keys(newErrors).length === 0;
        setIsFormValid(isValid);
    }

    const handleSelect = (event) => {
        if(!tempsDB.includes(event.target.value))
        setTempsDB([
            ...tempsDB, 
            event.target.value
        ])
    }
    const handleDelete = (event) => {
        event.preventDefault()
        setTempsDB(tempsDB.filter((temp) => temp !== event.target.value))
    }

    const randomImage = () => {
        const randomNumber = Math.floor(Math.random() * 1000); // Genera un número aleatorio entre 0 y 999
        const randomUrl = `https://loremflickr.com/320/240/dog?random=${randomNumber}`; // Añade el número aleatorio como parámetro de consulta a la URL de la imagen
        setDogImage(randomUrl);
        setDogCreated(false);
      };
       
    return(                
        <div className={styles.container}>     
            <Link to='/home'>  
                <button className={styles.button}>HOME</button>
            </Link>       
            <p>Complete the form and create your breed dog!</p>
            {showForm && (
            <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>                
                <div  >                           
                    <h4 > NAME: </h4> 
                    <input
                    name='name'
                    type='text'
                    placeholder='Breed Name'
                    value={input.name}
                    onChange={handleChange} 
                    />
                    {errors.name && (<span>{errors.name}</span>)}
                </div>
                <div  >    
                    <h4> HEIGHT </h4>        
                    <label > MIN: </label>
                    <input 
                    name='height_min' 
                    type= 'text'  
                    placeholder='Min Cms'
                    value={input.height_min}
                    onChange={handleChange}
                    />                    
                    {errors.height_min && (<span>{errors.height_min}</span>)}                                       
                    <label > MAX: </label>
                    <input 
                    name='height_max' 
                    type= 'text'  
                    placeholder='Max Cms'
                    value={input.height_max}
                    onChange={handleChange}
                    />
                    {errors.height_max && (<span>{errors.height_max}</span>)}
                </div>
                <div >          
                    <h4> WEIGHT </h4>  
                    <label > MIN: </label>
                    <input 
                    name='weight_min' 
                    type= 'text'  
                    placeholder='Min Kgs'
                    value={input.weight_min}
                    onChange={handleChange}
                    />
                    {errors.height_min && (<span>{errors.weight_min}</span>)}                            
                
                <label > MAX: </label>
                    <input 
                    name='weight_max' 
                    type= 'text'  
                    placeholder='Max Kgs'
                    value={input.weight_max}
                    onChange={handleChange}
                    />
                    {errors.weight_max && (<span>{errors.weight_max}</span>)}  
                </div>
                <div >   
                    <h4> LIFE SPAN </h4>         
                    <label > MIN: </label>
                    <input 
                    name='life_span_min' 
                    type= 'text'  
                    placeholder='Min years'
                    value={input.life_span_min}
                    onChange={handleChange}
                    />
                    {errors.life_span_min && (<span>{errors.life_span_min}</span>)} 
                    <label > MAX: </label>
                    <input 
                   name='life_span_max' 
                   type= 'text'  
                   placeholder='Max years'
                   value={input.life_span_max}
                   onChange={handleChange}
                   />
                   {errors.life_span_max && (<span>{errors.life_span_max}</span>)}                   
                </div>

                <div className={styles.divImagen}>
                    <button  type='button' onClick={randomImage}>Random Image</button>
                    {dogImage && (
                         <img src={dogImage} alt="Dog" />
                    )}
                </div>
                <div className={styles.box}>                
                <select 
                defaultValue='DEFAULT'
                name="temperaments" 
                onChange={handleSelect}>
                    <option> Select Any Temperaments:</option>
                    {temps.map((temps) => (
                        <option 
                        key={temps.name} 
                        value={temps.name}>
                        {temps.name}
                        </option>
                    ))}
                </select>
                <ul>
                    {tempsDB.map((temp, id) => (
                        <li key={id}>
                            {temp}
                            <button value={temp} onClick={(event) => handleDelete(event)}> X </button>
                        </li>
                    ))}
                </ul>
                </div>
                
                <div>
                {dogCreated ? (
                      <button disabled={dogCreated} className={styles.buttonOk} >
                      DOG CREATED
                  </button>                   
                ) : (
                    <button disabled={!isFormValid} className={styles.button} onClick={handleSubmit}>
                        CREATE DOG
                    </button>
                )}
            </div>
            </form>
            )}
        </div>
    )
}
export default Create;