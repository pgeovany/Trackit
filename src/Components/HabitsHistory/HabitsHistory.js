import styled from "styled-components";

export default function HabitsHistory() {
    return(
        <>
            <Container>
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </Container>
        </>
    );
}

const Container = styled.div`
    font-family: "Lexend", sans-serif;
    padding: 100px 0;
    padding-left: 16px;
    background-color: #E5E5E5;
    width: 100%;
    height: 100%;

    h1 {
        font-size: 22px;
        color: #126BA5;
        padding-bottom: 18px;
    }

    p {
        font-size: 18px;
        color: #666666;
    }
`;