<template>
  <nuxt-link class="loan-card" :to="`pinjaman/${this.$vnode.key.toString()}`">
    <subtitle-1>{{ title }}</subtitle-1>
    <div class="status">
      <p class="body3">Tekumpul</p>
      <subtitle-2 class="collected-total" :style="textColor"
        >Rp {{ totalCollected.toLocaleString('id-ID') }}</subtitle-2
      >
      <subtitle-2 class="percentage" :style="textColor">{{ percentageValue }}%</subtitle-2>
    </div>
    <div class="progress-bar-yubi">
      <div class="bg">
        <div class="progress-value" :style="{ width: `${percentageValue}%`, background: progressBg }"></div>
      </div>
    </div>
    <div class="plafon-tenor">
      <div class="plafon">
        <p class="body3">Plafon</p>
        <subtitle-2 class="plafon-value">{{ plafonValue.toLocaleString('id-ID') }}</subtitle-2>
      </div>
      <div class="tenor">
        <p class="body3">Tenor</p>
        <subtitle-2 class="tenor-value"> {{ tenorValue }} Bulan </subtitle-2>
      </div>
    </div>
    <hr />
    <div class="footer">
      <caption-1 style="color: #847f82">Dibuat : {{ $moment(dateCreated).format('DD MMM YYYY') }}</caption-1>
      <status-badge :variant="variant" :status-value="convertedStatus"></status-badge>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    totalCollected: { type: Number, default: null },
    plafonValue: { type: Number, default: null },
    tenorValue: { type: Number, default: null },
    dateCreated: { type: Date, default: new Date() },
    status: { type: String, default: '' }
  },
  computed: {
    percentageValue() {
      if (this.totalCollected === 0 && this.plafonValue === 0) return 100
      return (this.totalCollected * 100) / this.plafonValue
    },
    convertedStatus() {
      switch (this.status) {
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
    variant() {
      switch (this.status) {
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
    textColor() {
      switch (this.status) {
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
    progressBg() {
      switch (this.status) {
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
.loan-card {
  padding: 16px;
  width: 100%;
  max-width: 341px;
  border-radius: 20px;
  background-color: #fff;
  cursor: pointer;
}

.loan-card:hover {
  cursor: pointer;
  background: #dad9d9;
}

.status {
  margin-top: 17px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  /* avoid inherited from main.css */
  padding: 0;
  border-radius: 0;
}

.collected-total {
  margin-left: 8px;
  color: #3c91e6;
}

.percentage {
  margin-left: auto;
  color: #3c91e6;
}

.progress-bar-yubi .bg {
  background-color: #ebeaea;
  width: 100%;
  height: 12px;
  border-radius: 20px;
}

.progress-bar-yubi .bg .progress-value {
  height: 100%;
  z-index: 999;
  border-radius: 20px;
}

.plafon-tenor {
  margin-top: 24px;
  display: flex;
}

.tenor {
  margin-left: 56px;
}

hr {
  margin-top: 16px;
  margin-bottom: 20px;
  border: 0.7px solid #ebeaea;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
