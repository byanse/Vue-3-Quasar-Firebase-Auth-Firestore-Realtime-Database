<template>
  <q-page-sticky position="top" expand>
    <q-tabs
      v-model="uidSeleccionado"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-primary text-white shadow-2 full-width"
    >
      <q-tab
        v-for="user in arraySinUser"
        :key="user.uid"
        :name="user.uid"
        icon="account_circle"
        :label="user.email"
        :class="user.estado ? 'text-white' : 'text-grey'"
      />
    </q-tabs>
  </q-page-sticky>
</template>

<script>
import { ref, computed, inject } from "vue";
import { auth, db } from "boot/firebase";
import { useAuth } from "@vueuse/firebase";

export default {
  setup() {
    const uidSeleccionado = inject('selecUserChat');
    const users = ref([]);
    const { user } = useAuth(auth);

    db.collection("usuarios").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("Usuario nuevo: ", change.doc.data());
          users.value = [...users.value, change.doc.data()];
          users.value = users.value.sort((a, b) => b.estado - a.estado);
        }
        if (change.type === "modified") {
          console.log("Usuario Modificado: ", change.doc.data());
          users.value = users.value.map((user) =>
            user.uid === change.doc.data().uid
              ? { ...user, estado: change.doc.data().estado }
              : user
          );
          users.value = users.value.sort((a, b) => b.estado - a.estado);
        }
        if (change.type === "removed") {
          users.value = [...users.value, change.doc.data()];
          users.value = users.value.sort((a, b) => b.estado - a.estado);
        }
      });
    });

    const arraySinUser = computed(() => {
      return users.value.filter((item) => item.uid !== user.value.uid);
    });
    return {
      uidSeleccionado,
      arraySinUser,
    };
  },
};
</script>

<style scoped>
.tabs-zindex{
  z-index: 2000;
}
</style>