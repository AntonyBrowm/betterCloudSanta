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
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name || !lastName || !generation || !idUniqueFamily) {
      alert("Please fill in all required fields");
      return;
    }
    registerWithEmailAndPassword(name, lastName, generation, idUniqueFamily, email, password,"user");
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
          placeholder="Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={generation}
          onChange={(e) => setGeneration(e.target.value)}
          placeholder="Generation"
        />
        <input
          type="text"
          className="register__textBox"
          value={idUniqueFamily}
          onChange={(e) => setIdUniqueFamily(e.target.value)}
          placeholder="Family"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>

        <div>
          Do you already have an account?<Link to="/login">Log in</Link>.
        </div>
      </div>
    </div>
  );
}

export default Register;