<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { personOutline } from 'ionicons/icons'

import {
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCardHeader,
  IonButton,
  IonIcon,
  IonModal,
  IonCard,
  IonLabel,
  IonInput
} from '@ionic/vue'

import { useToken } from '@/stores'
import http from '@/libs/http'

const username = ref(0)
const password = ref(0)

function updateUsername(event: InputEvent) {
  username.value = event.target.value
}
function updatePassword(event: InputEvent) {
  password.value = event.target.value
}

const tokenStore = useToken()
const router = useRouter()
function returnToHome(): void {
  router.replace('/home')
}

async function logInRequest(): Promise<void> {
  const data = JSON.stringify({
    password: password.value,
    username: username.value
  })
  const response = await http.post('/login', data)
  const token = response.headers.authorization as string
  tokenStore.setToken(token)
  returnToHome()
}
</script>

<template>
  <ion-modal trigger="signup-ion-modal-trigger" keep-contents-mounted>
    <ion-card>
      <ion-card-header>
        <ion-card-title>注册</ion-card-title>
        <ion-card-subtitle>欢迎加入 MyGO</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <ion-input
          class="ion-margin-bottom"
          fill="outline"
          label="账号"
          label-placement="stacked"
          clearInput
          @input="updateUsername"
        />

        <ion-input
          class="ion-margin-bottom"
          type="password"
          fill="outline"
          label="密码"
          label-placement="stacked"
          clearInput
          @input="updatePassword"
        />

        <ion-button @click="logInRequest" id="loginpage-login-panel-button">
          <ion-icon :icon="personOutline" />
          <ion-label>注册</ion-label>
        </ion-button>
      </ion-card-content>
    </ion-card>
  </ion-modal>
</template>

<style scoped lang="less">
ion-modal {
  --width: fit-content;
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

#loginpage-login-panel-button {
  display: block;
  justify-content: center;
}
</style>
