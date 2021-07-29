<template>
  <section>
    <header>
      <el-page-header @back="$router.push('/')" :content="title" />
      <el-divider />
    </header>
    <main>
      <slot />
    </main>
  </section>
</template>

<script>
export default {
  props: ['title']
}
</script>
