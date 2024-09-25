// src/cartStore.ts
import { create } from 'zustand'

// Definimos una interfaz para el producto en el carrito
interface CartItem {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    quantity: number;
    urlImgProducto: string;
    cantidad_en_stock: number;
}

// Definimos una interfaz para el estado del carrito y las funciones
interface State {
    cart: CartItem[];
    total: number;
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

// Creamos la tienda usando Zustand
export const useCartStore = create<State>((set) => ({
    cart: [],
    total: 0,

    // Función para agregar un ítem al carrito
    addItem: (item: CartItem) =>
        set((state) => {
            const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);

            // Si el ítem ya está en el carrito, aumentamos la cantidad
            if (existingItem) { 
                const updatedCart = state.cart.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        const newQuantity = cartItem.quantity + item.quantity;
                        // Si la nueva cantidad es menor o igual al stock, actualizar la cantidad
                        if (newQuantity <= cartItem.cantidad_en_stock) {
                            return { ...cartItem, quantity: newQuantity };
                        } else {
                            // Si supera el stock, establecer la cantidad al máximo disponible
                            return { ...cartItem, quantity: cartItem.cantidad_en_stock };
                        }
                    }
                    return cartItem;
                });
            
                // Calcular el nuevo total basado en la nueva cantidad
                const newTotal = updatedCart.reduce((acc, cartItem) => {
                    return acc + (cartItem.precio * cartItem.quantity);
                }, 0);
            
                return {
                    cart: updatedCart,
                    total: newTotal,
                };
            }
            

            // Si no está en el carrito, lo añadimos
            return {
                cart: [...state.cart, item],
                total: state.total + item.precio * item.quantity,
            };
        }),

    // Función para eliminar un ítem del carrito
    removeItem: (id: number) =>
        set((state) => {
            const itemToRemove = state.cart.find((item) => item.id === id);
            if (!itemToRemove) return state;

            const updatedCart = state.cart.filter((item) => item.id !== id);
            return {
                cart: updatedCart,
                total: state.total - itemToRemove.precio * itemToRemove.quantity,
            };
        }),

    // Función para vaciar el carrito
    clearCart: () =>
        set(() => ({
            cart: [],
            total: 0,
        })),
}));


