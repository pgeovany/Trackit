import { useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function Header() {

    const {userInfo} = useContext(UserContext);
    const location = useLocation().pathname;
    const render = location !== "/" && location !== "/cadastro" ? true : false;

    function genHeader() {
        if(render) {
            return (
                <Container>
                    <p>Trackit</p>
                    {userInfo !== null ? <img src={userInfo.image} alt="" /> : null}
                </Container>
            )
        }
        return null;
    }

    const header = genHeader();

    return(
        <>
            {header}
        </>
    );
}

const Container = styled.div`
    font-family: "Playball", normal;
    position: fixed;
    top: 0;
    left: 0;
    height: 70px;
    width: 100%;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    p {
        color: #ffffff;
        font-size: 38px;
    }

    img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
        object-fit: cover;
    }
`;
