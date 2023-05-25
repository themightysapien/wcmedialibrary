import { createApp, defineCustomElement } from "vue";
import "./style.scss";
import App from "./App.vue";
import TsMediaLibrary from "./components/TsMediaLibrary.ce.vue";

const app = createApp({}); /* .mount('#app') */

app.config.compilerOptions.isCustomElement = (tag) => tag == "ts-medialibrary";
// app.mount("#app");

const CustomElement = defineCustomElement(TsMediaLibrary);

// register
customElements.define("ts-medialibrary", CustomElement);
