<template>
  <q-page padding>
    <VistaAcceso v-if="!isAuthenticated"/>
    <div v-else>
      <VistaUsuariosActivos />


    </div>
  </q-page>
</template>

<script>
import VistaAcceso from '../components/VistaAcceso.vue'
import VistaUsuariosActivos from '../components/VistaUsuariosActivos.vue'
import { useAuth } from '@vueuse/firebase';
import { auth } from "boot/firebase";

export default {
  components: {VistaAcceso,VistaUsuariosActivos},
  setup(){
    const {user, isAuthenticated} = useAuth(auth);

    return {
      isAuthenticated
    }
  }
  
}
</script>
