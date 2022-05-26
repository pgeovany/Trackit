import ReactDOM from "react-dom";
import App from "./Components/App";
import GlobalCSS from "./Components/shared/global.css";

ReactDOM.render(
    <>
        <GlobalCSS />
        <App />
    </>, document.querySelector(".root")
);