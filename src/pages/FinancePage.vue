<script setup lang="ts">
import http from '@/lib/http'
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAvatar,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonButton,
  IonContent,
  IonPage,
} from '@ionic/vue'
import axios from 'axios'

const data: string = `{
    "passphrase":"123",
    "toName":"demo",
    "amount":"10000"
}`

// async function transfer(data: string): Promise<void> {
//   await resolve('/blockchain/transfer', data)
// }

async function resolve(url: string, data: string): Promise<void> {
  await http
    .post(url, data)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card id="container">
        <ion-card-content>
          <ion-item>
            <ion-avatar slot="start">
              <img alt="用户头像" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label>MyGO Project</ion-label>
          </ion-item>
          <ion-accordion-group>
            <ion-accordion value="TimeCoin">
              <ion-item slot="header" color="light">
                <ion-label>余额 (T)</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">62.93</div>
            </ion-accordion>
          </ion-accordion-group>
          <!-- <ion-button @click="transfer(data)">转账</ion-button> -->
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>贡献记录</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>求助记录</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>时间账单</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="less">
#container {
  margin-top: 70px;
}
</style>
