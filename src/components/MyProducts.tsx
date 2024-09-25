import { useEffect, useState } from "react";
import { useSessionStore } from "../store/user-store";
import { format } from 'date-fns';
import { Header } from "./Header";
import { Cart } from "./Cart";
import { useNavigate } from "react-router-dom";
interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: string;
    cantidad_en_stock: number;
    urlImgProducto: string;
}

interface Detalle {
    producto_id: number;
    cantidad: number;
    producto: Producto;
}

interface Pedido {
    id: number;
    fecha: string;
    detalles: Detalle[];
    total: string;
}

export const MyProducts = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const user = useSessionStore((state) => state.user);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const navigate = useNavigate();
    const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
    if (!isAuthenticated) {
        navigate('/login');
        return
    }
    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await fetch(`${apiUrl}/compras/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${user?.token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al obtener las compras');
                }
                const data: Pedido[] = await response.json();
                setPedidos(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCompras();
    }, [])

    const formatFecha = (fechaISO: string) => {

        const fecha = new Date(fechaISO);

        // Formatear la fecha
        const fechaFormateada = format(fecha, 'dd/MM/yyyy HH:mm:ss');
        return fechaFormateada
    }
    return (



        <div>
            <div className="bg-purple-700 text-[1.6rem] leading-[1.5]">
                <Header />
                <main className="mx-auto container lg:h-screen bg-purple-700">
                    <h1 className="text-center text-yellow-300 text-[2.5rem]  font-semibold py-8">Mis compras</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
                        {pedidos.map((pedido) => (
                            <div key={pedido.id} className="bg-purple-800 p-5 rounded-xl">
                                <div className="flex flex-col justify-center gap-3 py-4">
                                    <p className="text-[1.5rem] text-white text-center">{formatFecha(pedido.fecha)}</p>
                                    <p className="text-[2.3rem] text-yellow-300 text-center border-4 border-yellow-300 rounded-xl">S/{pedido.total}</p>
                                    <p className="text-[2.3rem] text-yellow-300 text-center">Productos</p>
                                    <div className="grid grid-cols-4">
                                        {pedido.detalles.map((producto) => (<img className="w-full h-32 rounded-xl object-cover" src={producto.producto.urlImgProducto} alt={producto.producto.nombre} />))}
                                    </div>
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
