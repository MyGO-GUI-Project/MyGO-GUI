<script setup lang="ts">
import { IonButton, IonContent, IonPage } from '@ionic/vue';
import axios from 'axios';

const data: string =
  `{
    "passphrase":"123",
    "toName":"demo",
    "amount":"10000"
}`

async function transfer(data: string): Promise<void> {
  await resolve('http://47.113.194.28:8888/api/blockchain/transfer', data)
}

async function resolve(url: string, data: string): Promise<void> {
  await axios
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
      <div id="container">
        <p>余额:xxx</p>
        <ion-button @click="transfer(data)">转账</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="less">
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
