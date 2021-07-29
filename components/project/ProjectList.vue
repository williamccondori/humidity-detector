<template>
  <div class="projects__container">
    <el-card shadow="hover" v-for="project in projects" :key="project.id">
      <h1>{{ project.name }}</h1>
      <p>{{ project.description }}</p>
      <a :href="project.id">{{ project.id }}</a>
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
