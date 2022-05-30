import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import AddHabit from "./AddHabit";
import styled from "styled-components";

export default function Habits() {

    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const {userInfo} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [openNewHabitForm, setOpenNewHabitForm] = useState(false);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then(answer => setHabits(answer.data));
    }, [userInfo.token]);

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
            setHabits(habits.filter(item => item.id !== id));
        }).catch(() => alert("Erro ao deletar o hábito!"));
    }

    function genHabitsList () {
        if(habits.length !== 0) {
            return (
                <Container>
                    <Header>
                        <h1>Meus hábitos</h1>
                        <Button onClick={() => setOpenNewHabitForm(true)}>+</Button>
                    </Header>
                    <AddHabit 
                        userInfo={userInfo} 
                        setHabits={setHabits} 
                        habits={habits} 
                        setOpenNewHabitForm={setOpenNewHabitForm}
                        openNewHabitForm={openNewHabitForm}
                        weekDays={weekDays}
                    />
                    {habits.map(habit => <UserHabit key={habit.id} deleteHabit={deleteHabit} id={habit.id} name={habit.name} days={habit.days} weekDays={weekDays}/>)}
                </Container>
            );
        }
        return (
            <Container>
                <Header>
                    <h1>Meus hábitos</h1>
                    <Button onClick={() => setOpenNewHabitForm(true)}>+</Button>
                </Header>
                <AddHabit 
                        userInfo={userInfo} 
                        setHabits={setHabits} 
                        habits={habits} 
                        setOpenNewHabitForm={setOpenNewHabitForm}
                        openNewHabitForm={openNewHabitForm}
                        weekDays={weekDays}
                />
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </Container>
        )
    }

    return(
        <>
            {genHabitsList()}
        </>
    );
}

function UserHabit({id, name, days, weekDays, deleteHabit}) {
    return (
        <HabitContainer>
            <ion-icon onClick={() => deleteHabit(id)} name="trash-outline"></ion-icon>
            <h4>{name}</h4>
            <Days>
                {weekDays.map((day, index) => <Day selectedDays={days} key={index} id={index} name={day} />)}
            </Days>
        </HabitContainer>
    );
}

function Day({id, name, selectedDays}) {

    const isSelected = selectedDays.some(item => item === id);

    return (
       <CheckBox selected={isSelected}>
           {name}
       </CheckBox>
    );
}

const HabitContainer = styled.div`
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
        padding-bottom: 8px;
    }

    ion-icon {
        position: absolute;
        right: 14px;
        top: 14px;
        font-size: 20px;
    }
`;

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    margin: 70px 0;
    padding: 30px 18px;
    display: flex;
    flex-direction: column;
    position: relative;

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
