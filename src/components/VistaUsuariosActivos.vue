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
        v-for="user in users"
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
import { ref } from "vue";
import { db } from "boot/firebase";

export default {
  setup() {
    const uidSeleccionado = ref("mails");
    const users = ref([]);

    db.collection("usuarios").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("Usuario nuevo: ", change.doc.data());
          users.value = [...users.value, change.doc.data()];
          users.value = users.value.sort((a,b)=> b.estado - a.estado)
        }
        if (change.type === "modified") {
          console.log("Usuario Modificado: ", change.doc.data());
          users.value = users.value.map((user) =>
            user.uid === change.doc.data().uid
              ? { ...user, estado: change.doc.data().estado }
              : user
          );
        }
        if (change.type === "removed") {
          console.log("Usuario Removido: ", change.doc.data());
        }
      });
    });

    return {
      uidSeleccionado,
      users,
    };
  },
};
</script>
