<script setup lang="ts">
import { reactive } from 'vue'
import { add } from 'ionicons/icons'

import {
  IonFab,
  IonFabButton,
  IonPage,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  InfiniteScrollCustomEvent,
} from '@ionic/vue'

const items: string[] = reactive([''])

const generateItems = () => {
  const count = items.length + 1
  for (let i = 0; i < 50; i++) {
    items.push(`活动 ${count + i}`)
  }
}

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  generateItems()
  setTimeout(() => ev.target.complete(), 500)
}

generateItems()
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-list>
        <ion-item v-for="(item, index) in items" :key="index">
          <ion-avatar slot="start">
            <ion-img :src="'https://picsum.photos/80/80?random=' + index" alt="avatar" />
          </ion-avatar>
          <ion-label>{{ item }}</ion-label>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>
