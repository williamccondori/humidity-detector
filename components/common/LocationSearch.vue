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
    :placeholder="placeholder"
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
  props: ['value'],
  data() {
    return {
      locationId: null,
      placeholder: 'Search a location',
      isloading: false,
      options: []
    }
  },
  watch: {
    value(value) {
      if (!value) {
        this.locationId = null
        this.placeholder = 'Search a location'
      } else {
        console.log(value)
        this.placeholder = value.name
      }
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
