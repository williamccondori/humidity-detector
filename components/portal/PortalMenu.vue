<template>
  <div class="menu">
    <button class="menu__item" @click="$router.back()">
      <i class="el-icon-arrow-left"></i>
    </button>
    <button class="menu__item" @click="openSideBar('search')">
      <i class="el-icon-search"></i>
    </button>
    <button class="menu__item" @click="openSideBar('downloader')">
      <i class="el-icon-download"></i>
    </button>
    <button class="menu__item" @click="openSideBar('statics')">
      <i class="el-icon-pie-chart"></i>
    </button>

    <!-- Search sidebar -->
    <div ref="search" class="sidebar">
      <el-button
        circle
        size="mini"
        type="primary"
        @click="closeSideBar('search')"
      >
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <h1 class="sidebar__title">Search locations</h1>
      <el-input
        v-model="query"
        placeholder="Search..."
        @change="search"
        class="mb-1"
      >
        <el-button slot="append" icon="el-icon-search" @click="search" />
      </el-input>
      <el-card shadow="none" class=" mb-1" v-if="suggestions.length > 0">
        <div
          v-for="suggestion in suggestions"
          :key="suggestion.magicKey"
          class="search__suggestion"
        >
          <i class="el-icon-location-outline"></i>
          <button type="button" @click="zoomToLocation(suggestion.magicKey)">
            {{ suggestion.text }}
          </button>
        </div>
        <el-button circle size="mini" type="danger" @click="clearSuggestions()">
          <i class="el-icon-delete"></i>
        </el-button>
      </el-card>
    </div>

    <!-- Statics sidebar -->
    <div ref="statics" class="sidebar">
      <el-button
        circle
        size="mini"
        type="primary"
        @click="closeSideBar('statics')"
      >
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <h1 class="sidebar__title">Statics</h1>
      <el-card class="results__container">
        <el-table :data="humidities">
          <el-table-column prop="name" label="Nombre" />
          <el-table-column prop="measure" label="Humidity" />
        </el-table>
      </el-card>
    </div>

    <!-- Downloader -->
    <div ref="downloader" class="sidebar">
      <el-button
        circle
        size="mini"
        type="primary"
        @click="closeSideBar('downloader')"
      >
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <h1 class="sidebar__title">Download satellite images</h1>
      <el-button type="primary" @click="searchSatelliteImages()" class="mb-1">
        <i class="el-icon-search"></i> Search new images
      </el-button>
      <el-card
        shadow="none"
        class="results__container mb-1"
        v-if="results.length > 0"
      >
        <p>
          <i>{{ results.length }} Images found</i>
        </p>
        <div class="results mb-1">
          <div
            v-for="result in results"
            :key="result.uuid"
            class="results__card"
          >
            <p><b>Títle:</b> {{ result.title }}</p>
            <p>
              <small
                ><i>{{ result.summary }}</i></small
              >
            </p>
            <p><b>Product type:</b> {{ result.producttype }}</p>
            <p><b>Processing level:</b> {{ result.processinglevel }}</p>
            <p>
              <b>Cloud cover percentage:</b> {{ result.cloudcoverpercentage }}
            </p>
            <el-button
              plain
              size="mini"
              type="success"
              @click="download(result.uuid)"
            >
              <i class="el-icon-download"></i> Download and process
            </el-button>
            <a :href="result.link" target="_blank">Direct download</a>
          </div>
        </div>
        <el-button circle size="mini" type="danger" @click="clearResults()">
          <i class="el-icon-delete"></i>
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      query: '',
      suggestions: [],
      results: [],
      humidities: []
    }
  },
  async mounted() {
    try {
      const { data } = await axios.get(
        'https://2jhd58eoci.execute-api.us-east-1.amazonaws.com/staging/results'
      )
      console.log(data)
      const resultsObject = data.Items
      this.humidities = resultsObject
    } catch (error) {}
  },
  methods: {
    ...mapMutations(['SET_MAP_VIEW']),
    openSideBar(sideBarId) {
      const sideBar = this.$refs[sideBarId]
      if (sideBar) {
        sideBar.classList.toggle('active')
      }
    },
    closeSideBar(sideBarId) {
      const sideBar = this.$refs[sideBarId]
      if (sideBar) {
        sideBar.classList.remove('active')
      }
    },
    async search() {
      const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&langCode=es&text=${this.query}`
      const { data } = await axios.get(url)
      if (data) {
        this.query = ''
        this.suggestions = data.suggestions
      }
    },
    async zoomToLocation(magicKey) {
      const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&langCode=spa&outFields=*&magicKey=${magicKey}`
      const { data } = await axios.get(url)
      const result = data.candidates[0]
      const location = [result.location.y, result.location.x]
      this.SET_MAP_VIEW(location)
    },
    clearSuggestions() {
      this.suggestions = []
    },
    async searchSatelliteImages() {
      try {
        const { data } = await axios.get(
          'https://2jhd58eoci.execute-api.us-east-1.amazonaws.com/staging/images'
        )
        const resultsObject = JSON.parse(data.body)
        const results = Object.keys(resultsObject).map(
          (key) => resultsObject[key]
        )
        this.results = results
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    clearResults() {
      this.results = []
    }
  }
}
</script>

<style scoped>
.menu {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #212121;
}
.menu__item {
  height: 60px;
  cursor: pointer;
  background: none;
  border: none;
}
.menu__item {
  color: white;
  font-weight: bolder;
}

/* Sidebar styles */

.sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  background-color: #212121;
  min-height: 100vh;
  width: 40%;
  z-index: 9999; /** Leaflet z-index */
  padding: 1rem;
}
.sidebar.active {
  left: 0;
}
.sidebar__title {
  font-size: 1rem;
}

/* Search styles */

.search__suggestion {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
}
.search__suggestion i {
  color: #409eff;
}
.search__suggestion button {
  cursor: pointer;
  background: none;
  border: none;
  color: #212121;
  text-align: left;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.results__container {
  overflow-y: scroll;
  height: 600px;
}
.results__card p {
  margin: 0;
}
</style>
