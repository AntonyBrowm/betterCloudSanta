import { Link, useMatch, useResolvedPath } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {  logout } from "../../services/firebase";
import './styles.css';
import { useSelector } from 'react-redux';

export const Header = () => {
  const user = useSelector(state => state.user); // Obtener el usuario del estado global de Redux
  const name = user ? user.name : ''; // Obtener el nombre del usuario

  return (
    <nav className="nav">
      <div className="profile">
        <AccountCircleIcon /> Bienvenido {name}
      </div>
      <ul>
        <CustomLink to="/home">Home</CustomLink>
        <button onClick={() => logout()}>
          Cerrar Sesión
        </button>
        <CustomLink to="/pokemon-detail">Modo Oscuro</CustomLink>
      </ul>
    </nav>
  );
}

// eslint-disable-next-line react/prop-types
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
