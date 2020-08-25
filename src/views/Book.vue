<template>
  <div class="container">
     <ApolloQuery :query="require('@/graphql/queries/Book.gql')" :variables="{id : $route.params.id}">
      <template slot-scope="{ result: { data, error, loading }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="error" class="error apollo">An error occurred</div>
        <div v-else class="flex mt-16 flex-col lg:flex-row">
          <div>
             <img :src="data.book.image" alt="Book's image!">
          </div>
          <div class="w-full lg:w-2/3 ml-0 mt-8 lg:mt-0 lg:ml-16">
            <div class="text-4xl font-bold">{{data.book.title}}</div>
            <div class="text-2xl text-gray-800 mb-8">{{data.book.author}}</div>
            <div class="text-lg text-gray-700 leading-normal">{{data.book.description}}</div>
            <div class="my-12">
              <a :href="data.book.link" target="_blank" class="border border-purple-900 border-solid rounded text-purple-800 px-4 py-4 hover:bg-purple-500 hover:text-white">View link</a>
            </div>
            <router-link class="text-purple-900" :to="{name: 'editBook', params: {id: data.book.id}}">edit</router-link>
            &middot;
            <a href="" class="text-purple-900" @click.prevent="deleteBook">delete</a>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import deleteBook from '@/graphql/mutations/deleteBook.gql'
export default {
  methods: {
    deleteBook () {
      this.$apollo.mutate({
        // Query
        mutation: deleteBook,
        // Parameters
        variables: {
          id: this.$route.params.id
        }
      }).then((data) => {
        console.log(data)
        this.$router.push('/')
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style>

</style>
