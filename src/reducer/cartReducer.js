
const cartReducer = (state,action) => {

    if(action.type === "ADD_TO_CART"){
        let {id,color,amount,product} = action.payload;
        //console.log("AddTo Cart: ",product);

        //tackle the existing product
        // yaha hum kar rahe hai ki agar humne kisi product par select kiya
        // aur agar uski id aur color same hai jo mene pehle apne cart mein add kar
        // rakhe hai products uski id se toh hume naya data add karne ki jarurat nahi
        // hai jyunki uski id aur color toh same hi hai toh hum kya karenge 
        // ki agar same id aur color wala product user fir se add karta hai toh hum
        // keval us product ki quantity increase kar de aur uska price increase kar de
        // naya data banane ki jarurat nahi hai duplicate data nahi add karna
        let existingProduct = state.cart.find((curEle)=> curEle.id === id + color);

        if(existingProduct){

            let updatedProduct = state.cart.map((curEle)=>{
                if(curEle.id === id + color){
                    let newAmount = curEle.amount + amount;
                    // yaha hum kya kar rahe hai
                    // Agar user product ki quantity ko increment karta ja raha hai
                    // aur product ki quantity hamare stock quantity se max ho jati hai
                    // toh aisa toh nahi hona chahiye toh is case mein hum newAmount = curEle.max
                    // kar rahe hai matlab user chahe jitne products select kar le add to cart par 
                    // kabhi woh hamare Stock se jyada honge hi nahi
                    if(newAmount>= curEle.max){
                        newAmount = curEle.max;
                    }
                    return{
                        ...curEle,
                        amount:newAmount,
                    };
                } else {
                    return curEle;
                } 
               
            });

            return {
                ...state,
                cart: updatedProduct,
            }

            // yaha agar id aur color same nahi hai product ka toh hum nayi entry bana 
            // rahe hai aur us product ke data ko add kar rahe hai apne add to cart mein
        } else {
            let cartProduct;
            cartProduct={
                id: id + color,
                name:product.name,
                color,
                amount,
                image:product.image[0].url,
                price:product.price,
                max:product.stock,
            }

            return {
                ...state,
                cart:[...state.cart,cartProduct],
        
            };
        }

      
    
   
}

// to set the increment and decrement
   if(action.type === "SET_DECREMENT"){
    let updatedProduct = state.cart.map((curEle)=>{
        if(curEle.id === action.payload){
            let decAmount = curEle.amount - 1;

            if(decAmount <= 1){
                decAmount = 1;
            }
            return{
                ...curEle,
                amount:decAmount,
            };
        } else {
            return curEle;
        }
    })
    return {
        ...state,
        cart:updatedProduct
    }
   }

   if(action.type === "SET_INCREMENT"){
    let updatedProduct = state.cart.map((curEle)=>{
        if(curEle.id === action.payload){
            let incAmount = curEle.amount + 1;

            if(incAmount >= curEle.max){
                incAmount = curEle.max;
            }
            return{
                ...curEle,
                amount:incAmount,
            };
        } else {
            return curEle;
        }
    })
    return {
        ...state,
        cart:updatedProduct
    }
   }



  if(action.type === "REMOVE_ITEM"){
    let updatedCart = state.cart.filter((curEle)=> curEle.id !== action.payload);
    return{
        ...state,
        cart:updatedCart,
    }
  }

  // to clear the cart
  if(action.type === "CLEAR_CART"){
    return{
        ...state,
        cart:[],
    }
  }




  if(action.type === "CART_TOTAL_ITEM"){
        let updatedItemVal = state.cart.reduce((initialVal,curEle)=>{
        let {amount} = curEle;
        
          initialVal = initialVal + amount;
          return initialVal
      },0);
      return {
          ...state,
          total_item: updatedItemVal,
      }
    }

    if(action.type === "CART_TOTAL_PRICE"){
        let total_price = state.cart.reduce((initialVal,curEle)=>{
            let {price,amount} = curEle;

            initialVal = initialVal + (price * amount);
            return initialVal;
        },0);

        return {
            ...state,
            total_amount:total_price,
        };
    }

  return state;
}

export default cartReducer;