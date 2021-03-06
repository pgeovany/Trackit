import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import logo from "../../assets/images/Logo.svg";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [persistentLogin, setPersistentLogin] = useState(false);
    const {userInfo, setUserInfo} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() =>{
        if(localStorage.getItem("user") !== null) {
            const serializedData = localStorage.getItem("user");
            const data = JSON.parse(serializedData);
            setUserInfo({...data});
            navigate("/hoje");
        }
    }, []);

    function logUser(e) {
        e.preventDefault();
        setDisableButton(true);
        const body = {
            email,
            password
        }
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);
        request.then(answer => {
            setUserInfo(answer.data);
            if(persistentLogin) {
                localStorage.setItem("user", JSON.stringify(answer.data));
            }
            navigate("/hoje");
        })
        request.catch(({response}) => {
            setDisableButton(false);
            alert(response.data.message);
        })
    }

    return(
        <Container>
            <img src={logo} alt="logo"/>
            <form onSubmit={logUser}>
                <Input required disabled={disableButton} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email"/>
                <Input required disabled={disableButton} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="senha"/>
                <Button type="submit" disabled={disableButton}>
                    {disableButton ? <ThreeDots color="white"/> : "Entrar"}
                </Button>
                <label htmlFor="checkbox">
                    <input onChange={(e) => setPersistentLogin(e.target.checked)} type="checkbox" id="checkbox"/>
                    <h2>Mantenha-me conectado</h2>
                </label>
            </form>
            <Link to="/cadastro">
                <p>N??o tem uma conta? Cadastre-se!</p>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 70px;
    width: 100%;
    min-height: 100vh;
    background-color: #FFFFFF;

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

    label {
        margin-top: 6px;
        display: flex;
        
        h2 {
            padding-left: 4px;
        }
    }
`;

const Input = styled.input`
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