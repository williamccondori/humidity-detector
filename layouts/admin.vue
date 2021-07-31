<template>
  <amplify-authenticator>
    <div class="container">
      <div class="menu">
        <h1>Menú</h1>
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
}
.page {
  padding: 2rem;
}

.color-red {
  color: red;
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
