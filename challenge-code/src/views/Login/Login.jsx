import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/home");
  }, [user, loading, navigate]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu email"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>

        <div>
          <Link to="/reset">Recupera tu contraseña</Link>
        </div>
        <div>
          Crea una cuenta nueva<Link to="/register"> Registrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;