import React from "react";
import { useHistory } from "react-router-dom";
import { createActivity } from "../../redux/actions";


const CreateActivity = () => {
    const [stateinputs,setStateInputs] = React.useState({})
    const [errors, setErrors] = React.useState({
        name:'El nombre es necesario',
        dificult:'La dificultad debe ser entre 1-5',
        duration:'Ingrese una duracion entre 15-180min',
        season:'Debe seleccionar una estacion',
        country:'No hay paises'
    });

    //const dispatch = useDispatch()
    const history = useHistory()
    //let envio = [{name:stateinputs.name,dificult:stateinputs.dificult,duration},{}]
    let envio ={activity:{...stateinputs,country:null},paises:[stateinputs.country]}

    const validacionDelFormulario = (input)=>{
        let errors={}
        if (!input.name) errors.name = 'No hay informacion en el nombre'
        else if (!/^[a-zA-Z ]{2,30}$/.test(input.name)){
            errors.name='El campo Nombre no es un nombre'
        }
        if (!input.dificult) errors.dificult = 'No hay informacion de Dificultad'
        else if(!/^[1-5]$/.test(input.dificult)){
            errors.dificult=`El numero debe ser entre 1-5 obtenido ${input.dificult}`
        }
        if (!input.duration) errors.duration = 'No hay informacion en la Duracion'
        else if(!/^1[5-9]|[2-9][0-9]|1[0-7][0-9]|180$/.test(input.duration)){
            errors.duration='La duracion debe ser entre 15-180 min.'
        }
        if (!input.season) errors.season = 'No hay informacion en el Temporada'
        else if (!/^Primavera|Verano|Invierno|Otoño/.test(input.season)){
            errors.season=`Estaciones posibles Primavera,Verano,Invierno,Otoño`
        }
        if (!input.country) errors.country = 'No hay informacion de paises'
        else if (!/^(([a-zA-Z](,)?)*)+$/.test(input.country)){
            errors.country='Entrada invalida'
        }
        return errors
    }

    const handleInputsChange = (e)=>{
        setStateInputs({
          ...stateinputs,
          [e.target.name]:e.target.value      
        })
        setErrors(validacionDelFormulario({
            ...stateinputs,
          [e.target.name]:e.target.value
        }))        
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        console.log(envio)
        createActivity(envio)
    }
    
return (
    <>
    <form onSubmit={(e) => handleOnSubmit (e)}>
        <p>Nombre: </p>
            <input name='name' type='text' onChange={ (e) => handleInputsChange(e) }/>
            {errors && errors.name ? <span style={{color:'red'}}>{errors.name}</span> : null}        
        <p>Dificultad: </p>
            <input name='dificult' type='number' onChange={ (e) => handleInputsChange(e) }/>
            {errors && errors.dificult ? <span style={{color:'red'}}>{errors.dificult}</span> : null}
        <p>Duracion: </p>
            <input name='duration' type='number' onChange={ (e) => handleInputsChange(e) }/>
            {errors && errors.duration ? <span style={{color:'red'}}>{errors.duration}</span> : null}
        <p>Temporada: </p>
            <input name='season' type='text' onChange={ (e) => handleInputsChange(e) }/>
            {errors && errors.season ? <span style={{color:'red'}}>{errors.season}</span> : null}
        <p>Paises donde se puede practicar: </p>
        <div>Ingrese uno o mas paises separados por ,</div>
            <input name='country' type='text' onChange={ (e) => handleInputsChange(e) }/>
            {errors && errors.country ? <span style={{color:'red'}}>{errors.country}</span> : null}
        <p/>
        <input type='submit' name="submit" disabled={Object.keys(errors).length===0 ? false:true}></input>

    </form>
    <p/>
    <button onClick={()=> history.push("/countries")} >Inicio</button>
    </>);
};

export default CreateActivity;

//export default CreateActivity