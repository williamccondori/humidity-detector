<template>
  <el-select
    v-model="locationId"
    clearable
    filterable
    remote
    reserve-keyword
    :remote-method="search"
    :loading="isloading"
    class="select"
    @change="change"
    placeholder="Search a location"
  >
    <el-option
      v-for="option in options"
      :key="option.magicKey"
      :label="option.text"
      :value="option.magicKey"
    >
    </el-option>
  </el-select>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      locationId: null,
      isloading: false,
      options: []
    }
  },
  methods: {
    async search(value) {
      try {
        const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&langCode=es&text=${value}`
        const { data } = await axios.get(url)
        this.options = data.suggestions
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.isloading = false
      }
    },
    async change(value) {
      try {
        const url = `http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&langCode=spa&outFields=*&magicKey=${value}`
        const { data } = await axios.get(url)
        const result = data.candidates[0]
        this.$emit('change', result)
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>

<style scoped>
.select {
  width: 100%;
}
</style>
