import axios from 'axios'
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTREIS'
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES'
//fetch ('localhost:3001/countries')
export const getAllCountries = ()=>{
    return async function (dispatch){
        try {
            var {data} =await axios.get('http://localhost:3001/countries')
            return dispatch({
                type:GET_ALL_COUNTRIES,
                payload:data})
        } catch (error) {
            console.log(error)
        }
    };
}

export const getCountryDetail = (params)=> {
    return async function (dispatch){
        try {
            var {data} = await axios.get(`http://localhost:3001/countries/${params}`)
            return dispatch({
                type:GET_COUNTRY_DETAIL,
                payload:data})
        }catch (error) {
            console.log(error)
        }
    }
}

export async function createActivity (params) {
    try {
        const {data} = await axios.post('http://localhost:3001/activities',params)        
    } catch (error) {
        console.log(error)
    }
}

/* export const searchCountries= (params) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/activities/matched${params}`)
            return dispatch({
                type: SEARCH_COUNTRIES,
                payload: data
            })
        } catch (error) {
            console.log('o aqui', error)
        }
    }
} */

export const searchCountrie = (params)=> {
    return async function (dispatch){
        try {
            var {data} = await axios.get(`http://localhost:3001/activities/matched${params}`)
            console.log(data)
            return dispatch({
                type:SEARCH_COUNTRIES,
                payload:data})
        }catch (error) {
            console.log(error)
        }
    }
}

export const getActivities = ()=>{
    return async function(dispatch){
        try {
            const {data} = await axios.get('http://localhost:3001/activities')
            return dispatch({
                type:GET_ACTIVITIES,
                payload:data})

        } catch (error) {
            console.log(error)
            
        }
    }
}