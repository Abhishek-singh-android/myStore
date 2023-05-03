
const filterReducer = (state,action) =>{

    switch(action.type){
        
        case "LOAD_FILTER_PRODUCTS":

            return {
                ...state,
                filter_products:[...action.payload],  // yaha ... dot ka matlab ye hai ki mein
                                                     //original data ki copy bana do aur jo bhi changes
                                                     // hai woh copied wale data ho kyunki mein original
                                                     // data ko nahi chhedna chahta hun
                all_products:[...action.payload],
            };

        case "SET_GRID_View":
            return{
                ...state,
                grid_view:true,
            } 

        case "SET_LIST_View":
            return{
             ...state,
             grid_view:false,
             }    

        case "GET_SORT_VALUE":
             //let userSortValue = document.getElementById("sort");
             //let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
           //  console.log(sort_value)
                return{
                 ...state,
                 sorting_value:action.payload,
                 } 
                 
                 
        case "SORTING_PRODUCTS":
            let newSortData;
            // let tempSortProduct=[...action.payload];

            const {filter_products,sorting_value} = state;
            let tempSortProduct = [...filter_products];

            const sortingProducts = (a,b)=>{
                if(sorting_value==="lowest"){
                    return a.price-b.price;
                }
                if(sorting_value==="highest"){
                    return b.price-a.price;
                }
                if(sorting_value==="a-z"){
                    return a.name.localeCompare(b.name);
                }
                if(sorting_value==="z-a"){
                    return b.name.localeCompare(a.name);
                }
            };

            newSortData = tempSortProduct.sort(sortingProducts);

            return {
                ...state,
                filter_products:newSortData,
            }         
            
        case "UPDATE_FILTER_VALUE":
            const {name,value} = action.payload;
            
            return{
                ...state,
                filters:{
                    ...state.filters,[name]:value,
                },
            }

        case "FILTER_PRODUCTS":
            let{all_products} = state;
            let tempFilterProduct = [...all_products];

            const {text,category,company,color} = state.filters;

            if(text){
                tempFilterProduct = tempFilterProduct.filter((curEle)=>{
                    return curEle.name.toLowerCase().includes(text);
                });
            }

            if(category !=='all'){
                tempFilterProduct = tempFilterProduct.filter((curEle)=>{
                    return curEle.category === category;
                    
                });
            }

            if(company !=="all"){
                tempFilterProduct = tempFilterProduct.filter((curEle)=>{
                    return curEle.company === company;
                    
                });
            }

            if(color!=="All"){
                tempFilterProduct = tempFilterProduct.filter((curEle)=>
                    curEle.colors.includes(color)
                )
            }

            return{
                ...state,
                filter_products:tempFilterProduct,
            }


            case "CLEAR_FILTERS":
                return{
                    ...state,
                    filters:{
                        ...state.filters,
                        text:"",
                        category:"all",
                        company:"all",
                        color:"all",
                        
                    }
                }


            
        default:
            return state;
    }
}

export default filterReducer;