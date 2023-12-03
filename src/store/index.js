import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
	state: {
		user: null,
		token: null,
		API_BASE_URL: 'http://127.0.0.1:8000/api/' // esta url es de prueba se debe editar con respecto a la ip y puerto donde corra el api (127.0.0.1:8000)
	},
	//se captura el estado de user, token y API_BASE_URL para comprobar autenticación y hacer peticiones al api
	getters: {
		isAuthenticated: state => state.user !== null && state.token !== null,
		getApiBaseUrl: (state) => state.API_BASE_URL,
	},
	//los mutadores actualizan los estados para user, token y API_BASE_URL
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		clearUser(state) {
			state.user = null;
		},
		setToken(state, token) {
			state.token = token;
		},
		clearToken(state) {
			state.token = null;
		},
	},
	actions: {
		async login({ commit, state }, credentials) {
			try {
				// Solicitud POST para iniciar sesión
				const response = await axios.post(state.API_BASE_URL + 'usuarios/login', credentials);
				// Almacena el usuario y el token en el estado 	después de un inicio de sesión exitoso
				commit('setUser', response.data.user.name);
				commit('setToken', response.data.token);
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
			} catch (error) {
				// Maneja los errores, por ejemplo, mostrando un mensaje de error
				if (error.response) {
					// La solicitud fue realizada y el servidor respondió con un estado diferente de 2xx
					console.error('Error de respuesta:', error.response.status);
					console.log(error.response.data);  // Imprime la respuesta del servidor
				} else if (error.request) {
					// La solicitud se hizo pero no se recibió respuesta
					console.error('No se recibió respuesta del servidor');
				} else {
					// Algo sucedió en la configuración de la solicitud que desencadenó un error
					console.error('Error de configuración de la solicitud:', error.message);
					console.error(error);
				}
			}
		},
		async logout({ commit, state }) {
			try {
				// Verificación de token antes de hacer la petición de logout
				if (state.token) {

					// Realiza la petición de logout
					const response = await axios.get(state.API_BASE_URL + 'logout');
					if (response.status == 200) {
						// Limpia el usuario y el token en el estado después de cerrar sesión
						commit('clearUser');
						commit('clearToken');
						this.router.push('/login');
					}
				} else {
					console.log('no existe token ' + state.user + state.token);
				}

			} catch (error) {
				console.error('Error al cerrar sesión:', error.message);
			}
		},
		async getTareas({ state },Data) {
			if (state.token) {
				console.log(Data.params.page)
				try {
					// Realiza la petición para consultar las Tareas registradas
					return await axios.get(state.API_BASE_URL + 'tareas?page='+Data.params.page);
				} catch (error) {
					console.error('Error al consultar tareas:', error.message);
				}
			} else {
				console.log('Permiso denegado');
			}
		},
		async getTarea({ state }, Tarea) {
			if (state.token) {
				try {
					// Realiza la petición para consultar las Tareas registradas
				return await axios.get(state.API_BASE_URL + 'tareas/'+Tarea.tarea+'/edit');
				} catch (error) {
					console.error('Error al consultar tarea:', error.message);
				}
			} else {
				console.log('Permiso denegado');
			}
		},
		async registrarUsuario({ state }, userData) {
			try {
				// Realiza la petición para guardar un nuevo usuario
				return await axios.post(state.API_BASE_URL + 'usuarios', userData);
			} catch (error) {
				if (error.response.data.errors) {
					throw error.response.data.errors;
				} else {
					console.error('Error al guardar usuario:', error.message);
					throw error;
				}
			}
		},
		async registrarTarea({ state }, Data) {
			try {
				// Realiza la petición para guardar un nueva Tarea
				return await axios.post(state.API_BASE_URL + 'tareas', Data);
			} catch (error) {
				if (error.response.data.errors) {
					throw error.response.data.errors;
				} else {
					console.error('Error al guardar tarea:', error.message);
					throw error;
				}
			}
		},
		async editarTarea({ state }, Data) {
			try {
				// Realiza la petición para editar una Tarea
				return await axios.put(state.API_BASE_URL + 'tareas/'+Data.tarea, Data);
			} catch (error) {
				if (error.response.data.errors) {
					throw error.response.data.errors;
				} else {
					console.error('Error al editar tarea:', error.message);
					throw error;
				}
			}
		},
		async eliminarTarea({ state }, Data) {
			try {
				// Realiza la petición para eliminar una Tarea
				return await axios.delete(state.API_BASE_URL + 'tareas/'+Data.id);
			} catch (error) {
				console.error('Error al eliminar tarea:', error.message);
				throw error;
			}
		},
	},
	modules: {
	}
});
