<template>
  <div v-if="items && items.length>0" class="mb-2 info-container">
    <h5 class="title">{{ title }}</h5>
    <div v-if="items.length<=5">
      <div v-if="isLink">
        <a :href="`${item.url}`" class="mb-1" :key="`${item[displayAttribute]}-${Math.random()}`"
           v-for="item in items">
          <p>{{ item[displayAttribute] }}</p>
        </a>
      </div>
      <div v-else class="mb-1" :key="`${item[displayAttribute]}-${Math.random()}`" v-for="item in items">
        {{ item[displayAttribute] }}
      </div>
    </div>
    <div v-else>
      <div v-if="isLink">
        <a :href="`${item.url}`" class="mb-1" :key="`${item[displayAttribute]}-${Math.random()}`"
           v-for="item in items.slice(0, itemsShowNum)">
          <p>{{ item[displayAttribute] }}</p>
        </a>
        <div v-if="showMore">
          <a :href="`${item.url}`" :key="`${item[displayAttribute]}-${Math.random()}`"
             class="mb-1" v-for="item in items.slice(itemsShowNum-items.length)">
            <p>{{ item[displayAttribute] }}</p>
          </a>
        </div>
      </div>
      <div v-else>
        <div class="mb-1" :key="`${item[displayAttribute]}-${Math.random()}`"
             v-for="item in items.slice(0, itemsShowNum)">
          {{ item[displayAttribute] }}
        </div>
        <div v-if="showMore">
          <div class="mb-1" :key="`${item[displayAttribute]}-${Math.random()}`"
               v-for="item in items.slice(itemsShowNum-items.length)">
            {{ item[displayAttribute] }}
          </div>
        </div>
      </div>
      <b-button class="link" v-if="!showMore" @click="showMore = true" variant="link">Show More</b-button>
      <b-button class="link" v-else @click="showMore = false" variant="link">Show Less</b-button>
    </div>

  </div>
</template>

<script>

export default {
  name: "ListInfo.vue",
  data() {
    return {
      showMore: false,
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    itemsShowNum: {
      type: Number,
      default: 5
    },
    displayAttribute: {
      type: String,
      default: 'name'
    },
    isLink: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

.link {
  padding: 0;
  font-size: 12px;
}

.title {
  padding-top: 8px;
  padding-bottom: 8px;
  border-top: lightgray 1px solid;
  border-bottom: lightgray 1px solid;
  font-weight: bold;
}

.info-container{
  color: #604935;
}
</style>