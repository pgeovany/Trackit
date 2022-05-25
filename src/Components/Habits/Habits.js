import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function Habits() {

    const {userInfo} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [click, setClick] = useState(false);
    console.log(userInfo);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then(answer => setHabits(answer.data));
    }, []);

    function genHabits () {
        if(habits.length !== 0) {
            <Container>
                <div>
                    <h1>Meus hábitos</h1>
                    <button>+</button>
                </div>
            </Container>
        }
        return (
            <Container>
                <div>
                    <h1>Meus hábitos</h1>
                    <Button onClick={() => setClick(true)}>+</Button>
                </div>
                {click ?
                    <NewHabit setClick={setClick}/> 
                    : 
                    null
                }
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </Container>
        )
    }


    return(
        <>
            {genHabits()}
        </>
    );
}

function NewHabit({setClick}) {
    return (
        <Form>
            <Input type="text" placeholder="nome do hábito"></Input>
            <div>
                <h2 onClick={() => setClick(false)}>Cancelar</h2>
                <FormButton disabled={true}>Salvar</FormButton>
            </div>
        </Form>
    );
}

const Container = styled.div`
    font-family: "Lexend", normal;
    padding: 90px 18px;
    background-color: #F2F2F2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }

    h1 {
        font-size: 22px;
        color: #126BA5;
    }

    p {
        font-size: 18px;
        color: #666666;
    }
`;

const Button = styled.button`
    font-family: "Lexend", normal;
    background-color: #52B6FF;
    font-size: 26px;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    width: 40px;
    height: 35px;

    &:hover {
        cursor:pointer;
    }
`;

const FormButton = styled(Button)`
    width: 84px;
    font-size: 16px;
    margin-left: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 18px 18px;
    margin-bottom: 20px;
    background-color: #ffffff;
    height: 180px;
    border-radius: 5px;
    div {
        justify-content: flex-end;
    }

    h2 {
        font-size: 16px;
        color: #52B6FF;
    }
`;

const Input = styled.input`
    font-family: "Lexend", sans-serif;
    background-color: "#F2F2F2";
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