<script setup lang="ts">
import { Ref, ref, reactive } from 'vue'
import {
  IonCardContent,
  IonToolbar,
  IonSearchbar,
  IonButton,
  IonRow,
  IonCardTitle,
  IonIcon,
  IonCardSubtitle,
  IonCard,
  IonCardHeader,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonGrid,
  IonCol,
  IonModal,
  IonSpinner,
  IonList,
  IonItem
} from '@ionic/vue'
import { alert } from 'ionicons/icons'

import { HTTP, get } from '@/libs/http'

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

const query: Ref<string> = ref('')

const result: Ref<SearchResultData[]> = ref([])

function updateQuery(event: InputEvent): void {
  const content = event.target.value
  query.value = content
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
  <ion-modal trigger="search-ion-modal-trigger">
    <ion-card>
      <ion-card-header>
        <ion-toolbar>
          <ion-searchbar @input="updateQuery" />
          <ion-button @click="search()" slot="end"> 搜索 </ion-button>
        </ion-toolbar>
        <ion-toolbar>
          <ion-grid :fixed="true">
            <ion-row>
              <ion-col class="searchpage-filter-label" size="1">
                <ion-label>过滤</ion-label>
              </ion-col>
              <ion-col>
                <ion-select placeholder="按状态">
                  <ion-select-option> 待审核 </ion-select-option>
                  <ion-select-option> 已通过 </ion-select-option>
                  <ion-select-option> 已驳回 </ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-card-header>

      <ion-card-content>
        <ion-spinner name="circular" class="searchpage-loading" v-if="searchingStatus.Searching" />
        <ion-list class="searchpage-result" v-if="searchingStatus.Fetched">
          <ion-item v-for="item in result" :key="item.id">
            <ion-card class="searchpage-result-item">
              <ion-card-title>{{ item.title }}</ion-card-title>
              <ion-card-subtitle>{{ item.description }}</ion-card-subtitle>
            </ion-card>
          </ion-item>
        </ion-list>
        <ion-icon class="searchingpage-network-error" :icon="alert" v-if="searchingStatus.NetworkError" />
        <div class="searchpage-notfound" v-if="searchingStatus.NotFound">
          <ion-label>未找到相应的结果</ion-label>
        </div>
      </ion-card-content>
    </ion-card>
  </ion-modal>
</template>

<style scoped lang="less">
ion-modal {
  --width: fit-content;
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

.searchpage-filter-label {
  align-self: center;
}
.searchpage-loading {
  top: 30%;
  left: 50%;
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
