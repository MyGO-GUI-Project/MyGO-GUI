<script setup lang="ts">
import { IonHeader, IonContent, IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue'
import { home, people, wallet, search } from 'ionicons/icons'
import http from '@/lib/http'
import { useTokenStore } from '@/stores'

const tokenStore = useTokenStore()
/*
  To-do:
  1. 将 logIn 和 signUp 返回的 Authorization 存储在 Pinia 里
  2. 给 transfer 和 createWallet 添加 Authorization 头
  3. 将 userName 和 passWord 存储在 Pinia 里
  4. 完成 getBalanace 接口的调用
*/

const data: string = `{
    "username":"test7",
    "password":"test1"
}`

const passphrase: string = 'test1'

async function logIn(data: string): Promise<void> {
  await resolve('/login', data)
}

async function signUp(data: string): Promise<void> {
  await resolve('/register', data)

  // WARN 不应该在注册时就创建钱包
  // await resolve(`http://47.113.194.28:8888/api/blockchain/createWallet?passphrase=${passphrase}`, '')
}

async function resolve(url: string, data: string): Promise<void> {
  const res = await http.post(url, data)
  const token = res.headers.authorization as string
  tokenStore.setToken(token)
}
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-header>
          <ion-toolbar>
            <ion-title slot="start">MyGO</ion-title>
            <ion-searchbar href="/search"></ion-searchbar>
            <ion-button slot="primary" href="/login" target="self">登录</ion-button>
            <ion-button slot="secondary" @click="signUp(data)">注册</ion-button>
          </ion-toolbar>
        </ion-header>
        <ion-router-outlet></ion-router-outlet>
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
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="less">
ion-button {
  margin-right: 10px;
}
</style>
