<template>
  <div>
    <router-link :to="{name : 'book', params : {id : book.id}}" class="inline-block">
      <img :src="book.image" alt="book image" class="h-64 w-40 mb-2">
    </router-link>
    <div>
      <router-link :to="{name : 'book', params : {id : book.id}}" class="text-lg font-bold text-black-700 mb-1 inline-block">
        {{book.title}}
      </router-link>
      <div class="text-gray-600">
        {{book.author}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['book']
}
</script>
