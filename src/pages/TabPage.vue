<script setup lang="ts">
import http from '@/libs/http'
import { useToken } from '@/stores'
import { home, people, wallet, idCardOutline, logInOutline, search } from 'ionicons/icons'

import {
  IonButtons,
  IonHeader,
  IonFooter,
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonToolbar,
  IonSearchbar,
  IonButton,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from '@ionic/vue'
import router from '@/plugins/router';

/**
 * To-do:
 * 1. 将 logIn 和 signUp 返回的 Authorization 存储在 Pinia 里
 * 2. 给 createWallet 添加 Authorization 头
 * 3. 将 userName 和 passWord 存储在 Pinia 里
 * 4. 完成 getBalance 接口的调用
 */

const tokenStore = useToken()
const data: string = `{
    "username":"test7",
    "password":"test1"
}`

async function logIn(data: string): Promise<void> {
  await resolve('/login', data)
}

async function signUp(data: string): Promise<void> {
  await resolve('/register', data)
}

async function resolve(url: string, data: string): Promise<void> {
  const res = await http.post(url, data)
  const token = res.headers.authorization as string
  tokenStore.setToken(token)
}

function redirectToLoginPage(){
  router.replace("/login");
}

</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-header>
        <ion-toolbar>
          <h2 slot="start">MyGO</h2>
          <ion-searchbar />
          <ion-buttons slot="end">
            <ion-button fill="solid" @click="redirectToLoginPage()">
              <ion-icon slot="start" :icon="logInOutline" />登录</ion-button
            >
            <ion-button fill="solid" @click="signUp(data)">
              <ion-icon slot="start" :icon="idCardOutline" />注册</ion-button
            >
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-router-outlet />

      <ion-footer>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="home" />
            <ion-label>主页</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="activity" href="/activity">
            <ion-icon :icon="people" />
            <ion-label>活动</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="finance" href="/finance">
            <ion-icon :icon="wallet" />
            <ion-label>资金</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="search" href="/search">
            <ion-icon :icon="search" />
            <ion-label>搜索</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-footer>
    </ion-tabs>
  </ion-page>
</template>

<style scoped lang="less">
ion-button {
  margin-right: 10px;
}

h2 {
  margin-left: 10px;
  padding: 0px 10px;
  font-weight: bold;
}
</style>
