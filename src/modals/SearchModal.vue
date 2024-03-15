<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue'
import { alertOutline, searchOutline } from 'ionicons/icons'

import {
  IonCardContent,
  IonSearchbar,
  IonButton,
  IonCardTitle,
  IonIcon,
  IonCardSubtitle,
  IonCard,
  IonCardHeader,
  IonLabel,
  IonModal,
  IonSpinner,
  IonList,
  IonItem
} from '@ionic/vue'

import { get } from '@/libs/http'

interface SearchResultData {
  id: number
  user_id: number
  title: string
  description: string
  value: number
  status: string
  created_at: number
  updated_at: number
}

const searchContent: Ref<string> = ref('')

const result: Ref<SearchResultData[]> = ref([])

const searchIonSearchbar = ref()
function searchIonModalDidPresent() {
  searchIonSearchbar.value.$el.setFocus()
}

function searchIonSearchbarIonInput() {
  // ...
}

function searchIonButtonClick() {
  // ...
}

async function search(): Promise<void> {
  switchSearchingStatus('Searching')
  const response = await get(`/transaction/search?search=${query.value}`)
  console.log(response)
  if (response.code == 200) {
    console.log(response.data)
    if (response.data != null && response.data.length > 0) {
      result.value = response.data
      switchSearchingStatus('Fetched')
    } else {
      switchSearchingStatus('NotFound')
    }
  } else {
    switchSearchingStatus('NetworkError')
  }
}

const searchingStatus: { [key: string]: boolean } = reactive({
  Fetched: false,
  NotFound: false,
  Searching: false,
  NetworkError: false
})

function switchSearchingStatus(currentStatus: string) {
  for (const status in searchingStatus) {
    searchingStatus[status] = status == currentStatus
  }
}
</script>

<template>
  <ion-modal trigger="search-ion-modal-trigger" @didPresent="searchIonModalDidPresent">
    <ion-card>
      <ion-card-header>
        <ion-card-title>搜索</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-searchbar
          ref="searchIonSearchbar"
          class="ion-margin-bottom"
          v-model="searchContent"
          :debounce="1000"
          inputmode="search"
          enterkeyhint="search"
          placeholder="搜索需求"
          @ion-input="searchIonSearchbarIonInput"
        />

        <ion-button
          class="search-ion-button ion-justify-content-center"
          fill="clear"
          @click="searchIonButtonClick"
        >
          <ion-icon :icon="searchOutline" />
          <ion-label>搜索</ion-label>
        </ion-button>

        <ion-spinner name="dots" v-if="searchingStatus.Searching" />

        <ion-list class="searchpage-result" v-if="searchingStatus.Fetched">
          <ion-item v-for="item in result" :key="item.id">
            <ion-card class="searchpage-result-item">
              <ion-card-title>{{ item.title }}</ion-card-title>
              <ion-card-subtitle>{{ item.description }}</ion-card-subtitle>
            </ion-card>
          </ion-item>
        </ion-list>
        <ion-icon
          class="searchingpage-network-error"
          :icon="alertOutline"
          v-if="searchingStatus.NetworkError"
        />
        <div class="searchpage-notfound" v-if="searchingStatus.NotFound">
          <ion-label>未找到相应的结果</ion-label>
        </div>
      </ion-card-content>
    </ion-card>
  </ion-modal>
</template>

<style scoped lang="less">
.search-ion-button {
  display: block;
}

.searchpage-filter-label {
  align-self: center;
}
.searchingpage-network-error {
  top: 30%;
  left: 50%;
}
.searchpage-notfound {
  margin: 36%;
}
.searchpage-result-item {
  padding: 2%;
}
</style>
