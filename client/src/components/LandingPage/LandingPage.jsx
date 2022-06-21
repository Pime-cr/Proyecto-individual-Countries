import React from "react";
import img from './paises.jpg'
import { useHistory } from "react-router-dom";


const LandingPage = () => { 
    const history = useHistory()
     
        return (<div>
            <img src={img} alt={'no-img'}/>
            <button onClick={()=> history.push("/countries")} >Inicio</button>
         </div>)
}


  
  //export const mapDispatchToProps = undefined;

  
export default LandingPage
//export default LandingPage