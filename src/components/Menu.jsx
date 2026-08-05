import { NavLink } from "react-router";
import logo from "../assets/logo.png";

const Menu = () => {
    return (
        <div className="w-65 bg-white">
            <div className="p-4">
                <img src={logo} alt="Tiamate Coffee" className="h-12" />
            </div>
            <nav className="flex flex-col p-4 *:[&.active]:bg-vinho! *:[&.active]:text-white! *:leading-8 *:pl-2 *:rounded *:text-black!">
                <NavLink end to={"/admin"}>Dashboard</NavLink>
                <NavLink end to={"/admin/usuarios"}>Usuários</NavLink>
                <NavLink end to={"/admin/categorias"}>Categorias</NavLink>
                <NavLink end to={"/admin/unidades"}>Unidades</NavLink>
                <NavLink end to={"/admin/interessados"}>Interessados</NavLink>
            </nav>
        </div>
    );
}

export default Menu;