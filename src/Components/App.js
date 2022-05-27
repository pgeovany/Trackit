import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import Habits from "../Components/Habits/Habits";
import CurrentDay from "../Components/CurrentDay/CurrentDay";
import HabitsHistory from "../Components/HabitsHistory/HabitsHistory";
import UserContext from "./contexts/UserContext";

export default function App() {

    const [userInfo, setUserInfo] = useState(null);
    const [percentage, setPercentage] = useState(0);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{userInfo, setUserInfo, percentage, setPercentage}}>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/cadastro" element={<SignUp />}/>
                    <Route path="/habitos" element={<Habits />}/>
                    <Route path="/hoje" element={<CurrentDay />}/>
                    <Route path="/historico" element={<HabitsHistory />}/>
                </Routes>
                <Footer />
            </UserContext.Provider>
        </BrowserRouter>
    );
}