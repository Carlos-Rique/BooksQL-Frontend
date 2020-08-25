<template>
  <div id="app" class="font-sans antialiased text-black">
    <div id="nav" class="bg-purple-700">
      <div class="container flex items-center justify-between py-6">
        <div>
          <a href="/"> <img src="./assets/logo.svg" alt="logo"></a>
        </div>
        <div>
          <router-link class="text-white hover:text-gray-400" to="/">Home</router-link>
          <router-link class="text-white hover:text-gray-400 pl-6" to="/about">About</router-link>
        </div>
      </div>
    </div>

    <router-view :key="$route.fullPath" />

  </div>
</template>

<style src="./assets/css/Tailwind.css">
