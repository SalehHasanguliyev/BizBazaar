import { createSlice } from "@reduxjs/toolkit"

const getBasketFromStorage = () => {
    if (localStorage.getItem('basket')) {
        return JSON.parse(localStorage.getItem('basket'));
    }
    return [];
}

const initialState = {
    products: getBasketFromStorage(),
    totalAmount: 0
}

const setProductToStorage = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket));
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const foundProduct = state.products && state.products.find(product => product.id === action.payload.id);
            if (foundProduct) {
                const extractedProduct = state.products.filter(product => product.id != action.payload.id);
                foundProduct.count += action.payload.count;
                state.products = [...extractedProduct, foundProduct]
                setProductToStorage(state.products);
            } else {
                state.products = [...state.products, action.payload];
                setProductToStorage(state.products);
            }
        },
        removeFromBasket: (state, action) => {
            const foundProduct = state.products && state.products.find(product => product.id === action.payload.id);
            if(foundProduct) {
                state.products = state.products.filter(product => product.id !== action.payload.id);
            }
            setProductToStorage(state.products);
            state.totalAmount = 0;
            state.products.forEach(product => {
                state.totalAmount += product.price * product.count;
            })
        },
        calculateTotalPrice: (state) => {
            state.totalAmount = 0;
            state.products && state.products.map(product => {
                state.totalAmount += product.price * product.count;
            })
        }
    }
})

export const { addToBasket, removeFromBasket, calculateTotalPrice } = basketSlice.actions

export default basketSlice.reducer