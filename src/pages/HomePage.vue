<script setup lang="ts">
import {
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
} from '@ionic/vue'
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card id="container">
        <ion-card-content>
          <ion-accordion-group>
            <ion-accordion value="TimeCoin">
              <ion-item slot="header" color="light">
                <ion-label>余额 (T)</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">62.93</div>
            </ion-accordion>
          </ion-accordion-group>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>情感陪伴</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          旨在为老年人提供温暖、关怀和陪伴。志愿者通过陪聊、共同活动等方式，建立深厚的友谊，帮助老年人缓解孤独感，提升生活质量
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>生活照料</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          专注于满足老年人日常生活需求，包括购物、清理家居、烹饪等。志愿者通过实际行动，为老年人提供贴心的生活支持，使他们能够更好地享受晚年生活
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>运动健身</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          旨在促进老年人的身体健康和活力。志愿者可以陪同老年人参与适度的运动活动，如散步、太极拳等，帮助他们保持良好的体魄和积极的心态
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>医疗陪护</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          为老年人提供医疗方面的支持，包括陪同就医、购买药品等。志愿者在医疗环境中为老年人提供慰藉和支持，使他们更好地应对健康挑战
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>社区义务</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          涵盖各类社区活动和服务项目。志愿者通过参与社区建设、环境整治等工作，为老年人创造更安全、舒适的社区环境，提高他们的生活品质
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>技能培训</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          致力于为老年人提供学习和发展的机会，包括计算机技能、手工艺等。志愿者通过传授知识和技能，帮助老年人保持学习活力，拓宽他们的生活视野
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>心理咨询</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content> 关注老年人心理健康，提供专业的心理支持和咨询。志愿者通过倾听和沟通，帮助老年人处理情绪问题，保持良好的心理状态 </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>社交活动</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          旨在为老年人创造丰富多彩的社交生活。志愿者组织各种社交活动，如聚餐、文艺演出等，促进老年人之间的交流与互动，增强社区凝聚力
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
