import { createSlice } from '@reduxjs/toolkit';

// Utility function to generate unique IDs for items
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const id = generateId(); // Generate a unique ID
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ id, name, image, cost, quantity: 1 });
      }
      // Update totalQuantity
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      // Update totalQuantity
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (quantity <= 0) {
          // Remove item if quantity is zero or less
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity = quantity;
        }
        // Update totalQuantity
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;


