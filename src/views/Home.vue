<template>
  <div id="app">

    <div class="hero bg-gray-300 mb-24">
      <div class="container flex flex-col lg:flex-row lg:justify-between md:flex-row md:justify-between py-10">
        <div class="mt-0 lg:mt-10">
          <h1 class="w-full  lg:w-3/4  md:w-3/4 mb-4">Book recommendation site built with Graphql</h1>
          <p class="leading-normal w-full lg:w-3/4  md:w-3/4 mb-6">Built with Laravel (Lighthouse Graphql), Vue.js (Vue-Apollo) and Tailwind CSS</p>
          <div class="flex items-center">
            <a href="" class="bg-purple-700 text-white rounded px-4 py-4 mr-4 hover:bg-purple-600">View Books</a>
            <a href="" class="border border-purple-700 border-solid text-purple-700 rounded px-4 py-4 hover:bg-purple-500 hover:text-white">View Screencasts</a>
          </div>
        </div>
        <div>
          <img class="mt-10 lg:mt-0 md:mt-0" src="@/assets/hero.svg" alt="iconhero">
        </div>
      </div>
    </div> <!-- End Hero -->

    <div class="container">

      <div class="flex flex-wrap -mx-4">

        <div class="w-full lg:w-1/4 px-4 mb-12">

          <ApolloQuery :query="categoriesQuery">
            <template slot-scope="{ result: { data, error, loading }, isLoading }">
              <div v-if="isLoading">Loading...</div>
              <div v-else-if="error" class="error apollo">An error occurred</div>
              <ul v-else class="list-reset text-lg">
                <li class="mb-6">
                  <a href="#all" @click.prevent="selectCategory('all')" class="hover:text-gray-800">All</a>
                </li>
                <li class="mb-6">
                  <a href="#featured" @click.prevent="selectCategory('featured')" class="hover:text-gray-800">Featured</a>
                </li>
                <li  v-bind:href="'#' + category.id" @click.prevent="selectCategory(category.id)" v-for="category in data.categories" v-bind:key="category.id" class="mb-6">
                  <a class="hover:text-gray-800" href="#">{{category.name}}</a>
                </li>
                <li class="mb-6">
                  <router-link :to="{name : 'addBook'}" class="hover:text-gray-800">Add Book</router-link>
                </li>
              </ul>
            </template>
          </ApolloQuery><!-- End Category -->

        </div><!-- End Flex-Grid:1/4 -->

        <div class="w-full lg:w-3/4 px-4 mb-12">

          <ApolloQuery :query="query" v-if="selectedCategory === 'all'">
            <template slot-scope="{ result: { data, error, loading }, isLoading }">
              <div v-if="isLoading">Loading...</div>
              <div v-else-if="error" class="error apollo">An error occurred {{error}}</div>
              <div v-else class="flex flex-wrap">
                <div class="w-full lg:w-1/3 px4 mb-12" v-for="book in data.books" v-bind:key="book.id">
                <book-listing :book="book"/>
                  <!--<router-link :to="{name : 'book', params : {id : book.id}}" class="inline-block">
                    <img :src="book.image" alt="book image" class="h-64 mb-2">
                  </router-link>
                  <div>
                    <router-link :to="{name : 'book', params : {id : book.id}}" class="text-lg font-bold text-black-700 mb-1 inline-block">
                      {{ book.id }} {{book.title}}
                    </router-link>
                    <div class="text-gray-600">{{book.author}}</div>
                  </div> -->
                </div>
              </div>
            </template>
          </ApolloQuery><!-- End AllCategories -->

          <ApolloQuery  :query="query" :variables="{ featured : true}" v-if="selectedCategory === 'featured'">
            <template slot-scope="{ result: { data, error}, isLoading }">
              <div v-if="isLoading">Loading...</div>
              <div v-else-if="error" class="error apollo">An error occurred {{error}}</div>
              <div v-else class="flex flex-wrap">
                <div class="w-full lg:w-1/3 px4 mb-12" v-for="book in data.booksByFeatured" v-bind:key="book.id">
                   <book-listing :book="book"/>
                </div>
              </div>
            </template>
          </ApolloQuery> <!-- EndFeatured -->

          <ApolloQuery :query="query" :variables="{ id : selectedCategory }" v-if="category">
            <template slot-scope="{ result: { data, error}, isLoading }">
              <div v-if="isLoading">Loading...</div>
              <div v-else-if="error" class="error apollo">An error occurred {{error}}</div>
              <div v-else-if="data.category" class="flex flex-wrap">
                <div class="w-full lg:w-1/3 px4 mb-12" v-for="book in data.category.books" v-bind:key="book.id">
                   <book-listing :book="book"/>
                </div>
              </div>
            </template>
          </ApolloQuery><!-- End CategorySelected -->

        </div><!-- End Flex-Grid:3/4 -->

      </div><!-- End Flex-Grid:full, flex-wrap -->

    </div><!-- End container -->

  </div><!--End App -->

</template>

<script>
import categoryQuery from '@/graphql/queries/Category.gql'
import categoriesQuery from '@/graphql/queries/Categories.gql'
import BooksQuery from '@/graphql/queries/Books.gql'
import BooksFeaturedQuery from '@/graphql/queries/BooksFeatured.gql'
import BookListing from '@/components/BookListing.vue'
export default {
  name: 'home',
  components: {
    BookListing
  },
  data () {
    return {
      categoryQuery,
      categoriesQuery,
      BooksQuery,
      BooksFeaturedQuery,
      query: BooksQuery,
      selectedCategory: 'all',
      category: false,
      categories: []
    }
  },
  methods: {
    clickCallback (pageNum) {
      console.log(pageNum)
    },
    selectCategory (category) {
      switch (category) {
        case 'all':
          this.query = this.BooksQuery
          this.category = false
          break

        case 'featured':
          this.query = this.BooksFeaturedQuery
          this.category = false
          break
        default:
          this.query = this.categoryQuery
          this.category = true
          break
      }
      this.selectedCategory = category
    }
  }
}
</script>

<style>
.link-margin {
  margin-right: 24px;
}

.nav-pagination {
  display: flex;
  /* background-color: lightskyblue; */
  justify-content: center;
}

.nav-pagination li:first-child {
  /* margin-right: auto; */
}

.nav-pagination li {
  padding: 2px 5px;
  border: lightslategray 1px solid;
}

.nav-pagination li:last-child {
  /* margin-left: auto; */
}
</style>
