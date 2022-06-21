import { GET_ALL_COUNTRIES,GET_COUNTRY_DETAIL,GET_ACTIVITIES ,SEARCH_COUNTRIES} from "../actions";

const initialState = {
    countries: [],
    matchedCounties:{},
    country: {},
    activities:[]
  };

const rootReducer = (state=initialState,action) => {
  if (action.type=== GET_ALL_COUNTRIES) {
    return {...state,countries:action.payload}
  } 
  if (action.type=== GET_COUNTRY_DETAIL) {
    return {...state,country:action.payload}
  }
  if (action.type=== GET_ACTIVITIES) {
    return {...state,activities:action.payload}
  }
  if (action.type=== SEARCH_COUNTRIES) {
    return {...state,matchedCounties:action.payload}
  }
  return state
}

export default rootReducer