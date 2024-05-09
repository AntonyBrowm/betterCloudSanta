import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword
} from "../../services/firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [generation, setGeneration] = useState("");
  const [idUniqueFamily, setIdUniqueFamily] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name || !lastName || !generation || !idUniqueFamily) {
      alert("Please fill in all required fields");
      return;
    }
    registerWithEmailAndPassword(name, lastName, generation, idUniqueFamily, email, password,role);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading, navigate]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          className="register__textBox"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
        />
        <input
          type="text"
          className="register__textBox"
          value={generation}
          onChange={(e) => setGeneration(e.target.value)}
          placeholder="Generación"
        />
        <input
          type="text"
          className="register__textBox"
          value={idUniqueFamily}
          onChange={(e) => setIdUniqueFamily(e.target.value)}
          placeholder="ID Único de Familia"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button className="register__btn" onClick={register}>
          Registrar
        </button>

        <div>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>.
        </div>
      </div>
    </div>
  );
}

export default Register;