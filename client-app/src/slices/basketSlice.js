import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        hydrate: (state, action) => {
            return action.payload;
        },
        // Store actions
        addToBasket: (state, action) => {
            //state.items = [...state.items, action.payload];
            const index = state.items.findIndex(i => i.id === action.payload.id)
            
            if (index >= 0) {
                state.items[index].quantity++
            } else {
                state.items = [...state.items, {...action.payload, quantity: 1}]
                
            }
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(i => i.id === action.payload.id);
            console.log(index, state.items[index]);
            
            if (index >= 0 && state.items[index].quantity > 1) {
                state.items[index].quantity--
            } else {
                state.items.splice(state.items.findIndex(i => i.id === action.payload), 1)
            }
        },
        removeGroupedFromBasket: (state, action) => {
            let newBasket = state.items.filter(
                (item) => item.id !== action.payload.id
            );

            state.items = newBasket;
        },
        clearBasket: (state, action) => {
            state.items = [];
        },
    },
});

export const {
    addToBasket,
    removeFromBasket,
    removeGroupedFromBasket,
    hydrate,
    clearBasket,
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
    state.basket.items.reduce((total, item) => total + item.price, 0);
export const selectItemsCount = (state) => state.basket.items.reduce((total, item) => total+=item.quantity, 0);

export default basketSlice.reducer;
