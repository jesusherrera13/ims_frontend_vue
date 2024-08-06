<script setup lang="ts">
import { ref } from 'vue';
//import Logo from '@/layouts/full/logo/LogoDark.vue';
/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';
import { useUserStore } from '@/stores/apps/user/user';
const store = useUserStore();

const password = ref('');
const password_confirmation = ref('');
const checkbox = ref(false);
const valid = ref(true);
const show1 = ref(false);
const rfc = ref('');
const email = ref('');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const employee_id = ref('');
const employeeIdRules = ref([(v: string) => !!v || 'El número de empleado es requiredo']);

const form = ref();
const myButtonElement = ref<HTMLButtonElement | null>(null);

const submitForm = () => {
    if (myButtonElement.value) {
        // Agregar una clase al botón
        myButtonElement.value.classList.add('btn-clicked');

        // Quitar el evento click del botón
        myButtonElement.value.removeEventListener('click', submitForm);
    }

    if (form.value.validate()) {
        if (employee_id.value != '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) && rfc.value != '') {
            // const formData = [
            //     'name'=> fname.value,
            //     'email': email.value,
            //     'password': password.value,
            // ];

            store
                .saveUser({
                    employee_id: employee_id.value,
                    email: email.value,
                    rfc: rfc.value,
                    password: password.value,
                    password_confirmation: password_confirmation.value
                })
                .then((response) => {
                    const currentUrl = window.location.origin;
                    // window.location.href = currentUrl + '/usuarios';
                })
                .catch((error) => {
                    if (myButtonElement.value) {
                        myButtonElement.value.classList.remove('btn-clicked');
                        myButtonElement.value.addEventListener('click', submitForm);
                    }

                    console.error('Error submitting form:', error.response.data);
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
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Número de empleado</v-label>
        <VTextField v-model="employee_id" :rules="employeeIdRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">RFC</v-label>
        <VTextField v-model="rfc" :rules="rfcRules" required></VTextField>
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
    </v-form>
</template>

<style>
.btn-clicked {
    background-color: rgb(207, 204, 204) !important;
}
</style>
