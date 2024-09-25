
import { Link } from "react-router-dom";
import { useUIStore } from "../store/ui-store";
import { useSessionStore } from "../store/user-store";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";


export const Header = () => {

    const openSidebarMenu = useUIStore(state => state.openSidebarMenu);
    const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
    const user = useSessionStore((state) => state.user);
    const logout = useSessionStore((state) => state.logout);
    const logoutUser = () => {
        logout()
    }
    return (
        <header>
            <div className="flex justify-center">
                <Link to="/">
                    <img className="my-8 p-0" width="75" height="75" src="https://img.icons8.com/office/40/shop.png" alt="Logotipo" />
                </Link>
            </div>
            <nav className="py-4 flex flex-col  sm:flex-row justify-center items-center gap-8 bg-purple-800">
                <Link to="/" className="text-[1.7rem] ">Tienda</Link>
                <a className="text-white text-[1.7rem] 0hover:text-yellow-30 " href="#">Ofertas</a>
                <Link to='/ordenes' className="text-white text-[1.7rem] hover:text-yellow-300 ">Mis compras</Link>
                <button onClick={openSidebarMenu} type="button" className="flex justify-center  gap-2 items-center rounded-full text-white text-[1.7rem] hover:text-yellow-300">
                    <FaCartShopping size={24} className="text-white" />
                    Carrito
                </button>
                {isAuthenticated ? (
                    <>
                        <div className="flex justify-center  gap-2 items-center rounded-full text-white text-[1.7rem]"><FaUser size={24} /> {user?.email}</div>
                        <button onClick={logoutUser} className="flex justify-center  gap-2 items-center text-white text-[1.7rem] hover:text-yellow-300 rounded-full border-[3px] border-yellow-300 px-4 py-1">
                            <IoLogOut size={30} className="text-white" />
                            Salir
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="flex justify-center  gap-2 items-center  text-white text-[1.7rem] hover:text-yellow-300"><FaUser size={24} /> Iniciar sesion</Link>
                )}

            </nav>
        </header>
    )
}
