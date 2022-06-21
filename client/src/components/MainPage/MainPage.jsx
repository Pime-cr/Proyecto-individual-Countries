import React ,{useEffect} from "react";
//import SearchBar from "../SearchBar/SearchBar";
import { useSelector,useDispatch } from "react-redux";
import { getAllCountries,getActivities ,searchCountrie} from "../../redux/actions";
import { Link ,useHistory} from 'react-router-dom'
import styles from './mainpageStyles.module.css'

//<SearchBar/>
let Items_Per_Page = 9

const MainPage = () =>{
    const {countries,activities,matchedCounties} = useSelector((state)=>state)
    const Dispatch = useDispatch()
    const [stateinputs,setStateInputs] = React.useState({
        filtredCountries:[],
        name:'',
        switcher:false,
        sercheadCountries:[],
        sAZ:true,
        items:[],
        sP:true
    })
    const [currentPage,setCurrentPage] = React.useState(1)
    const [activitiesState,setActivitiesState]=React.useState({})
    const history = useHistory()
    useEffect(()=>{Dispatch(getAllCountries())
      Dispatch(getActivities())},[])
    //console.log(stateinputs.filtredCountries[0])
    useEffect(()=>{ setStateInputs({...stateinputs,filtredCountries:countries})},[countries])
    useEffect(()=>{ setStateInputs({...stateinputs,items:matchedCounties})},[matchedCounties])
    useEffect(()=>{ setStateInputs({...stateinputs,items:stateinputs.filtredCountries.slice(0,Items_Per_Page)})},[stateinputs.filtredCountries])

    console.log(stateinputs.items)
    
    const handleOptions =(e)=>{
        setActivitiesState(e.target.value)
        Dispatch(searchCountrie(e.target.value))
    }

    const handleInputsChange = (e)=>{
        setStateInputs({
          ...stateinputs,
          [e.target.name]:e.target.value      
        })            
    }

    const handleSubmit = ()=>{
        if (countries.length>0){            
            const a = countries.filter((country)=>country.name.toLocaleLowerCase().includes(stateinputs.name.toLocaleLowerCase()))
            console.log(a)
            if (stateinputs.filtredCountries.lenght=== a.length) return 
            if (a.length>0) return setStateInputs({...stateinputs,sercheadCountries:a ,switcher:true})
            else{ return setStateInputs({...stateinputs,switcher:false,})}
        }        
    }

    const handleFilter = ()=>{
        if (stateinputs.sAZ){
            const newArray =countries.sort((a, b) => a.name.localeCompare(b.name))
            setStateInputs({...stateinputs,
                filtredCountries:newArray,
                sAZ:false,
                items:stateinputs.filtredCountries.slice(0,Items_Per_Page)})
            return 
        } else {
            const newArray =countries.sort((b, a) => a.name.localeCompare(b.name))
            setStateInputs({...stateinputs,
                filtredCountries:newArray,
                sAZ:true,
                items:stateinputs.filtredCountries.slice(0,Items_Per_Page)})
            return
        }
    }

    const handlePopulation = ()=>{
        if (stateinputs.sP){
            const newArray =countries.sort((a, b) => a.population-b.population)
            setStateInputs({...stateinputs,
                filtredCountries:newArray,
                sP:false,
                items:stateinputs.filtredCountries.slice(0,Items_Per_Page)})
            return 
        } else {
            const newArray =countries.sort((b, a) => a.population-b.population)
            setStateInputs({...stateinputs,
                filtredCountries:newArray,
                sP:true,
                items:stateinputs.filtredCountries.slice(0,Items_Per_Page)})
            return
        }
    }

    const nextHandler=()=>{
        const totalElements = stateinputs.filtredCountries.length;
        Items_Per_Page=10
        const firstIndex = (currentPage * Items_Per_Page) - 1
        const secondIndex = ((currentPage+1) * Items_Per_Page) -2
        const nextPage = currentPage +1
        console.log('debuggear:',firstIndex,secondIndex,nextPage)
        if (secondIndex > totalElements) return
        setStateInputs({...stateinputs,items:stateinputs.filtredCountries.slice(firstIndex,secondIndex)})
        setCurrentPage(nextPage)
        //setStateInputs({...stateinputs,items:filtredCountries.splice(firstIndex,Items_Per_Page)})
        
    }
    const prevHandler=()=>{
        Items_Per_Page=10
        let firstIndex = ((currentPage-1) * Items_Per_Page) - 1
        let secondIndex = (currentPage * Items_Per_Page) -2
        let nextPage = currentPage - 1
        console.log('debuggear2:',firstIndex,secondIndex,nextPage)
        //if (currentPage===1) return console.log(currentPage)
        if (currentPage===1){
            firstIndex=0
            secondIndex=10
            Items_Per_Page=9
            //nextPage=0
            console.log(firstIndex)
            return (setStateInputs({...stateinputs,items:stateinputs.filtredCountries.slice(firstIndex,secondIndex)}),
            setCurrentPage(1))
        }
        setStateInputs({...stateinputs,items:stateinputs.filtredCountries.slice(firstIndex,secondIndex)})
        setCurrentPage(nextPage)

    }
        
    function createCountrys (objeto) {
        if (!objeto) return (<>Fallo</>)
        return objeto.map((country)=> {
            return(<Link to={`/countries/${country.id}`} key={country.id} className={styles.card}> 
                <img src={country.flag} width="60px" />
                <p >{country.name}</p>
                <p>{country.region}</p>                
                </Link>
                
                )
        })    
    } 
        return (
            <div className={styles.mainPage}>
            <div className={styles.searchbar}> <input  key='buscar'name='name' type='text' placeholder='' 
                value={stateinputs.name} onChange={ (e) => handleInputsChange(e) }/>
        <button type="submit" className={styles.button} onClick={ (e) => handleSubmit(e) }>Buscar</button>
        <button type="submit" className={styles.button} onClick={(e)=> handleFilter(e)}>{stateinputs.sAZ?'Filtrar A/Z':'Filtrar Z/A'}</button>
        <button type="submit" className={styles.button} onClick={(e)=> handlePopulation(e)}>{stateinputs.sP?'Filtrar Menos Poblacion':'Filtrar Mas Poblacion'}</button>
        <select className={styles.button} value={activitiesState} onChange={(e)=>{handleOptions(e)}} >
            <option>Seleccione un Deporte</option>

            {activities.length>0 ?  activities.map((activity)=>{return <option value={activity.name}>{activity.name}</option>}) 
                                : <option>No hay opciones q mostrar</option> }
        </select>
        <button onClick={()=> history.push("/CreateActivity")} className={styles.button}>Crear Actividad</button>
            </div>
        <div className={styles.cardsContainer}>{countries.lenght!==0 ? stateinputs.switcher ? createCountrys(stateinputs.sercheadCountries) 
                :createCountrys(stateinputs.items)
                : <div>Cargando..</div>} 
        </div>
        <button className={styles.button} onClick={(e)=>{prevHandler(e)}}>Pagina anterior</button>
        <div className={styles.text}>{`Pagina${currentPage}`}</div>
        <button className={styles.button} onClick={(e)=>{nextHandler(e)}}>Pagina siguiente</button>
        <button onClick={()=> history.push("/")} className={styles.button}>Inicio</button>

        </div>
    )
}

export default MainPage


/* Ruta principal: debe contener

[ ] Input de búsqueda para encontrar países por nombre
[ ] Área donde se verá el listado de países. Al 
iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /countries
 y deberá mostrar su:
Imagen de la bandera
Nombre
Continente
[ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población
[ ] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando los primeros 9 en la primer pagina. */