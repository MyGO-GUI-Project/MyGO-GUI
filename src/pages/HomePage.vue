<script setup lang="ts">
import { IonButton, IonContent, IonPage } from '@ionic/vue';
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <p>余额:x</p>
        <ion-button>转账</ion-button>
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
