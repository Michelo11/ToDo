import { createApp } from 'vue'
import App from './App.vue'
import Toaster from "@meforma/vue-toaster";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './index.css'

library.add(faTrashCan)

const app = createApp(App)

app.use(Toaster)
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
