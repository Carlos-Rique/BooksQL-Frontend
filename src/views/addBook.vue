<template>
  <div class="container mt-12">
    <h1 class="mb-4">Create Book</h1>
    <form action="#" method="POST" @submit.prevent="addBook">
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
        <button type="submit">Add book</button>
      </div>

    </form>
  </div>
</template>

<script>
import addBook from '@/graphql/mutations/addBook.gql'
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
  methods: {
    addBook () {
      this.$apollo.mutate({
        // Query
        mutation: addBook,
        // Parameters
        variables: {
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
        this.$router.push('/')
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
  .form-group {
    margin-bottom: 32px;
  }
  input[type="text"], textarea {
    padding: 10px 14px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  label {
    display: block;
  }
  button {
    padding: 16px;
    background: #027BFF;
    color: white;
    border-radius: 5px;
    font-size: 16px;
  }
</style>
