import { mount } from "svelte";
import "./styles/global.css";
import App from "./App.svelte";

const app = mount(App, {
    target: document.getElementById("app")!, // 非空斷言：假設一定有這個 element
});

export default app;
