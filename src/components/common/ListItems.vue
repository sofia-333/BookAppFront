<template>
  <div>
    <div v-if="isLink">
      <a :href="`${item.url}`" class="mb-1" :key="getUniqueKey(item[displayAttribute])"
         v-for="item in items">
        <p>{{ item[displayAttribute] }}</p>
      </a>
    </div>
    <div v-else>
      <div class="mb-1" :key="getUniqueKey(item[displayAttribute])" v-for="item in items">
        {{ item[displayAttribute] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItems.vue",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    displayAttribute: {
      type: String,
      default: 'name'
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getUniqueKey(field) {
      return `${field}-${Math.random()}`;
    }
  }
}
</script>

<style scoped>

</style>