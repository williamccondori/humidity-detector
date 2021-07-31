<template>
  <div id="map"></div>
</template>

<script>
/* eslint-disable no-undef */
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
    const accessToken =
      'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
    const baseMapUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`

    this.map = L.map('map', this.mapOptions)
    L.tileLayer(baseMapUrl).addTo(this.map)

    const drawnItems = new L.FeatureGroup()
    this.map.addLayer(drawnItems)
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      }
    })
    this.map.addControl(drawControl)

    this.map.on('draw:created', (e) => {
      const layer = e.layer
      console.log(layer)
    })

    const satelital =
      'http://100.24.113.251:8080/geoserver/humidity-detector/wms'

    const myLayer1 = L.tileLayer(satelital, {
      version: '1.1.1',
      layers:
        'humidity-detector:S2B_MSIL2A_20210614T151709_N0300_R125_T18LUM_20210614T203753'
    }).addTo(this.map)

    const myLayer2 = L.tileLayer(
      'http://100.24.113.251:8080/geoserver/humidity-detector/wms',
      {
        version: '1.1.1',
        layers:
          'humidity-detector:S2B_MSIL2A_20210614T151709_N0300_R125_T18LUM_20210614T203753_NDVI'
      }
    ).addTo(this.map)

    L.control.sideBySide(myLayer1, myLayer2).addTo(this.map)
  }
}
</script>

<style scoped>
#map {
  height: 100vh;
}
</style>
