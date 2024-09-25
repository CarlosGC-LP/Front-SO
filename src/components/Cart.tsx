import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart-store";
import { useUIStore } from "../store/ui-store";
import { useSessionStore } from "../store/user-store";
import { Bounce, toast } from "react-toastify";


export const Cart = () => {

  const closeSidebarMenu = useUIStore(state => state.closeSidebarMenu);
  const isSidebarMenuOpen = useUIStore(state => state.isSidebarMenuOpen);
  const cart = useCartStore(state => state.cart);
  const total = useCartStore(state => state.total);
  const removeItem = useCartStore(state => state.removeItem);
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const user = useSessionStore((state) => state.user);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const handlePayment = () => {

    if (!isAuthenticated) {
      navigate('/login');
      return
    }



    const dataCart = cart.map(el => ({ producto_id: el.id, cantidad: el.quantity }))
    fetch(`${apiUrl}/api/ventas/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${user?.token}`
      },
      body: JSON.stringify({
        cliente: user?.id,
        detalles: dataCart,
        total: total,
      }),
    })
      .then(response => {
        if (!response.ok) {
          toast.warn('Error en la compra', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          throw new Error('Error en la compra');
        }

        return response.json();
      })
      .then(data => {

        navigate('/orders');
        toast.warn('Compra exitosa', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        console.log('Compra exitosa:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
  return (
    <div
      className={`relative  ${isSidebarMenuOpen ? 'opacity-100 z-[60]' : 'opacity-0 z-[-1]'
        } transition-opacity ease-in-out duration-500`}
      aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div
            className={`pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 ${isSidebarMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-purple-700 shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-white" id="slide-over-title">Carrito de compras</h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button onClick={closeSidebarMenu} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="absolute -inset-0.5"></span>
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cart.map(el => (
                        <li key={el.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={el.urlImgProducto} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  {el.nombre}
                                </h3>
                                <p className="ml-4">S/{el.precio}</p>
                              </div>
                              <p className="mt-1 text-sm text-yellow-500">{el.descripcion}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-yellow-500">Cantidad {el.quantity} </p>

                              <div className="flex">
                                <button onClick={() => removeItem(el.id)} type="button" className="font-medium text-yellow-500">Eliminar</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>S/{total}</p>
                </div>
                <p className="mt-0.5 text-sm text-yellow-500">Precio total incluido</p>
                <div className="mt-6">
                  <button onClick={handlePayment} className=" w-full rounded-md border border-transparentpx-6 py-3 text-base font-medium text-black shadow-sm  bg-yellow-300 hover:bg-yellow-500">Pagar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
