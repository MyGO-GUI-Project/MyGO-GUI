<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue'
import { searchOutline } from 'ionicons/icons'

import {
  IonCardContent,
  IonSearchbar,
  IonButton,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonAvatar,
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

const searchResults: Ref<SearchResultData[]> = ref([
  {
    id: 1,
    user_id: 1,
    title: '1',
    description: '1',
    value: 1,
    status: '1',
    created_at: 1,
    updated_at: 1
  } as SearchResultData,
  {
    id: 2,
    user_id: 1,
    title: '1',
    description: '1',
    value: 1,
    status: '1',
    created_at: 1,
    updated_at: 1
  } as SearchResultData,
  {
    id: 3,
    user_id: 1,
    title: '1',
    description: '1',
    value: 1,
    status: '1',
    created_at: 1,
    updated_at: 1
  } as SearchResultData,
  {
    id: 4,
    user_id: 1,
    title: '1',
    description: '1',
    value: 1,
    status: '1',
    created_at: 1,
    updated_at: 1
  } as SearchResultData,
  {
    id: 5,
    user_id: 1,
    title: '1',
    description: '1',
    value: 1,
    status: '1',
    created_at: 1,
    updated_at: 1
  } as SearchResultData,
  {
    id: 6,
    user_id: 1,
    title: '1',
    description: '1',
    value: 1,
    status: '1',
    created_at: 1,
    updated_at: 1
  } as SearchResultData
])

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
          <ion-icon aria-hidden :icon="searchOutline" />
          <ion-label>搜索</ion-label>
        </ion-button>

        <ion-spinner name="dots" v-if="searchingStatus.Searching" />

        <ion-list>
          <ion-item v-for="searchResult in searchResults" :key="searchResult.id">
            <ion-avatar slot="start">
              <ion-img alt="头像" :src="`https://picsum.photos/80/80?random=${searchResult.id}`" />
            </ion-avatar>
            <ion-label>
              <h2>{{ searchResult.title }}</h2>
              <p>{{ searchResult.description }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </ion-modal>
</template>

<style scoped lang="less">
.search-ion-button {
  display: block;
}
</style>
