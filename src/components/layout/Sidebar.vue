<template>
  <div class="sidebar-page">
  <section class="sidebar-layout">
          <b-sidebar
            position="static"
            type="is-light"
            open
        >
        </b-sidebar>
      </section>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
.sidebar-layout {
  display: flex;
  flex-direction: row;
  min-height: 100%;
  min-height: 100vh;
}
.b-sidebar {
  background-color: #232b38;
  width: 68px;
}
.is-mini-expand .menu-list a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>