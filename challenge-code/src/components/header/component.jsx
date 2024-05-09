import { Link, useMatch, useResolvedPath } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {  logout } from "../../services/firebase";
import { useSelector } from 'react-redux';
import './styles.css';

export const Header = () => {
  const user = useSelector(state => state.user); 
  const name = user ? user.name : ''; 

  return (
    <nav className="nav">
      <div className="profile">
        <AccountCircleIcon /> Welcome {name}
      </div>
      <ul>
        <CustomLink className="home"to="/home">Home</CustomLink>
        <button onClick={() => logout()}>
          Log Out
        </button>
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
