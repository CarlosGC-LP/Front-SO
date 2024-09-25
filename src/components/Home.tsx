import { useEffect, useState } from "react";
import { Cart } from "./Cart";
import { useUIStore } from "../store/ui-store";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart-store";
import { Header } from "./Header";

interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad_en_stock: number;
    urlImgProducto: string;
}

export const Home = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [productos, setProductos] = useState<Producto[]>([]);
    

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/productos/`);
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data: Producto[] = await response.json();
                setProductos(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProductos();
    }, [])

    const addItem = useCartStore(state => state.addItem);
    const openSidebarMenu = useUIStore(state => state.openSidebarMenu);

    const handleAddItem = (product: Producto) => {
        const newProduct = {
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            quantity: 1,
            urlImgProducto: product.urlImgProducto,
            cantidad_en_stock: product.cantidad_en_stock
        }
        addItem(newProduct)
        openSidebarMenu()
    }
    return (
        <div>
            <div className="bg-purple-700 text-[1.6rem] leading-[1.5]">
                <Header />
                <main className="mx-auto container lg:h-screen">
                <h1 className="text-center text-yellow-300 text-[2.5rem]  font-semibold py-8">Nuestros productos</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
                        {productos.map((producto, index) => (
                            <div key={producto.id} className="bg-purple-800 p-5 rounded-xl">
                                <img className="w-full max-h-[400px] rounded-xl" src={producto.urlImgProducto} alt={producto.nombre} />
                                <div className="flex flex-col justify-center gap-3 py-4">
                                    <div className="flex justify-between">
                                        <p className="text-[1.5rem] text-white text-center">{producto.nombre}</p>
                                        <p className="text-[1.5rem] text-white text-center">Unid: {producto.cantidad_en_stock}</p>
                                    </div>
                                    <p className="text-[2.3rem] text-yellow-300 text-center border-4 border-yellow-300 rounded-xl">S/{producto.precio}</p>
                                    <button onClick={() => handleAddItem(producto)} className="p-2 bg-yellow-300 rounded-xl text-black">Agregar al carrito </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <footer className="py-4 mt-8 bg-purple-800">
                    <p className="text-center text-[1.8rem] text-white font-sans">Grupo06 - Todos los derechos reservados</p>
                </footer>
            </div>
            <Cart />
        </div>
    )
}
