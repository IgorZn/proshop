import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";

function App() {

    return (
        <>
            <Header/>
            <main className="py-3">
                <Container>
                    <HomeScreen/>
                </Container>
            </main>
            <Footer/>
        </>
    )
}

export default App
