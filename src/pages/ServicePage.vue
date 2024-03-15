<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { addOutline } from 'ionicons/icons'

import {
  IonCard,
  IonCardContent,
  IonAvatar,
  IonImg,
  IonIcon,
  IonFab,
  IonFabButton,
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue'

import { HTTP, get } from '@/libs/http'
import { Transaction } from '@/libs/types'

/**
 * To-do:
 * 1. Wait for the backend finish the count api to get the total number of transactions
 *    Depending on the total number of transactions, we can calculate the total number of pages
 *    Then we can add selector to let the user select the page they want to see
 *
 * 2. Add a loading spinner when the user is fetching the transactions
 *
 * 3. When user click the transaction, we should redirect the user to the transaction detail page
 *
 * Tips:
 *    Only the admin can see all the transactions, the normal user can only see passed transactions
 */

const isLoading = ref(true)

/**
 * this index is used to fetch more transactions, starting from 0
 * each time we fetch, we increase the index by 1
 * and each batch of transactions is 50
 */

let requirements = reactive<Transaction[]>([])

const fetchTransactions = async () => {
  const res = await get(`/transaction/limit?index=${index.value}`)
  if (res.code == HTTP.OK) {
    isLoading.value = false
    console.log(res.data.length)
    return res.data as Transaction[]
  }
}

onMounted(async () => {
  requirements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  // items = (await fetchTransactions()) ?? []
})
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-card>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="(requirement, index) in requirements" :key="index">
              <ion-avatar slot="start">
                <ion-img alt="头像" :src="`https://picsum.photos/80/80?random=${index}`" />
              </ion-avatar>
              <ion-label>
                <h2>需求 {{ index }}</h2>
                <p>{{ requirement }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-fab class="ion-margin-end ion-margin-bottom" slot="fixed" horizontal="end" vertical="bottom">
        <ion-fab-button aria-label="add" color="light">
          <ion-icon aria-hidden :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
