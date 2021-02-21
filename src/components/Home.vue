<template>
  <div class="container tile is-ancestor">
    <div class="tile is-8">
      <div class="tile is-parent is-vertical">
        <div class="container-header tile is-child">
          <div id="header-button-group">
            <section>
              <search-bar />
            </section>
          </div>
        </div>
        <div class="container-body tile is-child">
          <div class="columns" style="padding: 0 12px">
            <crypto-coin-graph class="column is-one-third" />
          </div>
        </div>
      </div>
    </div>
    <div class="side-panel tile is-parent is-vertical">
      <crypto-ranking class="tile is-child" />
      <crypto-total-hourly class="tile is-child" id="hourly-chart"/>
    </div>
  </div>
</template>

<script>
import SearchBar from './layout/SearchBar.vue'
import CryptoCoinGraph from './modules/CryptoCoinGraph.vue'
import CryptoRanking from './modules/CryptoRanking.vue'
import CryptoTotalHourly from './modules/CryptoTotalHourly.vue'



export default {
  name: 'Home',
  components: {
    CryptoRanking,
    CryptoCoinGraph,
    CryptoTotalHourly,
    SearchBar,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container.tile.is-ancestor {
  margin-left: 68px;
  margin-top: 0;
  max-width: 100%;
}
.container-header.tile.is-child {
  padding: 20px 15px;
  max-height: 70px;
  height: 100%;
  width: 100%;
}
.container-header #header-button-group {
  float: right;
}
.side-panel.tile.is-parent {
  background-color: #12161c;
  min-height: 100vh;
  height: 100%;
}

.crypto-ranking {
  max-height: 100%;
}

.tile.is-child#hourly-chart {
  margin: 10px 20px !important;
}
html {
    overflow: scroll;
    overflow-x: hidden;
}

</style>


