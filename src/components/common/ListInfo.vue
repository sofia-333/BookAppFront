<template>
  <div v-if="items && items.length>0" class="mb-2 info-container">
    <h5 class="title">{{ title }}</h5>
    <!--    display items without "show more" if items length is less or equal than num of items we want to show by default  -->
    <div v-if="items.length<=itemsShowNum">
      <list-items :is-link="isLink" :items="items" :display-attribute="displayAttribute"></list-items>
    </div>
    <div v-else>
      <!--    display items with "show more" clickable link -->
      <list-items :is-link="isLink" :items="items.slice(0, itemsShowNum)"
                  :display-attribute="displayAttribute"></list-items>
      <div v-if="showMore">
        <list-items :is-link="isLink" :items="items.slice(itemsShowNum-items.length)"
                    :display-attribute="displayAttribute"></list-items>
      </div>
      <b-button class="link" v-if="!showMore" @click="showMore = true" variant="link">Show More</b-button>
      <b-button class="link" v-else @click="showMore = false" variant="link">Show Less</b-button>
    </div>

  </div>
</template>

<script>

import ListItems from "@/components/common/ListItems";

export default {
  name: "ListInfo.vue",
  components: {ListItems},
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
    // num of items we want to show by default
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

.info-container {
  color: #604935;
}
</style>