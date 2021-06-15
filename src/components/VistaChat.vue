<template>
  <div ref="RefChat" v-if="selecUserChat !== ''" class="q-mt-xl">
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 600px">
        <q-chat-message
          v-for="chat in chats"
          :key="chat.id"
          :name="chat.user"
          :text="[chat.texto]"
          :sent="chat.uid === user.uid"
        />
      </div>
    </div>

    <q-footer>
      <q-form @submit.prevent="enviarMensaje">
        <q-toolbar class="bg-primary text-white row">
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-input
            v-model="message"
            class="col-grow q-mr-sm"
            bg-color="white"
            placeholder="Type a message"
            dense
            outlined
            rounded
            autofocus
            ref="inputFocus"
          />
          <q-btn round flat icon="send" type="submit" />
        </q-toolbar>
      </q-form>
    </q-footer>
  </div>
  <div v-else class="flex flex-center q-mt-xl q-pt-xl">
    <h6>Selecciona un usuario para el chat</h6>
  </div>
</template>

<script>
import { ref, inject, watch } from "vue";
import { useAuth } from "@vueuse/firebase";
import { db, marcaTiempo } from "boot/firebase";
import { auth } from "boot/firebase";

export default {
  setup() {
    const message = ref("");
    const inputFocus = ref(null);
    const { user } = useAuth(auth);
    const selecUserChat = inject("selecUserChat");
    const chats = ref([]);
    const RefChat = ref(null);

    let unsubscribe;

    const obtenerData = (idParams) => {
      chats.value = [];
      unsubscribe = db
        .collection("chat")
        .doc(user.value.uid)
        .collection(idParams)
        .orderBy("fecha")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              chats.value.push({ ...change.doc.data(), id: change.doc.id });
            }
            if (RefChat.value !== null) {
              setTimeout(() => {
                window.scrollTo(0, RefChat.value.scrollHeight);
              }, 60);
            }
          });
        });
    };

    watch(
      () => selecUserChat.value,
      (newId) => {
        if (unsubscribe) {
          unsubscribe();
          if (newId) {
            obtenerData(newId);
          }
        } else {
          obtenerData(newId);
        }
        console.log("watch");
        console.log("newId", newId);
      }
    );

    const enviarMensaje = async () => {
      try {
        const objetoMensaje = {
          user: user.value.email,
          texto: message.value,
          fecha: marcaTiempo(),
          uid: user.value.uid,
        };
        await db
          .collection("chat")
          .doc(user.value.uid)
          .collection(selecUserChat.value)
          .add(objetoMensaje);
        await db
          .collection("chat")
          .doc(selecUserChat.value)
          .collection(user.value.uid)
          .add(objetoMensaje);
        message.value = "";
        inputFocus.value.focus();
      } catch (error) {
        console.log(error);
      }
    };

    return {
      enviarMensaje,
      message,
      inputFocus,
      chats,
      RefChat,
      user,
      selecUserChat,
    };
  },
};
</script>