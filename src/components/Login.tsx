import { useState } from "react"

const initialForm = {
    email: "",
    password: "",
}
export const Login = () => {
    const [form, setForm] = useState(initialForm)
    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        setForm({ ...form, [name]: value })

    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

    }
    return (
        <div className="h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
                    <div className="flex flex-col items-center gap-2 justify-center">
                        <img className="w-20 h-20" src="https://img.icons8.com/office/40/shop.png" alt="Logotipo" />
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">Inicia sesion</h2>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
                        <div className="mt-2">
                            <input onChange={handleChangeForm} id="email" name="email" type="email" autoComplete="email" required className="px-2 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={handleChangeForm} id="password" name="password" type="password" autoComplete="current-password" required className=" px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-300 px-3 py-1.5 text-sm font-semibold leading-6 hover:bg-yellow-400 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Sign in</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
