<script setup lang="ts">
import http from '@/libs/http'
import { useToken } from '@/stores'

import {
  homeOutline,
  peopleOutline,
  walletOutline,
  idCardOutline,
  logInOutline,
  searchOutline,
} from 'ionicons/icons'

import {
  IonButtons,
  IonHeader,
  IonFooter,
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonToolbar,
  IonTitle,
  IonButton,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from '@ionic/vue'

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

async function signUp(data: string): Promise<void> {
  await resolve('/register', data)
}

async function resolve(url: string, data: string): Promise<void> {
  const res = await http.post(url, data)
  const token = res.headers.authorization as string
  tokenStore.setToken(token)
}
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-header>
        <ion-toolbar>
          <ion-title slot="start">MyGO</ion-title>
          <ion-buttons class="ion-margin-end" slot="end">
            <ion-button href="/search" target="_self">
              <ion-icon slot="start" :icon="searchOutline" />
              <ion-label>搜索</ion-label>
            </ion-button>

            <ion-button href="/login" target="_self">
              <ion-icon slot="start" :icon="logInOutline" />
              <ion-label>登录</ion-label>
            </ion-button>

            <ion-button @click="signUp(data)">
              <ion-icon slot="start" :icon="idCardOutline" />
              <ion-label>注册</ion-label>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-router-outlet />

      <ion-footer>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="homeOutline" />
            <ion-label>主页</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="activity" href="/activity">
            <ion-icon :icon="peopleOutline" />
            <ion-label>活动</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="finance" href="/finance">
            <ion-icon :icon="walletOutline" />
            <ion-label>资金</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-footer>
    </ion-tabs>
  </ion-page>
</template>
