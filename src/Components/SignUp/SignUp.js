import logo from "../../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SignUp() {
    return(
        <Container>
            <img src={logo} alt="logo"/>
            <Form />
            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Container>
    );
}

function Form () {
    return (
            <form>
                <Input required type="email" placeholder="email"/>
                <Input required type="password" placeholder="senha"/>
                <Input required type="text" placeholder="nome"/>
                <Input required type="url" placeholder="foto"/>
                <Button>Cadastrar</Button>
            </form>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Lexend", sans-serif;
    margin-top: 70px;
    width: 100%;

    p, a {
        font-size: 14px;
        color: #52B6FF;
        text-decoration-color: #52B6FF;
        margin-top: 10px;
    }

    img {
        margin-bottom: 32px;
    }

    form {
        width: 80%;
        display: flex;
        flex-direction: column;
    }
`;

const Input = styled.input`
    font-family: "Lexend", sans-serif;
    background-color: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    height: 45px;
    margin-bottom: 6px;
    padding-left: 12px;
    font-size: 18px;
    ::placeholder {
        font-size: 18px;
        color: #DBDBDB;
    }
`;

const Button = styled.button`
    font-family: "Lexend", sans-serif;
    height: 42px;
    border: none;
    color: #ffffff;
    background-color: #52B6FF;
    text-decoration: none;
    font-size: 20px;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
    }
`;