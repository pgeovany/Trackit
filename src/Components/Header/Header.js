import { useLocation } from "react-router-dom";

export default function Header() {

    const location = useLocation().pathname;
    const render = location !== "/" && location !== "/cadastro" ? true : false;

    return(
        <>
            {render ? 
                <h1>Header</h1> 
                : 
                null
            }
        </>
    );
}