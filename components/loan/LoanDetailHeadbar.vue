<template>
  <div class="headbar">
    <div class="nav">
      <nuxt-link to="/peminjam/pinjaman" style="color: #000">
        <span class="material-icons"> keyboard_backspace </span>
      </nuxt-link>
      <h3>{{ campaignDetail.title }}</h3>
      <!-- To make it center while flex can be specified with margin: auto, because it also take the rest of item -->
      <nuxt-link to="/peminjam/pinjaman" class="dummy" style="color: #000">
        <span class="material-icons"> keyboard_backspace </span>
      </nuxt-link>
    </div>
    <caption-1 style="margin-top: 12px"
      >Dibuat : {{ $moment(campaignDetail.rec_time_create).format('DD MMM YYYY') }}</caption-1
    >
    <status-badge :variant="variant" :status-value="statusMessage"></status-badge>
    <div class="progress-yubi">
      <p class="body3" style="margin-right: 8px">Terkumpul</p>
      <subtitle-2 :style="textColor">Rp {{ campaignDetail.balance.toLocaleString('id-ID') }} </subtitle-2>
      <div class="percentage">
        <subtitle-2 :style="textColor"> {{ percentageValue }}% </subtitle-2>
      </div>
    </div>
    <div class="progress-bar-yubi">
      <div class="bg">
        <div class="progress-value" :style="{ width: `${percentageValue}%`, background: progressBg }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    campaignDetail: { type: Object, default: () => ({}) }
  },

  computed: {
    statusMessage() {
      switch (this.campaignDetail.status) {
        case 'REVIEW':
          return 'Peninjauan'

        case 'FUNDING':
          return 'Pendanaan'

        case 'COLLECTED':
          return 'Terkumpul'

        case 'ON_PROGRESS':
          return 'Berjalan'

        case 'FINISH':
          return 'Selesai'

        case 'CANCEL':
          return 'Dibatalkan'

        default:
          return ''
      }
    },

    textColor() {
      switch (this.campaignDetail.status) {
        case 'REVIEW': {
          return {
            color: '#3C91E6'
          }
        }

        case 'FUNDING': {
          return {
            color: '#3C91E6'
          }
        }

        case 'COLLECTED': {
          return {
            color: '#00CC66'
          }
        }

        case 'FINISH': {
          return {
            color: '#847F82'
          }
        }

        case 'ON_PROGRESS': {
          return {
            color: '#00CC66'
          }
        }

        case 'CANCEL': {
          return {
            color: '#F5B700'
          }
        }

        default:
          return ''
      }
    },

    variant() {
      switch (this.campaignDetail.status) {
        case 'REVIEW':
          return 'info'

        case 'FUNDING':
          return 'info'

        case 'COLLECTED':
          return 'collected'

        case 'FINISH':
          return 'success'

        case 'ON_PROGRESS':
          return 'collected'

        case 'CANCEL':
          return 'danger'

        default:
          return ''
      }
    },

    percentageValue() {
      if (this.campaignDetail.balance === 0 && this.campaignDetail.plafon_value === 0) return 100
      return (this.campaignDetail.balance * 100) / this.campaignDetail.plafon_value
    },

    progressBg() {
      switch (this.campaignDetail.status) {
        case 'REVIEW':
          return '#3C91E6'

        case 'FUNDING':
          return '#3C91E6'

        case 'COLLECTED':
          return '#00CC66'

        case 'FINISH':
          return '#847F82'

        case 'ON_PROGRESS':
          return '#00CC66'

        case 'CANCEL':
          return '#F5B700'

        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
.headbar {
  display: flex;
  text-align: center;
  flex-direction: column;
  background-color: #fff;
  padding: 16px 24px;
}

a {
  display: flex;
  align-items: center;
}

a.dummy {
  visibility: hidden;
  margin-left: auto;
}

.nav {
  display: flex;
}

.caption1 {
  color: #847f82;
}

h3 {
  margin-left: auto;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
}

.status-badge {
  margin: auto;
  width: max-content;
  margin-top: 4px;
}

.progress-yubi {
  display: flex;
  flex-wrap: wrap;
}

.progress-bar-yubi .bg {
  background-color: #ebeaea;
  width: 100%;
  height: 12px;
  border-radius: 20px;
}

.progress-yubi .percentage {
  margin-left: auto;
}

.progress-bar-yubi .bg .progress-value {
  background-color: #3c91e6;
  height: 100%;
  z-index: 999;
  border-radius: 20px;
}

@media only screen and (max-width: 578px) {
  .status-badge {
    margin-bottom: 19px;
  }

  .nav {
    flex-direction: column;
  }

  h3 {
    margin-right: auto;
  }

  .dummy {
    display: none;
  }
}

@media only screen and (max-width: 324px) {
  .progress-yubi {
    flex-direction: column;
  }

  .progress-yubi .percentage {
    margin-left: 0;
  }
}
</style>
