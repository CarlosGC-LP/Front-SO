import { useEffect, useState } from "react";
import { Cart } from "./Cart";
import { useUIStore } from "../store/ui-store";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: string;
    cantidad_en_stock: number;
    urlImgProducto: string;
}
export const Home = () => {

    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://135.224.16.135/api/productos/');
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

    const openSidebarMenu = useUIStore(state => state.openSidebarMenu);
    return (
        <div>

            <div className="bg-purple-700 text-[1.6rem] leading-[1.5]">
                <header className="flex justify-center">
                    <Link to="/">
                        <img className="my-8 p-0" width="75" height="75" src="https://img.icons8.com/office/40/shop.png" alt="Logotipo" />
                    </Link>
                </header>
                <nav className="py-4 flex flex-col  sm:flex-row justify-center items-center gap-8 bg-purple-800">
                    <a className="text-yellow-300 text-[1.7rem] " href="#">Tienda</a>
                    <a className="text-white text-[1.7rem] 0hover:text-yellow-30 " href="#">Ofertas</a>
                    <a className="text-white text-[1.7rem] hover:text-yellow-300 " href="#">Mis compras</a>
                    <button onClick={openSidebarMenu} type="button" className="flex justify-center  gap-2 items-center rounded-full text-white text-[1.7rem] hover:text-yellow-300">
                        <FaCartShopping size={24} className="text-white" />
                        Carrito
                    </button>
                    <Link to="/login" className="flex justify-center  gap-2 items-center rounded-full text-white text-[1.7rem] hover:text-yellow-300"><FaUser size={24} /> Iniciar sesion</Link>
                </nav>

                <main className="mx-auto container">
                    <h1 className="text-center text-yellow-300 text-[2.5rem]  my-8">Nuestros productos</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
                        {productos.map((producto, index) => (
                            <div key={index} className="bg-purple-800 p-4 rounded-xl">
                                <a href="#">
                                    <img className="w-full max-h-[400px] rounded-xl" src={producto.urlImgProducto} alt={producto.nombre} />
                                    <div>
                                        <p className="text-[2rem] text-white text-center my-4 font-sans">{producto.nombre}</p>
                                        <p className="text-[2.3rem] text-yellow-300 text-center font-sans">{producto.precio}</p>
                                    </div>
                                </a>
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
