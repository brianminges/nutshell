import react from "react";
import './Nutshell.css'

export const Home = () => {
    return (
        <>
        <h1 className="site__title">Welcome to Ghost Zen Den</h1>
        <div className="">
            <picture>
            <img className="site__logo" src={'/ghost.png'} alt="Ghost Zen logo" />
            </picture>
        </div>
        </>
    )
}