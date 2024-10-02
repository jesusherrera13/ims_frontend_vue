<script setup lang="ts">
import { ref, computed } from 'vue';
import { router } from '@/router';
//import Logo from '@/layouts/full/logo/LogoDark.vue';
/*Social icons*/
import { useUserStore } from '@/stores/apps/user/user';
const store = useUserStore();

const password = ref('123');
const password_confirmation = ref('123');
const checkbox = ref(false);
const valid = ref(true);
const show1 = ref(false);
const auth_error = ref(false);
const message = ref('');
const name = ref('Jesús Herrera');
const email = ref('jesusherrera13@gmail.com');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const employee_id = ref('');
const nameRules = ref([(v: string) => !!v || 'El nombre es requerido']);

const form = ref();
const myButtonElement = ref<HTMLButtonElement | null>(null);

const errors = computed(() => {
    return store.errors;
});

/* const message = computed(() => {
    return store.message;
}); */

/* const auth_error = computed(() => {
    return store.error;
}); */

const dialog = ref(false);
const dialog_register = ref(false);

const submitForm = () => {
    if (myButtonElement.value) {
        // Agregar una clase al botón
        myButtonElement.value.classList.add('btn-clicked');

        // Quitar el evento click del botón
        myButtonElement.value.removeEventListener('click', submitForm);
    }

    if (form.value.validate()) {
        if (password.value != '' && password_confirmation.value != '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            // const formData = [
            //     'name'=> fname.value,
            //     'email': email.value,
            //     'password': password.value,
            // ];

            store
                .saveUser({
                    email: email.value,
                    name: name.value,
                    password: password.value,
                    password_confirmation: password_confirmation.value
                })
                .then((response) => {
                    console.log(response);
                    if (response.success || response.status == 201) {
                        dialog_register.value = true;
                        message.value = 'El usuario ha sido registrado. En espera de autorización del Administrador';
                    } else {
                        auth_error.value = true;
                        message.value = response.message;
                    }
                    const currentUrl = window.location.origin;
                    // alert.value = store.alert;
                    // dialog_register.value = store.alert;
                    // console.log('errors: ', errors.value);
                    // window.location.href = currentUrl + '/usuarios';
                })
                .catch((error) => {
                    if (myButtonElement.value) {
                        myButtonElement.value.classList.remove('btn-clicked');
                        myButtonElement.value.addEventListener('click', submitForm);
                    }

                    // console.error('Error submitting form:', error.response.data);
                    alert('There was an error submitting the form.');
                });
        } else {
            console.log('datos invalidos');
        }

        // Aquí puedes manejar el envío del formulario, por ejemplo, llamando a una API
    } else {
        if (myButtonElement.value) {
            myButtonElement.value.classList.remove('btn-clicked');
            myButtonElement.value.addEventListener('click', submitForm);
        }
        alert('Form is not valid');
    }
};

const hola = () => {
    store.error = false;
    store.alert = false;
    store.message = '';
    router.push('/auth/login');
};
</script>
<template>
    <!-- <v-row class="d-flex mb-6">
        <v-col cols="6" sm="6" class="pr-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="google" height="20" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6" class="pl-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="facebook" width="25" height="30" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>FB
            </v-btn>
        </v-col>
    </v-row> -->
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">Registro</span>
        </div>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation action="/pages/boxedlogin" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Nombre</v-label>
        <VTextField v-model="name" :rules="nameRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Email</v-label>
        <VTextField v-model="email" :rules="emailRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Password</v-label>
        <VTextField
            v-model="password"
            :counter="10"
            :rules="passwordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
        ></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Confirm Password</v-label>
        <VTextField
            :counter="10"
            :rules="passwordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
            maxlength="10"
            v-model="password_confirmation"
        ></VTextField>
        <v-btn size="large" class="mt-2" color="primary" block submit flat @click="submitForm" ref="btn_registro" v-model="myButtonElement"
            >Registrar</v-btn
        >
        <div v-if="auth_error" class="mt-2">
            <v-alert color="error">{{ message }}</v-alert>
        </div>

        <v-dialog v-model="dialog_register" width="auto" persistent>
            <v-card max-width="400" prepend-icon="mdi-alert-circle" :text="message" title="Usuario registrado">
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Iniciar sesión" @click="hola"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<style>
.btn-clicked {
    background-color: rgb(207, 204, 204) !important;
}
</style>
