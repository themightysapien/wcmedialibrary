import { defineCustomElement } from 'vue'
import TsMediaLibraryComponnet from './components/TsMediaLibrary.ce.vue';


const TsMediaLibrary = defineCustomElement(TsMediaLibraryComponnet);

customElements.define('ts-medialibrary', TsMediaLibrary)