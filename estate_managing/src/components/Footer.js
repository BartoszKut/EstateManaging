import { Row, Col, Container } from "react-bootstrap"

export const Footer = () => {
    return <Container className={'mt-5'}>
        <Row>
            <Col>
                <h2>Godziny otwarcia</h2>
                <p>Poniedziałek: 8:00 - 16:00</p>
                <p>Wtorek: 8:00 - 16:00</p>
                <p>Środa: 8:00 - 16:00</p>
                <p>Czwartek: 8:00 - 16:00</p>
                <p>Piątek: 8:00 - 16:00</p>
            </Col>
            <Col>
                <h2>Dane firmy</h2>
            </Col>
            <Col>
                <h2>Szybki kontakt</h2>
            </Col>
        </Row>
    </Container>
}