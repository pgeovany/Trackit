import ReactDOM from "react-dom";
import App from "./Components/App";
import GlobalCSS from "./globalStyles";

ReactDOM.render(
    <>
        <GlobalCSS />
        <App />
    </>, document.querySelector(".root")
);