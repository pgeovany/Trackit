import { useLocation, Link } from "react-router-dom";
//import { useContext } from "react";
//import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from "react-circular-progressbar";
//import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function Footer() {

    const location = useLocation().pathname;
    const render = location !== "/" && location !== "/cadastro" ? true : false;

    function  genFooter() {
        if(render) {
            return (
                <Container>
                    <Link to="/habitos">
                        <h1>Hábitos</h1>
                    </Link>
                    <Link to="/hoje">
                        <h1>Hoje</h1>
                    </Link>
                    <Link to="/historico">
                        <h1>Histórico</h1>
                    </Link>
                </Container>
            )
        }

        return null;
    }

    const footer = genFooter();

    return(
        <>
            {footer}
        </>
    );
}

const Container = styled.div`
    font-family: "Lexend", sans-serif;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-around;

    h1 {
        font-size: 18px;
        color: #52B6FF;
    }

    a {
        text-decoration: none;
    }
`;