import { Container } from "react-bootstrap"
import { Footer } from "./Footer"
import { MainHeader } from "./Header/MainHeader"

export const MainWrapper = (props) => {
    return <>
        <MainHeader />
        <Container>
            {props.children}
        </Container>
        <Footer />
    </>
}
