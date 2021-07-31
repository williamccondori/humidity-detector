<template>
  <div>
    <Menu />
    <div ref="search" class="option-panel">
      <h1 class="sidebar__title">BUSCAR LUGARES, MARCADORES Y COORDENADAS</h1>
      <el-input
        v-model="query"
        placeholder="Buscar..."
        class="mb-1"
        @change="search"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
      <el-card shadow="hover" class="mb-1">
        <div
          v-for="suggestion in suggestions"
          :key="suggestion.magicKey"
          class="suggestion"
        >
          <i class="el-icon-location-outline"></i>
          <button type="button" @click="zoomToLocation(suggestion.magicKey)">
            {{ suggestion.text }}
          </button>
        </div>
      </el-card>
    </div>
    <div ref="analitycs" class="option-panel">
      <h1 class="sidebar__title">HERRAMIENTAS ANALÍTICAS</h1>
      <el-card shadow="hover"> </el-card>
    </div>

    <section class="portal__container">
      <aside class="portal__options">
        <button class="item" @click="openSideBar('search')">
          <i class="el-icon-search"></i>
        </button>
        <button class="item" @click="openSideBar('analitycs')">
          <i class="el-icon-data-line"></i>
        </button>
      </aside>
      <Map />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import Menu from './../components/common/Menu.vue'
import Map from './../components/Map.vue'

export default {
  components: {
    Menu,
    Map
  },
  data: () => {
    return {
      query: '',
      suggestions: [],
      activities: [
        {
          content: 'Success',
          timestamp: '2018-04-11'
        },
        {
          content: 'Approved',
          timestamp: '2018-04-13'
        },
        {
          content: 'Event start',
          timestamp: '2018-04-15'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['SET_MAP_VIEW']),
    openSideBar(sideBarId) {
      const searchComponent = this.$refs[sideBarId]
      if (searchComponent) {
        searchComponent.classList.toggle('active')
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
    }
  }
}
</script>
