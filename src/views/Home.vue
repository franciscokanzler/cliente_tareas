<template>
    <div class="home">
        <nav class="navbar navbar-expand-lg navbar-light navColorBackground">
            <div class="container-fluid">
                <img src="@/assets/logo.png" alt="" width="30" height="24" class="d-inline-block align-text-top me-3">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto ">
                        <span class="ml-3 mb-10">Bienvenido {{ name }}</span>
                    </ul>
                    <button @click="Logout" type="button" class="btn btn-sm vueButton">
                        Salir
                    </button>
                </div>
            </div>
        </nav>
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <Modal ref="tareaModal" @procesarPeticion="procesarPeticion" />
                    <button type="button" class="btn btn-sm mb-3 vueButton" data-bs-toggle="modal"
                        data-bs-target="#tareaModal" data-bs-whatever="@mdo" @click="prepararModal('registrar')">
                        Agregar nueva Tarea
                    </button>
                    <div class="container-fluid">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <!-- <th scope="col">#</th> -->
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Descripción</th>
                                        <th colspan="3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="tar, i in tareas" :key="tar.id">
                                        <!-- <td>{{ tar.id }}</td> -->
                                        <td>{{ tar.titulo }}</td>
                                        <td>{{ tar.descripcion }}</td>
                                        <td colspan="3" class="d-flex">
                                            <button type="button" class="btn  btn-sm mb-3 me-1 vueButton"
                                                data-bs-toggle="modal" data-bs-target="#tareaModal" data-bs-whatever="@mdo"
                                                @click="prepararModal('editar', tar.id)">
                                                <font-awesome-icon icon="fa-solid fa-pen" />
                                            </button>
                                            <button type="button" class="btn btn-success btn-sm mb-3 me-1"
                                                data-bs-toggle="modal" data-bs-target="#tareaModal" data-bs-whatever="@mdo"
                                                @click="prepararModal('ver', tar.id)">
                                                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                                            </button>
                                            <button @click="Eliminar(tar.id)" type="button"
                                                class="btn btn-danger btn-sm mb-3 ">
                                                <font-awesome-icon icon="fa-solid fa-trash" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link vueButton" v-on:click="changePage(page - 1)">Anterior</a></li>
                                <li class="page-item"><a class="page-link" >{{ page }}</a></li>
                                <li class="page-item"><a class="page-link" >de</a></li>
                                <li class="page-item"><a class="page-link" >{{ pages }}</a></li>
                                <li class="page-item"><a class="page-link vueButton" v-on:click="changePage(page + 1)">Siguiente</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Modal from '@/components/Modal.vue'

export default {
    name: 'Home',
    data() {
        return {
            tareas: [],
            name: this.$store.state.user,
            modo: 0,
            idTarea: null,
            page: 1,
            pages: 1
        }
    },
    async mounted() {
        this.cargarTareas();
    },
    async updated() {
        if (this.modo == 0) {
            this.idTarea = null
        }
    },
    components: {
        Modal
    },
    methods: {
        Logout() {
            // Llamar a la acción de logout en el store
            this.$store.dispatch('logout');
        },
        //esta función se encarga de preparar algunos parametros del modal para registrar, editar o ver, ya que el mismo es usado para las 3 funciones
        //a su vez se integra con el método montarModal() del componente hijo(Modal.vue) para adecuar el modal.
        prepararModal(tipo, tarea = "") {
            if (tipo == 'registrar') {
                this.modo = 0;
                this.$refs.tareaModal.montarModal(0);
            } else if (tipo == 'editar') {
                this.modo = 1;
                this.idTarea = tarea
                this.$refs.tareaModal.montarModal(1, tarea);
            } else if (tipo == 'ver') {
                this.modo = 2;
                this.idTarea = tarea
                this.$refs.tareaModal.montarModal(2, tarea);
            }
        },
        /* 
        esta función se encarga de guardar ó editar una tarea según el requerimiento operacion=0(registrar), operacion=1(editar)
        cabe acotar que esta función es activada por el componente hijo(Modal) cuando se le hace click al boton guardar mediante un emit
        */
        async procesarPeticion(datos) {
            try {
                if (datos.operacion == 0) {
                    // Llamar al método de acción para registrar nueva tarea
                    let response = await this.$store.dispatch('registrarTarea', {
                        titulo: datos.titulo,
                        descripcion: datos.descripcion,
                    });
                    console.log(response);
                    if (response.status == 200) {
                        this.cargarTareas();
                        this.$refs.tareaModal.cerrarModal();
                        this.$alert.Alert('success', 'Éxito', 'La tarea ' + response.data.data.titulo + ' se registro satisfactoriamente.');
                    }

                } else {
                    // Llamar al método de acción para editar tarea
                    let response = await this.$store.dispatch('editarTarea', {
                        tarea: datos.tarea,
                        titulo: datos.titulo,
                        descripcion: datos.descripcion,
                    });
                    console.log(response);
                    if (response.status == 200) {
                        this.cargarTareas();
                        this.$refs.tareaModal.cerrarModal();
                        this.$alert.Alert('success', 'Éxito', 'La tarea ' + response.data.data.titulo + ' se editó satisfactoriamente.');
                    }
                }

            } catch (error) {
                // Maneja los errores
                if (error.titulo) {
                    this.$alert.Alert('error', 'Error', error.titulo[0]);
                } else if (error.descripcion) {
                    this.$alert.Alert('error', 'Error', error.descripcion[0]);
                    this.email = "";
                } else {
                    this.$alert.Alert('error', 'Error', 'Estimado usuario, en estos momentos no podemos procesar su solicitud, intente mas tarde');
                    console.error('Error al procesar solicitud de tarea:', error.message);
                }
            }
        },
        async cargarTareas() {
            const params = {
                page: this.page
            }
            let response = await this.$store.dispatch('getTareas', { params });
            console.log(response);
            if (response.status == 200) {
                this.tareas = response.data.data.data;
                this.pages = response.data.data.last_page;
            } else {
                console.error('Error al cargar tareas');
            }
        },
        async Eliminar(id) {
            await this.$store.dispatch('eliminarTarea', {
                id: id,
            }).then(
                response => {
                    this.cargarTareas();
                    this.$alert.Alert('success', 'Éxito', 'La tarea ' + response.data.data.titulo + ' se eliminó satisfactoriamente.');
                }
            ).catch((errors) => {
                this.$alert.Alert('error', 'Error', 'Estimado usuario, en estos momentos no podemos procesar su solicitud, intente mas tarde');
            });
        },
        //este método se encarga de la paginación de la tabla
        changePage(page) {
            console.log(page);
            this.page = page <= 0 || page > this.pages ? this.page : page;
            this.cargarTareas();
        }
    },
}
</script>

<style scoped>
.navColorBackground {
    background-color: #d3fff0;
    ;
}

.vueButton {
    background-color: #8ce8bf;
    color: #49627b;
    text-decoration: none;
}
</style>
  