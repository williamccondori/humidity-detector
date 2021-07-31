<template>
  <secondary-page v-if="project" :title="project.name">
    <el-card shadow="none">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="My project" name="1">
          <table class="setting__table mb-1">
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{{ project.name }}</td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{{ project.description }}</td>
              </tr>
              <tr>
                <th>Location:</th>
                <td>
                  <el-tag>
                    {{ projectName }}
                  </el-tag>
                </td>
              </tr>
            </tbody>
          </table>
          <el-button plain size="small" type="warning" @click="openPortal">
            Open portal
          </el-button>
        </el-collapse-item>
        <el-collapse-item title="Settings" name="2">
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            size="small"
            @submit.native.prevent="updateProject"
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
                :loading="isloading"
                :remote-method="search"
                :placeholder="projectName"
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
        </el-collapse-item>
        <el-collapse-item title="Danger zone" name="3">
          <h5 class="setting__title">
            Delete this project
          </h5>
          <p class="setting__description">
            Once you delete a project, there is no going back. Please be
            certain.
          </p>
          <el-button plain size="small" type="danger" @click="deleteProject">
            Delete this project
          </el-button>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </secondary-page>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { DataStore } from '@aws-amplify/datastore'
import { Project } from '~/src/models'
import SecondaryPage from '~/components/common/SecondaryPage.vue'
export default {
  layout: 'admin',
  components: {
    SecondaryPage
  },
  data() {
    return {
      project: null,
      activeNames: ['1'],
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
      options: [],
      projectName: 'Not especified'
    }
  },
  async asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
  async fetch() {
    const project = await DataStore.query(Project, this.slug)
    this.project = { ...project }
    const { locationId: magicKey } = this.project
    const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&langCode=spa&outFields=*&magicKey=${magicKey}`
    const promise = await axios.get(url)
    if (promise.data) {
      this.projectName = promise.data.candidates[0].address
    }
    this.form = { ...project }
    this.form.locationId = null
  },
  methods: {
    ...mapActions(['getProjects']),
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
    async deleteProject() {
      try {
        this.$confirm('¿Desea cancelar la operación?').then(async () => {
          const project = await DataStore.query(Project, this.slug)
          DataStore.delete(project)
          this.$router.push({ name: 'projects' })
          this.$message.success('The project has been deleted successfully')
        })
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    async updateProject() {
      try {
        this.$refs.form.validate((x) => {
          if (!x) throw new Error('Check the required data')
        })
        const original = await DataStore.query(Project, this.slug)
        const project = Project.copyOf(original, (updated) => {
          updated.name = this.form.name
          updated.description = this.form.description
          updated.locationId = this.form.locationId
        })
        await DataStore.save(project)
        await this.getProjects()
        this.$router.push({ name: 'projects' })
        this.$message.success('The project has been updated successfully')
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    openPortal() {
      this.$router.push(`/projects/${this.slug}/portal`)
    }
  }
}
</script>

<style scoped>
.setting__table {
  border-collapse: collapse;
}
.setting__table th {
  text-align: initial;
}
.setting__table td,
.setting__table th {
  padding: 0.5rem 0;
  padding-right: 0.5rem;
}
.setting__title {
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0;
}
.setting__description {
  font-size: 0.8rem;
  font-weight: normal;
  margin: 0;
  margin-bottom: 1rem;
}
.location__search {
  width: 100%;
}
</style>
