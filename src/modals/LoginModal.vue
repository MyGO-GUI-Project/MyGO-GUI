<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { logInOutline } from 'ionicons/icons'

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
import http, {HTTP} from '@/libs/http'
import { AxiosError } from 'axios'

const username = ref(0)
const password = ref(0)

const tokenStore = useToken()
const router = useRouter()

function returnToHome(): void {
  router.replace('/home')
}

const logInStatus:{[key:string]:boolean} = reactive({
  BAD_USERNAME: false,
  BAD_PASSWORD: false,
  LOG_IN: false,
  LOG_IN_SUCCEED: false,
  WRONG_USERNAME_OR_PASSWORD: false,
  NETWORK_ERROR: false
})

function switchLogInStatus(currentStatus: string): void{
  for(const status in logInStatus){
    logInStatus[status] = (currentStatus == status)
  }
}

function isUsernameValid(): boolean{
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  if(!usernameRegex.test(username.value.toString())){
    switchLogInStatus("BAD_USERNAME");
    return false;
  }
  return true;
}

function isPasswordValid(): boolean{
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+]{6,20}$/;
  if(!passwordRegex.test(password.value.toString())){
    switchLogInStatus("BAD_PASSWORD");
    return false;
  }
  return true;
}

function isInputValid(): boolean{
  return isUsernameValid()&&isPasswordValid()
}

function updateUsername(event: InputEvent) {
  username.value = event.target.value
}

function updatePassword(event: InputEvent) {
  password.value = event.target.value
}

async function logInRequest(): Promise<void> {
  if(!isInputValid()){
    return;
  }
  const data = JSON.stringify({
    password: password.value,
    username: username.value
  })
  switchLogInStatus("LOG_IN")
  http.post('/login', data)
    .then(function(response){
      switchLogInStatus("LOG_IN_SUCCEED")
      const token = response.headers.authorization as string
      tokenStore.setToken(token)
      returnToHome()
    })
    .catch(function(){
      switchLogInStatus("WRONG_USERNAME_OR_PASSWORD")
    })
}
</script>

<template>
  <ion-modal trigger="login-ion-modal-trigger" keep-contents-mounted>
    <ion-card>
      <ion-card-header>
        <ion-card-title>登录</ion-card-title>
        <ion-card-subtitle>欢迎回家</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <ion-input
          class="ion-margin-bottom"
          autocomplete="username"
          fill="outline"
          label="账号"
          label-placement="stacked"
          clearInput
          @input="updateUsername"
          
        />

        <ion-input
          class="ion-margin-bottom"
          type="password"
          autocomplete="current-password"
          fill="outline"
          label="密码"
          label-placement="stacked"
          clearInput
          @input="updatePassword"
        />

        <ion-text color="warning" v-if="logInStatus.BAD_USERNAME">请正确输入用户名</ion-text>
        <ion-text color="warning" v-if="logInStatus.BAD_PASSWORD">请正确输入密码</ion-text>
        <ion-text color="warning" v-if="logInStatus.WRONG_USERNAME_OR_PASSWORD">用户名或密码错误</ion-text>
        <ion-text color="warning" v-if="logInStatus.NETWORK_ERROR">未能连接至服务器</ion-text>
        <ion-text color="success" v-if="logInStatus.LOG_IN_SUCCEED">登录成功</ion-text>

        <ion-button @click="logInRequest" id="loginpage-login-panel-button" :disabled="logInStatus.LOG_IN">
          <ion-icon :icon="logInOutline" v-if="!logInStatus.LOG_IN"/>
          <ion-label v-if="!logInStatus.LOG_IN">登录</ion-label>
          <ion-spinner v-if="logInStatus.LOG_IN"/>
        </ion-button>
      </ion-card-content>
    </ion-card>
  </ion-modal>
</template>

<style scoped lang="less">
ion-modal {
  --width: fit-content;
  --height: fit-content;
  --border-radius: 4px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

#loginpage-login-panel-button {
  display: block;
  justify-content: center;
}
</style>
