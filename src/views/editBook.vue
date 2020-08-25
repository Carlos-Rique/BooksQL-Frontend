<template>
  <div>
    <h1 class="mb-4">Edit Book</h1>
    <form action="#" method="POST" @submit.prevent="editBook">
      <div class="form-group">
        <label class="font-bold mb-2" for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="author">Author</label>
        <input type="text" name="author" id="author" v-model="author">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="image">Image</label>
        <input type="text" name="image" id="image" v-model="image">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="description">Description</label>
        <textarea name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="link">Link</label>
        <input type="text" name="link" id="link" v-model="link">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2"><input type="checkbox" name="featured" v-model="featured" class="mr-2">Featured</label>
      </div>

      <div class="form-group">
        <ApolloQuery :query="require('@/graphql/queries/Categories.gql')">
          <template slot-scope="{ result: { data, error, loading }, isLoading }">
            <div v-if="isLoading">Loading...</div>
            <div v-else-if="error" class="error apollo">An error occurred</div>
            <select v-model="category" v-else>
              <option v-for="category in data.categories" v-bind:key="category.id" :value="category.id">
                {{category.name}}
              </option>
            </select>
          </template>
        </ApolloQuery>
      </div>

      <div class="form-group">
        <button type="submit">edit book</button>
      </div>

    </form>
  </div>
</template>

<script>
import updateBook from '@/graphql/mutations/updateBook.gql'
import book from '@/graphql/queries/Book.gql'
export default {
  data () {
    return {
      title: '',
      author: '',
      image: '',
      description: '',
      link: '',
      featured: false,
      category: 0
    }
  },
  apollo: {
    // Advanced query with parameters
    book: {
      query: book,
      // Reactive parameters
      variables () {
        if (this.$route && this.$route.params) {
          return {
            id: this.$route.params.id
          }
        }
      },
      // Optional result hook
      result ({ data, loading, networkStatus }) {
        this.title = data.book.title
        this.author = data.book.author
        this.description = data.book.description
        this.image = data.book.image
        this.link = data.book.link
        this.featured = data.book.featured
        this.category = data.book.category.id
      }
    }
  },

  methods: {
    editBook () {
      this.$apollo.mutate({
        // Query
        mutation: updateBook,
        // Parameters
        variables: {
          id: this.$route.params.id,
          title: this.title,
          author: this.author,
          image: this.image,
          description: this.description,
          link: this.link,
          featured: this.featured,
          category_id: this.category
        }
      }).then((data) => {
        console.log(data)
        this.$router.push(`/books/${this.$route.params.id}`)
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style>

</style>
