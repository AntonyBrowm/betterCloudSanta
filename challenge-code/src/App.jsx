import './App.css'
import {  Route, Routes,useNavigate } from "react-router-dom";
import { AppContainer } from './components/appContainer/component';
import Home from './views/home/component';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth } from "./services/firebase";
import Login from "./views/Login/Login";
import { fetchUserName } from './services/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions';
import Register from "./views/Register/Register";
const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if(error)navigate("/login");
    if (loading) return;
    if (!user) return navigate("/login");
    if(user){
      console.log(user.email);
      fetchData(user.email)
    }
  }, [user, loading, error]);

  const fetchData = async (email) => {
    try {
      console.log(email);
      const user = await fetchUserName(email); // Suponiendo que esta función obtiene el usuario actual
      dispatch(setUser(user)); // Despachar la acción setUser con los datos del usuario
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="router">
      <div className="content">
      <Routes>
      <Route exact path="/" element={<AppContainer />} >
      <Route exact path="/home" element={<Home />} />
      </Route>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </div>
  )
}
function PageNotFound() {
  return (
    <div>
      <h2>404 Page not found</h2>
    </div>
  );
}
export default App