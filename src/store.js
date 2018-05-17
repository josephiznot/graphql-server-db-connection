import { createStore } from "redux";
import productsReducer from "./ducks/productsReducer";

export default createStore(productsReducer);
