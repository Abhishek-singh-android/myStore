import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontex";
import filterReducer from "../reducer/filterReducer";


const FilterContext = createContext();

const initialState = {
    filter_products:[],
    all_products: [],
    grid_view:false,
    sorting_value:"lowest",
    filters:{
        text:"",
        category:"all",
        company:"all",
        color:"all",
        

    }
}

export const FilterContextProvider = ({children}) =>{

    const { products } = useProductContext();

    console.log("filter_context: ",products);

    // if we want add something we call useReducer hook

    const [state,dispatch] = useReducer(filterReducer,initialState);

    // to set the grid view 
    const setGridView = ()=>{
        return dispatch({type:"SET_GRID_View"});
    }

    // to set the list view
    const setListView = ()=>{
        return dispatch({type:"SET_LIST_View"});
    }

    // sorting function
    const sorting = (event)=>{
        let userValue = event.target.value;
      return  dispatch({type:"GET_SORT_VALUE",payload:userValue})
    }

    // update the filter value
    const updateFilterValue = (event) =>{
        let name = event.target.name; // category
        let value = event.target.value; // all

        return dispatch({type:"UPDATE_FILTER_VALUE",payload:{name,value}});
    };

    // to clear the filter
    const clearFilters = () =>{
        dispatch({type:"CLEAR_FILTERS"});
    }

    // to sort the products 
    useEffect(()=>{

        dispatch({type:"FILTER_PRODUCTS"})
        dispatch({type:"SORTING_PRODUCTS"});

    },[products,state.sorting_value,state.filters]);


    useEffect(()=>{    // useEffect keval first time chalta hai jab website load hota hai
                       // lekin hum data dusre page par dikha rahe hai toh yaha se toh products ka data pass hoga nahi
                       // toh hume kuch aisa chahiye ki data products par depend ho ki jab bhi products mein kuch change ho hume uska data milta rahe
        dispatch({type:"LOAD_FILTER_PRODUCTS",payload:products})
    },[products]);  // toh yaha humne dependencyArray mein products pass kiya hai ki jab bhi mere products mein changes ho mujhe uska data milta rahe
    // ab yaha LOAD_FILTER_PRODUCT action ki help se products ka data hum filterReducer tak
    // pahucha rahe hai jaha se filter reducer products ka data hamare filter_products: wale [] array mein bhej raha hai

    return (    // yaha FilterContext.Provider mein jo bhi value pass karunga wo sari global hongi toh unhe koi bhi use kar sakta hai 
        <FilterContext.Provider value={{...state,setGridView,setListView,sorting,updateFilterValue,clearFilters}}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () =>{
    return useContext(FilterContext);
}