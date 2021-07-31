<template>
  <amplify-authenticator>
    <div class="container">
      <div class="menu">
        <h1>Humidity Detector</h1>
        <ul class="menu__options">
          <li>
            <nuxt-link :to="{ name: 'index' }">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'projects' }">Projects</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="page">
        <Nuxt />
      </div>
    </div>
  </amplify-authenticator>
</template>

<script>
export default {}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #fafafa;
}
.container {
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 100vh;
}
.menu {
  background-color: #252525;
  padding: 2rem;
}
.page {
  padding: 2rem;
}

.color-red {
  color: red;
}

.menu h1 {
  color: #fafafa;
  font-weight: bolder;
}

.menu__options {
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu__options li {
  padding: 1rem 0;
}

.menu__options li a {
  color: #fafafa;
  font-weight: bolder;
}

/** Margins utils */

.mb-1 {
  margin-bottom: 1rem;
}
.mb-1-5 {
  margin-bottom: 1.5rem;
}
.mb-2 {
  margin-bottom: 2rem;
}
</style>
