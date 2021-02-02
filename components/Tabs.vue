<template>
  <div class="tabs">
    <div v-if="isSearch" class="tab-bar">
      <div
        v-for="(item, idx) in fixedTabs"
        :key="idx"
        class="tab-bar-item"
        :class="selectedTab === idx && 'active'"
        @click="changeTab(idx)"
      >
        {{ item.title }}
      </div>
    </div>
    <div v-else class="tab-bar">
      <div
        v-for="(item, idx) in tabs"
        :key="idx"
        class="tab-bar-item"
        :class="selectedTab === idx && 'active'"
        @click="changeTab(idx)"
      >
        {{ item.title }}
      </div>
    </div>
    <div v-if="isSearch" class="search-container">
      <basic-input
        id="search"
        v-model="searchValue"
        placeholder="Cari Nama Campaign Pinjamanmu"
        icon-prepend="search"
        transparent-prepend
        class="search-field"
      />
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabs: [],
      selectedTab: 0,
      searchValue: ''
    }
  },

  computed: {
    fixedTabs() {
      return this.tabs.slice(1)
    }
  },
  watch: {
    searchValue() {
      this.$emit('search-value-handler', this.searchValue)
    }
  },

  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.changeTab(0)
  },
  methods: {
    changeTab(idx) {
      this.selectedTab = idx
      this.$emit('change', idx)

      if (this.isSearch) {
        this.fixedTabs.forEach((tab, index) => {
          tab.isActive = index === idx
        })
      } else {
        this.tabs.forEach((tab, index) => {
          tab.isActive = index === idx
          tab.style.background = '#fff'
        })
      }
    }
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
}

.tab-bar {
  height: 56px;
  display: flex;
  background-color: #fff;
  border-radius: 16px 16px 0px 0px;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  overflow-x: auto;
  text-align: center;
}

.tab-bar-item {
  min-width: 90px;
  color: #847f82;
}

.tab-bar-item.active {
  color: #3c91e6;
  font-weight: bold;
}

.search-container {
  background-color: #fff;
  padding: 16px;
  border-radius: 0px 0px 16px 16px;
}

.tab-bar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
}

.tab-bar-item.active {
  border-bottom: 2px solid #3c91e6;
  color: #3c91e6;
}
</style>
