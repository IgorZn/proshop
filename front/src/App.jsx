import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/index.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {Outlet} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    return (
        <>
            <Header/>
            <main className="py-3">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer/>
            <ToastContainer />
        </>
    )
}

export default App
