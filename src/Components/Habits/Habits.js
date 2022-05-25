import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function Habits() {

    const {userInfo} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [click, setClick] = useState(false);
    const [habitDays, setHabitDays] = useState([]);
    const days = [{id: 1, name: "D"}, {id: 2, name: "S"}, {id: 3, name: "T"}, 
        {id: 4, name: "Q"}, {id: 5, name: "Q"}, {id: 6, name: "S"}, {id: 7, name: "S"}];

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then(answer => setHabits(answer.data));
    }, [userInfo.token]);

    function selectDay(id) {
        if(habitDays.length !== 0 && habitDays.some(dayID => dayID === id)) {
            setHabitDays(habitDays.filter(itemID => itemID !== id));
        } else {
            setHabitDays([...habitDays, id]);
        }
    }

    function genHabits () {
        if(habits.length !== 0) {
            <Container>
                <Header>
                    <h1>Meus hábitos</h1>
                    <button>+</button>
                </Header>
            </Container>
        }
        return (
            <Container>
                <Header>
                    <h1>Meus hábitos</h1>
                    <Button onClick={() => setClick(true)}>+</Button>
                </Header>
                {click ?
                    <Form>
                        <Input type="text" placeholder="nome do hábito"></Input>
                        <Days>
                            {days.map(day => <Day selectedDays={habitDays} selectDay={selectDay} key={day.id} id={day.id} name={day.name} />)}
                        </Days>
                        <Buttons>
                            <h2 onClick={() => setClick(false)}>Cancelar</h2>
                            <FormButton disabled={true}>Salvar</FormButton>
                        </Buttons>
                    </Form> 
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

function Day({id, name, selectDay, selectedDays}) {

    const isSelected = selectedDays.some(item => item === id);

    return (
       <CheckBox onClick={() => selectDay(id)} selected={isSelected}>
           {name}
       </CheckBox>
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

    h1 {
        font-size: 22px;
        color: #126BA5;
    }

    p {
        margin-top: 30px;
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
    margin-top: 20px;
    background-color: #ffffff;
    height: 180px;
    border-radius: 5px;

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

const Days = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CheckBox = styled.div`
    width: 30px;
    height: 30px;
    color: ${props => props.selected ? "#FFFFFF" : "#DBDBDB"};
    background-color: ${props => props.selected ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid ${props => props.selected ? "#CFCFCF" : "#D4D4D4"};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-right: 6px;
`;

const Buttons = styled.div`
    justify-content: flex-end;
    display: flex;
    align-items: center;
`;