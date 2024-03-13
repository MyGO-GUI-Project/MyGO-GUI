<script setup lang="ts">
import { ref, reactive } from 'vue'
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
const confirm_password = ref(0)
const role = ref("")

function updateUsername(event: InputEvent) {
  username.value = event.target.value
}
function updatePassword(event: InputEvent) {
  password.value = event.target.value
}
function updateConfirmPassword(event: InputEvent){
  confirm_password.value = event.target.value
}
function updateRole(event){
  role.value = event.detail.value
}

const tokenStore = useToken()
const router = useRouter()
function returnToHome(): void {
  router.replace('/home')
}

const signUpStatus:{[key:string]:boolean} = reactive({
  BAD_USERNAME: false,
  BAD_PASSWORD: false,
  PASSWORD_NOT_CONFIRMED: false,
  EMPTY_ROLE: false,
  SIGN_UP: false,
  SIGN_UP_SUCCEED: false,
  USERNAME_REPEAT: false,
  NETWORK_ERROR: false
})

function switchSignUpStatus(currentStatus: string): void{
  for(const status in signUpStatus){
    signUpStatus[status] = (currentStatus == status)
  }
}
function isUsernameValid(): boolean{
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  if(!usernameRegex.test(username.value.toString())){
    switchSignUpStatus("BAD_USERNAME");
    return false;
  }
  return true;
}

function isPasswordValid(): boolean{
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+]{6,20}$/;
  if(!passwordRegex.test(password.value.toString())){
    switchSignUpStatus("BAD_PASSWORD");
    return false;
  }
  return true;
}

function isPasswordConfirmed(): boolean{
  if(password.value == confirm_password.value){
    return true;
  }
  switchSignUpStatus("PASSWORD_NOT_CONFIRMED")
  return false
}

function isRoleSelected(): boolean{
  if(role.value.trim().length>0){
    return true;
  }
  switchSignUpStatus("EMPTY_ROLE")
  return false;
}

function isInputValid(): boolean{
  return isRoleSelected()&&isUsernameValid()&&isPasswordValid()&&isPasswordConfirmed()
}

async function signUpRequest(): Promise<void> {
  if(!isInputValid()){
    return;
  }
  const data = JSON.stringify({
    password: password.value,
    role: role.value,
    username: username.value
  })
  switchSignUpStatus("SIGN_UP")
  http.post('/register', data)
    .then(function(response){
      switchSignUpStatus("SIGN_UP_SUCCEED")
      const token = response.headers.authorization as string
      tokenStore.setToken(token)
      returnToHome()
    })
    .catch(function(){
      switchSignUpStatus("USERNAME_REPEAT")
    })
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
        <ion-select
          class="signup-role-select"
          label="角色"
          fill="outline"
          @ionChange="updateRole"
          >
          <ion-select-option value="Old">老人</ion-select-option>
          <ion-select-option value="Volunteer">志愿者</ion-select-option>
          <ion-select-option value="Admin">管理员</ion-select-option>
        </ion-select>

        <ion-input
          class="ion-margin-bottom"
          fill="outline"
          label="用户名"
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

        <ion-input
          class="ion-margin-bottom"
          type="password"
          fill="outline"
          label="确认密码"
          label-placement="stacked"
          clearInput
          @input="updateConfirmPassword"
        />
        
        <ion-text color="warning" v-if="signUpStatus.EMPTY_ROLE">请选择角色</ion-text>
        <ion-text color="warning" v-if="signUpStatus.BAD_USERNAME">请正确输入用户名</ion-text>
        <ion-text color="warning" v-if="signUpStatus.BAD_PASSWORD">请正确输入密码</ion-text>
        <ion-text color="warning" v-if="signUpStatus.PASSWORD_NOT_CONFIRMED">两次输入的密码不一致</ion-text>
        <ion-text color="warning" v-if="signUpStatus.NETWORK_ERROR">未能连接至服务器</ion-text>
        <ion-text color="success" v-if="signUpStatus.SIGN_UP_SUCCEED">注册成功</ion-text>

        <ion-button @click="signUpRequest" id="signup-panel-button" :disabled="signUpStatus.SIGN_UP">
          <ion-icon :icon="personOutline" v-if="!signUpStatus.SIGN_UP"/>
          <ion-label v-if="!signUpStatus.SIGN_UP">注册</ion-label>
          <ion-spinner v-if="signUpStatus.SIGN_UP"/>
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

ion-select{
  margin-bottom: 8%;
}

#signup-panel-button {
  display: block;
  justify-content: center;
}
</style>
