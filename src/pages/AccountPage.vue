<script setup lang="ts">
import {
  IonImg,
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
  IonContent,
  IonPage
} from '@ionic/vue'
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img alt="头像" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label>MyGO Project</ion-label>
          </ion-item>

          <ion-accordion-group expand="inset">
            <ion-accordion>
              <ion-item slot="header">
                <ion-label>余额 (T)</ion-label>
              </ion-item>
              <ion-item slot="content" lines="none">
                <ion-label>62.93</ion-label>
              </ion-item>
            </ion-accordion>
          </ion-accordion-group>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>服务历史</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-card>
            <ion-card-header>
              <ion-card-title>需求一</ion-card-title>
              <ion-card-subtitle>2023.4.1 10:00 / 情感陪伴</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-label>需求内容</ion-label>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>需求二</ion-card-title>
              <ion-card-subtitle>2023.5.13 14:30 / 生活照料</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-label>需求内容</ion-label>
            </ion-card-content>
          </ion-card>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>需求历史</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-card>
            <ion-card-header>
              <ion-card-title>需求一</ion-card-title>
              <ion-card-subtitle>2023.4.1 10:00 / 情感陪伴</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-label>需求内容</ion-label>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>需求二</ion-card-title>
              <ion-card-subtitle>2023.5.13 14:30 / 生活照料</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-label>需求内容</ion-label>
            </ion-card-content>
          </ion-card>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>时间账单</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-card>
            <ion-card-header>
              <ion-card-title>交易一</ion-card-title>
              <ion-card-subtitle>2023.4.1 10:00 / 情感陪伴</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-label>交易内容</ion-label>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>交易二</ion-card-title>
              <ion-card-subtitle>2023.5.13 14:30 / 生活照料</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-label>交易内容</ion-label>
            </ion-card-content>
          </ion-card>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
