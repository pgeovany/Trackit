import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function Footer() {

    const {percentage} = useContext(UserContext);
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
                    <ProgressBar>
                        <CircularProgressbar
                            value={percentage}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                            strokeLinecap: "round",
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                            })}
                        />
                        <h1>Hoje</h1>
                        </ProgressBar>
                    </Link>
                    <Link to="/historico">
                        <h1>Histórico</h1>
                    </Link>
                </Container>
            )
        }

        return null;
    }

    return(
        <>
            {genFooter()}
        </>
    );
}

const Container = styled.div`
    position: fixed;
    z-index: 1;
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

const ProgressBar = styled.div`
    width: 90px;
    height: 90px;
    margin-bottom: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    h1 {
        position: absolute;
        color: #FFFFFF;
        font-size: 18px;
    }
`;