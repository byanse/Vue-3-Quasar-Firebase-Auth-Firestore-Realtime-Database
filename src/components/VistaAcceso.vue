<template>
    <div class="q-px-xl"> 
        <h5>Formulario de {{ acceder ? 'Login': 'Registro'}}</h5>
       
        <q-form class="q-gutter-md" @submit.prevent="procesarFormulario">
            <q-input
            label ="Email"
            v-model="email"
            />
            
            <q-input
            label ="Password"
            v-model="password"
            />

            <q-btn
            :label="acceder ? 'Login' : 'Registro'"
            type="submit"
            color="primary"
            />
            
            <q-btn 
            color="primary"
            outline v-if="!acceder"
            @click="acceder=true"
            > ¿Ya tienes cuenta?</q-btn>

            <q-btn 
            color="negative"
            outline
            v-else
            @click="acceder=false"
            > ¿no tienes cuenta?</q-btn>

        

        </q-form>
    </div>
</template>

<script>
import {ref} from 'vue'
import {auth} from 'boot/firebase'
import {useAuth} from '@vueuse/firebase'
export default {
    setup(){
        const email = ref('')
        const password = ref('')
        const acceder = ref(true)

        const {isAuthenticated,user} = useAuth(auth)

        const procesarFormulario = async() => {
            if(!email.value.trim() || !password.value.trim()) {
                console.log("campos vacios");
                return;
            }
            try {
                if(!acceder.value){
                    //registrar
                   const usuario = await auth.createUserWithEmailAndPassword(email.value, password.value)
                   console.log(usuario.user)
                }else{
                    
                    //login
                    const usuario = await auth.signInWithEmailAndPassword(email.value, password.value)
                    console.log(usuario.user)
                }
                
                email.value = ""
                password.value=""

            }catch (error){
                console.log(error)
            }
        }
        
        return {
            email,
            password,
            procesarFormulario,
            acceder,
            isAuthenticated,
            user
        }
    },
}
</script>
