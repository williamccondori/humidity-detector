<template>
  <secondary-page title="My projects">
    <el-card shadow="none">
      <el-button
        plain
        size="small"
        type="primary"
        class="mb-1-5"
        @click="createProject"
      >
        New project
      </el-button>
      <project-list />
      <create-project-drawer />
    </el-card>
  </secondary-page>
</template>

<script>
import { mapActions } from 'vuex'
import SecondaryPage from '../../components/common/SecondaryPage.vue'
import ProjectList from '../../components/project/ProjectList.vue'
import CreateProjectDrawer from '../../components/project/CreateProjectDrawer.vue'

export default {
  layout: 'admin',
  components: {
    SecondaryPage,
    ProjectList,
    CreateProjectDrawer
  },
  data() {
    return {}
  },
  async fetch() {
    try {
      await this.getProjects()
    } catch (error) {
      this.$message.error(error.message)
    }
  },
  methods: {
    ...mapActions(['setProjectDrawer', 'getProjects']),
    createProject() {
      this.setProjectDrawer(true)
    }
  }
}
</script>
