<template>
  <div id="map" class="map"></div>
</template>

<script>
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import { Project } from '../../../src/models'
import { DataStore } from '@aws-amplify/datastore'
import L from 'leaflet'
export default {
  layout: 'portal',
  data() {
    return {
      map: null,
      mapOptions: {
        center: [51.505, -0.09],
        zoom: 13
      }
    }
  },
  async asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
  computed: {
    mapView() {
      return this.$store.state.mapView
    }
  },
  watch: {
    mapView(value) {
      this.map.setView(value, 13)
    }
  },
  async mounted() {
    this.map = L.map('map', this.mapOptions)
    const accessToken =
      'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
    const baseMapUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`
    L.tileLayer(baseMapUrl).addTo(this.map)

    // Get the location info.
    const project = await DataStore.query(Project, this.slug)
    const { locationId: magicKey } = project
    const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&langCode=spa&outFields=*&magicKey=${magicKey}`
    const promise = await axios.get(url)
    if (promise.data) {
      const candidate = promise.data.candidates[0]
      this.map.setView([candidate.location.y, candidate.location.x], 15)
    }
  }
}
</script>

<style scoped>
.map {
  height: 100vh;
}
</style>
