import './styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/component';

export const AppContainer = () => {
  return (
    <>
     <Header />
      <section className="app-wrapper">
        <Outlet />
      </section>
    </>
  );
};
