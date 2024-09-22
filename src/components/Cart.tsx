import { useUIStore } from "../store/ui-store";


export const Cart = () => {

  const closeSidebarMenu = useUIStore(state => state.closeSidebarMenu);
  const isSidebarMenuOpen = useUIStore(state => state.isSidebarMenuOpen);


  return (
    <div
      className={`relative  ${isSidebarMenuOpen ? 'opacity-100 z-[60]' : 'opacity-0 z-[-1]'
        } transition-opacity ease-in-out duration-500`}
      aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div
              className={`pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 ${isSidebarMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-purple-700 shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
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
                        <li className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">Throwback Hip Bag</a>
                                </h3>
                                <p className="ml-4">$90.00</p>
                              </div>
                              <p className="mt-1 text-sm text-yellow-300">Salmon</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-yellow-300">Qty 1</p>

                              <div className="flex">
                                <button type="button" className="font-medium text-yellow-500">Remove</button>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">Throwback Hip Bag</a>
                                </h3>
                                <p className="ml-4">$90.00</p>
                              </div>
                              <p className="mt-1 text-sm text-yellow-300">Salmon</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-yellow-300">Qty 1</p>

                              <div className="flex">
                                <button type="button" className="font-medium text-yellow-500">Remove</button>
                              </div>
                            </div>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                  </div>
                  <p className="mt-0.5 text-sm text-yellow-500">Precio total incluido</p>
                  <div className="mt-6">
                    <a href="#" className="flex items-center justify-center rounded-md border border-transparentpx-6 py-3 text-base font-medium text-black shadow-sm  bg-yellow-300 hover:bg-yellow-500">Pagar</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
