import React,{useEffect} from "react";
import { useSelector , useDispatch} from "react-redux";
import { useParams,useHistory} from "react-router-dom";
import {getCountryDetail } from "../../redux/actions";


const CountryDetail = () =>{
    const state = useSelector((state)=>state)
    const Dispatch = useDispatch()
    const history = useHistory()
    let {id} = useParams()
    useEffect(()=>{
        Dispatch(getCountryDetail(id))      
    },[])
    let matchedCountry = state.country[0]
    console.log('soy yo',state.country[1])
    const Country = ()=>{
        if (matchedCountry===undefined) {
            return (<>Cargando..</>)
        }
        else{
        return (<ul>
            <p>{`Codigo:${matchedCountry.id}`}</p>
            <p>{`Nombre:${matchedCountry.name}`}</p>
            <img src={matchedCountry.flag} alt='No hay bandera' width="200px" />
            <p>{`Region:${matchedCountry.region}`}</p>
            <p>{`Subregion:${matchedCountry.subregion}`}</p>
            <p>{`Capital:${matchedCountry.capital}`}</p>
            <p>{`Poblacion:${matchedCountry.population}`}</p>

        </ul>)}
    }
    const activities = () =>{
        if (!state.country[1].length===0) return <div>En este momento no hay actividades</div>
        const aux = state.country[1].map((i)=>{
        return(
            <>
            <div>{i.name}</div>
            <div>{`Dificultad: ${i.dificult}`}</div>
            <div>{`Duracion: ${i.duration}`}</div>
            <div>{`Temporada: ${i.season}`}</div>
            </>)}
        )
        return aux
    }
    //const stateMatched 
    
    return (<>
        <div style={{ fontSize: "50px" }}>
         <div>{id?Country():<div>'no se encontro'</div>}</div>
         <div>Deportes que se pueden realizar en este pais:</div>
         {state.country[1]?activities():null}
         <button onClick={()=> history.push("/countries")} >Inicio</button>
         </div>
        </>
    )
}
//Now showing post {matchedCountry}

export default CountryDetail


/* Ruta de detalle de país: debe contener

[ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
[ ] Código de país de 3 letras (id)
[ ] Capital
[ ] Subregión
[ ] Área (Mostrarla en km2 o millones de km2)
[ ] Población
[ ] Actividades turísticas con toda su información asociada */