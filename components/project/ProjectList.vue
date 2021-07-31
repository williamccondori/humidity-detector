<template>
  <div class="projects__container">
    <el-card shadow="hover" v-for="project in projects" :key="project.id">
      <div slot="header">
        <nuxt-link :to="`projects/${project.id}`">{{ project.name }}</nuxt-link>
      </div>
      <p>{{ project.description }}</p>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['projects'])
  }
}
</script>

<style scoped>
.projects__container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
