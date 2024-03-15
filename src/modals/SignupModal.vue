<script setup lang="ts">
import { ref, type Ref } from 'vue'
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

const usernameIonInput = ref()
function signupIonModalDidPresent() {
  usernameIonInput.value.$el.setFocus()
}

const username: Ref<string> = ref('')
const password: Ref<string> = ref('')
const tokenStore = useToken()
async function signupIonButtonClick(): Promise<void> {
  const data = JSON.stringify({
    password: password.value,
    username: username.value
  })
  const response = await http.post('/login', data)
  const token = response.headers.authorization as string
  tokenStore.setToken(token)
  // returnToHome()
}
</script>

<template>
  <ion-modal trigger="signup-ion-modal-trigger" keep-contents-mounted @didPresent="signupIonModalDidPresent">
    <ion-card>
      <ion-card-header>
        <ion-card-title>注册</ion-card-title>
        <ion-card-subtitle>欢迎加入 MyGO</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <ion-input
          ref="usernameIonInput"
          class="ion-margin-bottom"
          v-model="username"
          fill="outline"
          label="账号"
          label-placement="stacked"
          clearInput
        />

        <ion-input
          class="ion-margin-bottom"
          v-model="password"
          type="password"
          fill="outline"
          label="密码"
          label-placement="stacked"
          clearInput
        />

        <ion-button class="signup-ion-button ion-justify-content-center" fill="clear" @click="signupIonButtonClick">
          <ion-icon :icon="personOutline" />
          <ion-label>注册</ion-label>
        </ion-button>
      </ion-card-content>
    </ion-card>
  </ion-modal>
</template>

<style scoped lang="less">
.signup-ion-button {
  display: block;
}
</style>
