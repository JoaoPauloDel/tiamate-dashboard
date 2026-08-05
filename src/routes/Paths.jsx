import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SafePaths from "./SafePaths";
import PageLayout from "../layouts/PageLayout";
import Usuarios from "../pages/Usuarios";
import Categorias from "../pages/Categorias";
import Unidades from "../pages/Unidades";
import Interessados from "../pages/Interessados";

const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<SafePaths><PageLayout /></SafePaths>}>
                    <Route index element={<Home />} />
                    <Route path="usuarios" element={<Usuarios />} />
                    <Route path="categorias" element={<Categorias />} />
                    <Route path="unidades" element={<Unidades />} />
                    <Route path="interessados" element={<Interessados />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Paths;