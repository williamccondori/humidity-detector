<template>
  <el-drawer
    title="New project"
    :visible.sync="isOpen"
    :before-close="confirmClose"
  >
    <div class="drawer__container">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        size="small"
        @submit.native.prevent="submit"
      >
        <el-form-item prop="name" label="Name:">
          <el-input v-model="form.name" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="Description:">
          <small class="color-red">Maximum 100 characters</small>
          <el-input
            type="textarea"
            :rows="2"
            :maxlength="100"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Location:" prop="locationId">
          <el-select
            v-model="form.locationId"
            remote
            clearable
            filterable
            reserve-keyword
            :remote-method="search"
            :loading="isloading"
            class="location__search"
          >
            <el-option
              v-for="option in options"
              :key="option.magicKey"
              :label="option.text"
              :value="option.magicKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" native-type="submit">
            Guardar
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { DataStore } from '@aws-amplify/datastore'
import { Project } from '../../src/models'
export default {
  data() {
    return {
      // Form rules properties.
      rules: {
        name: [
          {
            required: true,
            message: 'Name is required'
          }
        ],
        description: [
          {
            required: true,
            message: 'Description is required'
          }
        ],
        locationId: [
          {
            required: true,
            message: 'Location is required'
          }
        ]
      },
      // Form properties.
      form: {
        name: '',
        description: '',
        locationId: null
      },
      // Location properties.
      isloading: false,
      options: []
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
      this.$refs.form.resetFields()
    },
    async search(criteria) {
      try {
        const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&langCode=es&text=${criteria}`
        const { data } = await axios.get(url)
        this.options = data.suggestions
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.isloading = false
      }
    },
    async submit() {
      try {
        this.$refs.form.validate((x) => {
          if (!x) throw new Error('Check the required data')
        })
        await DataStore.save(new Project({ ...this.form }))
        await this.getProjects()
        this.reset()
        this.setProjectDrawer(false)
        this.$message.success('The project has been created successfully')
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    async confirmClose() {
      this.$confirm('Do you want to cancel this operation?')
        .then(() => {
          this.reset()
          this.setProjectDrawer(false)
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.drawer__container {
  padding: 1rem;
}
.location__search {
  width: 100%;
}
</style>
