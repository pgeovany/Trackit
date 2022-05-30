import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";

export default function AddHabit({userInfo, setHabits, habits, setOpenNewHabitForm, openNewHabitForm, weekDays}) {

    const [habitDays, setHabitDays] = useState([]);
    const [habitName, setHabitName] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    function selectDay(id) {
        if(habitDays.length !== 0 && habitDays.some(dayID => dayID === id)) {
            setHabitDays(habitDays.filter(itemID => itemID !== id));
        } else {
            setHabitDays([...habitDays, id]);
        }
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
            setHabitName("");
            setHabitDays([]);
            setOpenNewHabitForm(false);
            setDisableButton(false);
        });
        request.catch(answer => {
            alert("Erro ao salvar o hábito!");
            setDisableButton(false);
        });
    }

    function genNewHabitForm () {
        if(openNewHabitForm) {
            return (
                <Form onSubmit={createHabit}>
                    <Input required disabled={disableButton} type="text" placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitName(e.target.value)}/>
                    <DaysContainer>
                        {weekDays.map((day, index) => <Day disableButton={disableButton} selectedDays={habitDays} selectDay={selectDay} key={index} id={index} name={day} />)}
                    </DaysContainer>
                    <FormButtons>
                        <h2 onClick={() => setOpenNewHabitForm(false)}>Cancelar</h2>
                        <SubmitButton disabled={disableButton} type="submit">
                            {disableButton ? <ThreeDots color="white" width={"50px"} /> : "Enviar"}
                        </SubmitButton>
                    </FormButtons>
                </Form> 
            );
        } else {
            return null;
        }
    }

    return (
        <>
            {genNewHabitForm()}
        </>
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

const SubmitButton = styled.button`
    width: 84px;
    font-size: 16px;
    margin-left: 20px;
    background-color: ${props => props.disabled ? "#86CCFF" : "#52B6FF"};
    color: #ffffff;
    border: none;
    border-radius: 5px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor:pointer;
    }
`;

const Input = styled.input`
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

const DaysContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 20px;
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

    &:hover{
        cursor: pointer;
    }
`;

const FormButtons = styled.div`
    justify-content: flex-end;
    display: flex;
    align-items: center;

    h2 {
        cursor: pointer;
    }
`;