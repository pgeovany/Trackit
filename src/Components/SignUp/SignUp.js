import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";
import logo from "../../assets/images/Logo.svg";

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const navigate = useNavigate();

    function signUser(e) {
        e.preventDefault();
        setDisableButton(true);
        const body = {
            email,
            name,
            image,
            password
        }
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);
        request.then(() => navigate("/"));
        request.catch(({response}) => {
            setDisableButton(false);
            alert(response.data.message);
        });
    }

    return(
        <Container>
            <img src={logo} alt="logo"/>
            <form onSubmit={signUser}>
                <Input required disabled={disableButton} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email"/>
                <Input required disabled={disableButton} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="senha"/>
                <Input required disabled={disableButton} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="nome"/>
                <Input required disabled={disableButton} value={image} onChange={(e) => setImage(e.target.value)} type="url" placeholder="foto"/>
                <Button type="submit" disabled={disableButton}>
                    {disableButton ? <ThreeDots color="white"/> : "Cadastrar"}
                </Button>     
            </form>
            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Lexend", sans-serif;
    background-color: #FFFFFF;
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
    background-color: ${props => props.disabled ? "#F2F2F2" : "#FFFFFF"};
    color: ${props => props.disabled ? "#AFAFAF" : "black"};
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
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`;