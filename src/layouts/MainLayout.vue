<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          {{ isAuthenticated ? user.email : "chat" }}
        </q-toolbar-title>

        <div>
          <q-btn color="negative" v-if="isAuthenticated" @click="salir"
            >Salir</q-btn
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useAuth } from "@vueuse/firebase";
import { auth,db } from "boot/firebase";

export default {
  name: "MainLayout",

  components: {},

  setup() {
    const { isAuthenticated, user } = useAuth(auth);
    const salir = async () => {
      try {
          await db.collection('usuarios').doc(user.value. uid).update({
                      
                       estado : false,
             
                   })
        await auth.signOut();
      
      } catch (error) {
        console.log(error);
      }
    };

    return {
      isAuthenticated,
      user,
      salir,
    };
  },
};
</script>
