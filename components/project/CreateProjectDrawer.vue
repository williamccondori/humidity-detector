<template>
  <el-drawer
    title="New project"
    :visible.sync="isOpen"
    :before-close="confirmClose"
  >
    <div class="drawer__container">
      <el-form
        :model="form"
        ref="form"
        size="small"
        @submit.native.prevent="submit"
      >
        <el-form-item label="Name:">
          <el-input v-model="form.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Description:">
          <small class="color-red">Máximo 100 caractéres</small>
          <el-input
            type="textarea"
            :rows="2"
            :maxlength="100"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Location:">
          <location-search @change="selectLocation"></location-search>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Guardar</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { mapActions } from 'vuex'
import { DataStore } from '@aws-amplify/datastore'
import { Project } from '../../src/models'
import LocationSearch from '../common/LocationSearch.vue'
export default {
  components: {
    LocationSearch
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        location: null
      }
    }
  },
  computed: {
    isOpen: {
      get() {
        return this.$store.state.projectDrawer
      }
    }
  },
  methods: {
    ...mapActions(['setProjectDrawer', 'getProjects']),
    reset() {
      this.form = {
        name: '',
        description: '',
        location: null
      }
    },
    selectLocation(location) {
      if (location) {
        this.form.location = {
          name: location.address,
          center: location.location
        }
      } else {
        this.form.location = null
      }
    },
    async submit() {
      try {
        await DataStore.save(
          new Project({
            name: this.form.name,
            description: this.form.description,
            location: JSON.stringify(this.form.location)
          })
        )
        await this.getProjects()
        this.reset()
        this.setProjectDrawer(false)
        this.$message.success('El proyecto se ha creado correctamente')
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    async confirmClose() {
      this.$confirm('¿Desea cancelar la operación?').then(() => {
        this.reset()
        this.setProjectDrawer(false)
      })
    }
  }
}
</script>

<style scoped>
.drawer__container {
  padding: 1rem;
}
</style>
