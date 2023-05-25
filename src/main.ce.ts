import { defineCustomElement } from 'vue'
import TsMediaLibraryComponnet from './components/TsMediaLibrary.ce.vue';
import "./style.scss";


const TsMediaLibrary = defineCustomElement(TsMediaLibraryComponnet)

customElements.define('ts-medialibrary', TsMediaLibrary)