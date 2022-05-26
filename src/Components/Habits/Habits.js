import { useContext, useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function Habits() {

    const {userInfo} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [click, setClick] = useState(false);
    const [habitDays, setHabitDays] = useState([]);
    const [habitName, setHabitName] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    const weekDays = [{id: 1, name: "D"}, {id: 2, name: "S"}, {id: 3, name: "T"}, 
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

    function clearForm() {
        setHabitName("");
        setHabitDays([]);
        setClick(false);
    }

    function createHabit(e) {
        e.preventDefault();
        if(habitDays.length === 0) {
            alert("Selecione pelo menos um dia!");
            return;
        }
        setDisableButton(true);
        const body = {
            name: habitName,
            days: habitDays
        }

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
        request.then(answer => {
            setHabits([...habits, answer.data]);
            clearForm();
            setDisableButton(false);
        });
        request.catch(answer => {
            alert("Erro ao salvar o hábito!");
            setDisableButton(false);
        });
    }

    function deleteHabit(id) {
        if(!window.confirm("Você realmente deseja deletar esse hábito?")) {
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
        promise.then(answer => {
            console.log(answer);
            setHabits(habits.filter(item => item.id !== id));
        }).catch(() => alert("Erro ao deletar o hábito!"));
    }

    function newHabitForm () {
        if(click) {
            return (
                <Form onSubmit={createHabit}>
                    <Input required disabled={disableButton} type="text" placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitName(e.target.value)}/>
                    <Days>
                        {weekDays.map(day => <Day disableButton={disableButton} selectedDays={habitDays} selectDay={selectDay} key={day.id} id={day.id} name={day.name} />)}
                    </Days>
                    <Buttons>
                        <h2 onClick={() => setClick(false)}>Cancelar</h2>
                        <FormButton disabled={disableButton} type="submit">
                            {disableButton ? <ThreeDots color="white" width={"50px"} /> : "Enviar"}
                        </FormButton>
                    </Buttons>
                </Form> 
            );
        } else {
            return null;
        }
    }

    function genHabits () {
        if(habits.length !== 0) {
            return (
                <Container>
                    <Header>
                        <h1>Meus hábitos</h1>
                        <Button onClick={() => setClick(true)}>+</Button>
                    </Header>
                    {newHabitForm()}
                    {habits.map(item => <UserHabit key={item.id} deleteHabit={deleteHabit} id={item.id} name={item.name} days={item.days} weekDays={weekDays}/>)}
                </Container>
            );
        }
        return (
            <Container>
                <Header>
                    <h1>Meus hábitos</h1>
                    <Button onClick={() => setClick(true)}>+</Button>
                </Header>
                {newHabitForm()}
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

function UserHabit({id, name, days, weekDays, deleteHabit}) {
    return (
        <HabitsList>
            <ion-icon onClick={() => deleteHabit(id)} name="trash-outline"></ion-icon>
            <h4>{name}</h4>
            <Days>
                {weekDays.map(day => <DayHabbit selectedDays={days} key={day.id} id={day.id} name={day.name} />)}
            </Days>
        </HabitsList>
    );
}

function DayHabbit({id, name, selectedDays}) {

    const isSelected = selectedDays.some(item => item === id);

    return (
       <CheckBox selected={isSelected}>
           {name}
       </CheckBox>
    );
}

function Day({id, name, selectDay, selectedDays, disableButton}) {

    const isSelected = selectedDays.some(item => item === id);

    return (
       <CheckBox type="button" disabled={disableButton} onClick={() => selectDay(id)} selected={isSelected}>
           {name}
       </CheckBox>
    );
}

const HabitsList = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 18px 18px;
    margin-top: 20px;
    background-color: #ffffff;
    height: 90px;
    border-radius: 5px;

    h4 {
        font-size: 20px;
        color: #666666;
        margin-bottom: 8px;
    }

    ion-icon {
        position: absolute;
        right: 14px;
        top: 14px;
        font-size: 20px;
    }
`;

const Container = styled.div`
    margin: 70px 0;
    padding: 30px 18px;
    background-color: #F2F2F2;
    width: 100%;
    height: 100vh;
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
    background-color: ${props => props.disabled ? "#86CCFF" : "#52B6FF"};
    font-size: 26px;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    width: 40px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;

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
        color: #68BFFF;
    }
`;

const Input = styled.input`
    font-family: "Lexend", sans-serif;
    background-color: ${props => props.disabled ? "#F2F2F2" : "#FFFFFF"};
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

const CheckBox = styled.button`
    width: 30px;
    height: 30px;
    font-size: 18px;
    color: ${props => props.selected ? "#FFFFFF" : "#DBDBDB"};
    background-color: ${props => props.selected ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid ${props => props.selected ? "#CFCFCF" : "#D4D4D4"};
    border-radius: 5px;
    text-align: center;
    margin-right: 6px;
`;

const Buttons = styled.div`
    justify-content: flex-end;
    display: flex;
    align-items: center;
`;