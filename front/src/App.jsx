import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {

    return (
        <>
            <Header/>
            <main className="py-3">
                <Container>
                    <h1>Welcome To ProShop</h1>
                </Container>
            </main>
            <Footer/>
        </>
    )
}

export default App
