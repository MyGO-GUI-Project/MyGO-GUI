<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonModal, IonCard, IonLabel, IonInput } from '@ionic/vue'
import { logIn } from 'ionicons/icons'
import { ref } from 'vue'
import http from '@/libs/http'
import { useToken } from '@/stores'
import { useRouter } from 'vue-router'

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
  <ion-modal trigger="login-ion-modal-trigger" keep-contents-mounted>
    <ion-card class="loginpage-login-panel">
      <ion-item class="loginpage-login-panel-label">
        <ion-label>账号名</ion-label>
      </ion-item>
      <ion-item class="loginpage-login-panel-input">
        <ion-input @input="updateUsername" />
      </ion-item>
      <ion-item class="loginpage-login-panel-label">
        <ion-label>密码</ion-label>
      </ion-item>
      <ion-item class="loginpage-login-panel-input">
        <ion-input @input="updatePassword" type="password" />
      </ion-item>

      <ion-button @click="logInRequest" id="loginpage-login-panel-button">
        <ion-icon :icon="logIn" />
        <ion-label>登录</ion-label>
      </ion-button>
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

.loginpage-login-panel {
  left: 20%;
  width: 60%;
  top: 20%;
  padding: 5%;
}
.loginpage-login-panel-input {
  border-bottom: 2px;
  border-bottom-style: solid;
  border-color: lightgray;
  transition: 200ms;
}
.loginpage-login-panel-input:hover {
  border-color: gold;
}
#loginpage-login-panel-button {
  margin-top: 10%;
  display: flex;
  justify-content: center;
}
</style>
