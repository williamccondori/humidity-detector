<template>
  <div class="menu">
    <div class="menu__container">
      <div class="menu__logo">Humity</div>
      <div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link menu__profile">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <span>
              William <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
