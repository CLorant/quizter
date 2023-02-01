import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

$(document).ready(function(){
	$('#navbar-icon').click(function(){
		$(this).toggleClass('open');
	});
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')