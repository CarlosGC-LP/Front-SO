import { useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Cart } from "./Cart";
import { useUIStore } from "../store/ui-store";


export const Home = () => {


    return (
        <div>
            <Header />
            <Hero />
            <Cart  />
        </div>
    )
}
