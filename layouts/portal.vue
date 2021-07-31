<template>
  <main>
    <div class="portal">
      <div class="portal__menu">
        <portal-menu />
      </div>
      <div class="portal__content">
        <Nuxt />
      </div>

      <!--

  <div>

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
        -->
    </div>
  </main>
</template>

<script>
import PortalMenu from '~/components/portal/PortalMenu.vue'

export default {
  components: {
    PortalMenu
  }
}
</script>

<style scoped>
.portal {
  display: grid;
  grid-template-columns: 80px 1fr;
}
.portal__menu {
  background-color: #212121;
}
</style>
