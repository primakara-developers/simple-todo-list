import "./style/style.scss";
import { accesStorage, getData, removeData, addData } from "./logic.js";

window.addData = addData;
window.removeData = removeData;

if (accesStorage("GET") === null) accesStorage("SET", []);
getData();
