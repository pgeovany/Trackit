import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function CurrentDay() {

    const {userInfo} = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then(answer => {
            console.log(answer.data);
            setTodayHabits(answer.data);
        })
        .catch(answer => console.log(answer.data.message));
    }, [reload]);

    function toggleHabit(id, done) {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${userInfo.token}`
        //     }
        // }
        // if(!done) {
        //     const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, config);
        //     request.then(answer => {
        //         console.log(answer);
        //         setReload(!reload);
        //     })
        //     .catch(() => alert("Erro concluir hábito!"));
        // }
        return;
    }

    return(
        <>
            <Container>
                <h1>Dia atual DD/MM</h1>
                <p>Nenhum hábito concluído ainda</p>
                <HabitsContainer>
                    {todayHabits.map(habit => <Habit 
                                                key={habit.id}
                                                name={habit.name}
                                                id={habit.id}
                                                done={habit.done}
                                                currentSequence={habit.currentSequence}
                                                highestSequence={habit.highestSequence}
                                                toggleHabit={toggleHabit}
                                                />)
                    }
                </HabitsContainer>
            </Container>
        </>
    );
}

function Habit({name, id, done, currentSequence, highestSequence, toggleHabit}) {
    return (
        <HabitBox>
            <div>
                <h2>{name}</h2>
                <p>Sequencia atual: {currentSequence} {currentSequence ===0 || currentSequence > 1 ? "dias" : "dia"}</p>
                <p>Seu recorde: {highestSequence} {highestSequence ===0 || highestSequence > 1 ? "dias" : "dia"}</p>
            </div>
            <CheckButton selected={done} onClick={() => toggleHabit(id, done)}>
                <ion-icon name="checkmark-sharp"></ion-icon>
            </CheckButton>
        </HabitBox>
    );
}

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
        margin-top: 6px;
        font-size: 18px;
        color: #BABABA;
    }
`;

const HabitBox = styled.div`
    height: 94px;
    width: 100%;
    padding: 12px 14px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    border-radius: 5px;

    div {
        display: flex;
        flex-direction: column;
    }

    h2 {
        font-size: 20px;
        color: #666666;
    }

    p {
        font-size: 14px;
        color: #666666;
    }
`;

const HabitsContainer = styled.div`
    margin-top: 30px;
`;

const CheckButton = styled.button`
    height: 68px;
    width: 68px;
    background-color: ${props => props.selected ? "#8FC549" : "#EBEBEB"};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    ion-icon {
        color: white;
        font-size: 40px;
    }
`;