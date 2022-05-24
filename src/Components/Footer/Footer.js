import { useLocation } from "react-router-dom";

export default function Footer() {

    const location = useLocation().pathname;
    const render = location !== "/" && location !== "/cadastro" ? true : false;

    return(
        <>
            {render ?
                <h1>Footer</h1>
                :
                null
            }
        </>
    );
}