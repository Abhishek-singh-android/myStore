const ProductReducer = (state,action) =>{
    // if(action.type === "SET_LOADING"){
    //     return {
    //         ...state,
    //         isLoading:true
    //     };
    // }
    // if(action.type === "API_ERROR"){
    //     return{
    //         ...state,
    //         isLoading:false,
    //         isError:true,
    //     }
    // }

    switch (action.type) {
        case "SET_LOADING":      // step5
            return{
                ...state,
               isLoading:true,
                         
            };

            case "SET_API_DATA":{          // step8
                const featureData = action.payload.filter((curEle)=>{
                    return curEle.featured === true;
                });
                return{            // step9
                    ...state,
                    isLoading:false,
                    products:action.payload,
                    featureProducts:featureData,
                }
            }    

         case "API_ERROR":
            return{
                  ...state,
                 isLoading:false,
                  isError:true,
                 }; 
                 
          case "SET_SINGLE_LOADING":      
             return{
                ...state,
                isSingleLoading:true,                              
            };       

            case "SET_SINGLE_PRODUCT":
                return{
                    ...state,
                    isSingleLoading:false,
                    singleProduct: action.payload,                              
                };  


                case "SET_SINGLE_ERROR":
                    return{
                          ...state,
                          isSingleLoading:false,
                          isSingleError:true,
                         };      
            
         default:
            return{
                ...state,
            };
    }

};

export default ProductReducer;