<template>
    <div>
        <div class="wrapper slideInLeft">
            <div id="formContent">
                <div class="fadeIn first">
                    <img src="@/assets/logo.png" id="icon" alt="User Icon" />
                </div>
                <h2>Iniciar Sesión</h2>
                <form @submit.prevent="Registrar">
                    <div class="container-fluid">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><font-awesome-icon icon="fa-solid fa-user" /></span>
                            <input v-model="name" type="text" class="form-control" placeholder="Usuario" aria-label="User"
                                aria-describedby="basic-addon1" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><font-awesome-icon icon="fa-solid fa-at" /></span>
                            <input v-model="email" type="email" class="form-control" placeholder="Email" aria-label="Email"
                                aria-describedby="basic-addon1" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><font-awesome-icon icon="fa-solid fa-key" /></span>
                            <input v-model="password" type="password" class="form-control" placeholder="Password"
                                aria-label="password" aria-describedby="basic-addon1" required>
                        </div>
                    </div>
                    <button type="submit" class="LoginButton btn btn-sm mb-3 mx-3">Registrar</button>
                </form>
                <div id="formFooter">
                    <router-link class="underlineHover" to="/login"><strong>Login</strong></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        };
    },
    methods: {
        async Registrar() {
            try {
                // Llamar al método de acción para registrar nuevo usuario
                let response = await this.$store.dispatch('registrarUsuario', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                console.log(response);
                if (response.status == 200) {
                    this.$alert.Alert('success', 'Éxito', 'El usuario ' + response.data.data.name + ' se registro satisfactoriamente.');
                    // Redirigir a la página de login después de un guardar el nuevo usuario exitosamente
                    this.$router.push('/login');
                }

            } catch (error) {
                // Maneja los errores
                if (error.name) {
                    this.$alert.Alert('error', 'Error', error.name[0]);
                }else if (error.email) {
                    this.$alert.Alert('error', 'Error', error.email[0]);
                    this.email = "";
                }else if (error.password) {
                    this.$alert.Alert('error', 'Error', error.password[0]);
                }else{
                    this.$alert.Alert('error', 'Error', 'Estimado usuario, en estos momentos no podemos procesar su solicitud, intente mas tarde');
                    console.error('Error al registrar usuario:', error.message);
                }
            }
        },
    },
};
</script>

<style scoped>
html {
    background-color: #56baed;
}

body {
    font-family: "Poppins", sans-serif;
    height: 100vh;
}

a {
    color: #92badd;
    display: inline-block;
    text-decoration: none;
    font-weight: 400;
}

/* STRUCTURE */

.wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 20px;
}

#formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 30px;
    width: 90%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
}

#formFooter {
    background-color: #f6f6f6;
    border-top: 1px solid #dce8f1;
    padding: 25px;
    text-align: center;
    -webkit-border-radius: 0 0 10px 10px;
    border-radius: 0 0 10px 10px;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }

    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
}

@keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }

    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
}

.slideInLeft {
    animation-name: slideInLeft;
    animation-duration: 1s;
    animation-fill-mode: both;
}

@keyframes slideInLeft {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-moz-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fadeIn {
    opacity: 0;
    -webkit-animation: fadeIn ease-in 1;
    -moz-animation: fadeIn ease-in 1;
    animation: fadeIn ease-in 1;

    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    animation-fill-mode: forwards;

    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    animation-duration: 1s;
}

.fadeIn.first {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.fadeIn.second {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    animation-delay: 0.6s;
}

.fadeIn.third {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    animation-delay: 0.8s;
}

.fadeIn.fourth {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: "";
    transition: width 0.2s;
}

.underlineHover:hover {
    color: #0d0d0d;
}

.underlineHover:hover:after {
    width: 100%;
}



/* OTHERS */

*:focus {
    outline: none;
}

#icon {
    width: 60%;
}

.LoginButton {
    background-color: #41b883;
    color: #35495e;
}
</style>