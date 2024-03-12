<script setup lang="ts">
/**
 * To-do:
 * 1. 将 logIn 和 signUp 返回的 Authorization 存储在 Pinia 里
 * 2. 给 createWallet 添加 Authorization 头
 * 3. 将 userName 和 passWord 存储在 Pinia 里
 * 4. 完成 getBalance 接口的调用
 */

import {
  homeOutline,
  peopleOutline,
  walletOutline,
  personOutline,
  logInOutline,
  searchOutline
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
  IonIcon
} from '@ionic/vue'

import SearchModal from '@/modals/SearchModal.vue'
import LoginModal from '@/modals/LoginModal.vue'
import SignupModal from '@/modals/SignupModal.vue'
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-header>
        <ion-toolbar>
          <ion-title slot="start">MyGO</ion-title>

          <ion-buttons class="ion-margin-end" slot="end">
            <ion-button id="search-ion-modal-trigger">
              <ion-icon aria-hidden slot="start" :icon="searchOutline" />
              <ion-label>搜索</ion-label>
            </ion-button>
            <SearchModal />

            <ion-button id="login-ion-modal-trigger">
              <ion-icon aria-hidden slot="start" :icon="logInOutline" />
              <ion-label>登录</ion-label>
            </ion-button>
            <LoginModal />

            <ion-button id="signup-ion-modal-trigger">
              <ion-icon aria-hidden slot="start" :icon="personOutline" />
              <ion-label>注册</ion-label>
            </ion-button>
            <SignupModal />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-router-outlet />

      <ion-footer>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon aria-hidden :icon="homeOutline" />
            <ion-label>推荐</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="service" href="/service">
            <ion-icon aria-hidden :icon="peopleOutline" />
            <ion-label>服务</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="account" href="/account">
            <ion-icon aria-hidden :icon="walletOutline" />
            <ion-label>我的</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-footer>
    </ion-tabs>
  </ion-page>
</template>
