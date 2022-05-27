import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import locale from "dayjs/locale/pt-br";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function CurrentDay() {

    const {userInfo, setPercentage, percentage} = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const [reload, setReload] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then(answer => {
            setTodayHabits(answer.data);
            calcHabitsDone(answer.data);
        })
        .catch(answer => console.log(answer.data.message));
    }, [reload]);

    function calcHabitsDone(habits) {
        let count = 0;
        habits.map(habit => {
            if(habit.done){
                count++;
            }
            return true;
        });
        const percentageOfHabitsDone = habits.length === 0 ? 0 : (count/habits.length)*100;
        setPercentage(percentageOfHabitsDone);
    }

    function toggleHabit(id, done) {
        if(!done) {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config);
            request.then(answer => {
                setReload(!reload);
            })
            .catch(() => alert("Erro ao concluir o hábito!"));
        } else {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);
            request.then(answer => {
                setReload(!reload);
            })
            .catch(() => alert("Erro ao desmarcar o hábito!"));
        }
        calcHabitsDone(todayHabits);
    }

    function genHabitList() {
        return(
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
        );
    }

    function genPageTitle() {
        const date = `${dayjs().date()}/0${dayjs().month()+1}`;
        let today = dayjs().locale("pt-br").format("dddd");

        //Removes "-"
        today = today.includes("-") ? today.slice(0, today.indexOf("-")) : today;

        //Capitalizes the first letter
        today = today.charAt(0).toUpperCase() + today.slice(1);

        return (
            <h1>{today}, {date}</h1>
        );
    }

    function genPageSubtitle() {
        if(percentage !== 0) {
            return (
                <h3>{percentage.toFixed()}% dos hábitos concluídos</h3>
            );
        } else {
            return (
                <p>Nenhum hábito concluído ainda</p>
            );
        }
    }

    return(
        <>
            <Container>
                {genPageTitle()}
                {genPageSubtitle()}
                {genHabitList()}
            </Container>
        </>
    );
}

function Habit({name, id, done, currentSequence, highestSequence, toggleHabit}) {
    
    const newRecord = (highestSequence) && (currentSequence === highestSequence);

    return (
        <HabitBox>
            <div>
                <h2>{name}</h2>
                <p>Sequencia atual: 
                    <DayInfo selected={done}> {currentSequence} {currentSequence === 0 || currentSequence > 1 ? "dias" : "dia"}</DayInfo>
                </p>
                <p>Seu recorde: 
                    <DayInfo selected={newRecord}> {highestSequence} {highestSequence === 0 || highestSequence > 1 ? "dias" : "dia"}</DayInfo>
                </p>
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
    height: 100%;
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

    h3 {
        margin-top: 6px;
        font-size: 18px;
        color: #8FC549;
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

const DayInfo = styled.span`
    color: ${props => props.selected ? "#8FC549" : "#666666"};
`;