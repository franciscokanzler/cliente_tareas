<template>
    <div ref="miModal" class="modal fade" id="tareaModal" tabindex="-1" aria-labelledby="tareaModalLabel" aria-hidden="true"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tareaModalLabel">
                        {{ modo === 0 ? 'Nueva Tarea' : modo === 1 ? 'Editar Tarea' : 'Ver Tarea' }}
                    </h5>
                    <button ref="Close" type="button" class="btn-close" hidden data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <form @submit.prevent="Procesar">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="recipient-name" class="form-label d-flex">Titulo:</label>
                            <input v-model="titulo" type="text" class="form-control" id="recipient-name" required :readonly="modo === 2">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="form-label d-flex">Descripcion:</label>
                            <textarea v-model="descripcion" class="form-control" id="message-text" required :readonly="modo === 2"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()">cerrar</button>
                        <button type="submit" class="btn vueButton" :hidden="modo === 2">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { guardReactiveProps } from 'vue';

export default {
    data() {
        return {
            titulo: '',
            descripcion: '',
            modo: '',
            tarea: ''
        };
    },
    methods: {
        /* Despues de hacer click en el boton guardar este método hace el emit para que el componente padre(Homw.vue) procese la petición */
        async Procesar() {
            this.$emit('procesarPeticion', {
                titulo: this.titulo,
                descripcion: this.descripcion,
                operacion: this.modo,
                tarea: this.tarea
            });
        },
        //Este método llena el modal con los datos a editar o ver
        async cargarTarea(tarea) {
            await this.$store.dispatch('getTarea', {
                tarea: tarea,
            }).then(
                response => {
                    this.titulo = response.data.data.titulo,
                    this.descripcion = response.data.data.descripcion
                }
            ).catch((errors) => {
                this.$alert.Alert('error', 'Error', 'Estimado usuario, en estos momentos no podemos procesar su solicitud, intente mas tarde');
            });
        },
        //método utilizado para junto a prepararModal() del componente padre(Home.vue) para adecuar el modal a crear, editar o ver tareas
        async montarModal(tipo,tarea = '') {
            if (tipo == 1 || tipo == 2) {
                this.modo = tipo;
                this.tarea = tarea;
                this.cargarTarea(tarea);
            } else {
                this.modo = tipo;
                this.tarea = '';
                this.titulo = '';
                this.descripcion = '';
            }
        },
        async cerrarModal() {
            this.$refs.Close.click();

            this.titulo = '';
            this.descripcion = '';
        },
    },
};
</script>

<style scoped>
.vueButton {
    background-color: #8ce8bf;
    color: #49627b;
    text-decoration: none;
}
</style>