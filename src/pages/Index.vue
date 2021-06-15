<template>
  <q-page padding>
    <VistaAcceso v-if="!isAuthenticated" />
    <div v-else>
      <VistaUsuariosActivos />
      <VistaChat />
    </div>
  </q-page>
</template>

<script>
import VistaAcceso from "../components/VistaAcceso";
import VistaChat from "../components/VistaChat";
import VistaUsuariosActivos from "../components/VistaUsuariosActivos";

import { useAuth } from "@vueuse/firebase";
import { ref, provide, watchEffect } from "vue";
import { auth } from "boot/firebase";

export default {
  components: {
    VistaAcceso,
    VistaChat,
    VistaUsuariosActivos,
  },
  setup() {
    const { user, isAuthenticated } = useAuth(auth);

    const selecUserChat = ref("");
    provide("selecUserChat", selecUserChat);

    watchEffect(() => {
      console.log("selecUserChat", selecUserChat.value);
    });

    return {
      user,
      isAuthenticated,
    };
  },
};
</script>