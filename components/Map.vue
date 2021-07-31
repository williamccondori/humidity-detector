<template>
  <div id="map" class="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
export default {
  data() {
    return {
      map: null,
      mapOptions: {
        center: [51.505, -0.09],
        zoom: 13
      }
    }
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
  mounted() {
    this.map = L.map('map', this.mapOptions)
    const accessToken =
      'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
    const baseMapUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`
    L.tileLayer(baseMapUrl).addTo(this.map)
  }
}
</script>
