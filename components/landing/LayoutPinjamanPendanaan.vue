<template>
  <div>
    <div :class="headerSection" :style="headerSectionStyle">
      <div :class="headerContent">
        <div class="row">
          <div class="col-12">
            <p :class="headerTitle">{{ context.header.title }}</p>
          </div>
          <div class="col-12">
            <p :class="headerDesc">{{ context.header.desc }}</p>
          </div>
          <div class="col-12">
            <nuxt-link to="/register">
              <y-btn :label="context.header.btnText" size="large" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div :class="processSection" :style="processSectionStyle">
      <div :class="processContainer">
        <div class="row">
          <div class="col-12">
            <p :class="processTitle">{{ context.process.title }}</p>
          </div>
          <div v-for="process in context.process.content" :key="process.name" class="col-12 col-md-4 mb-16">
            <img :src="process.img()" :alt="process.alt" />
            <h3 class="white mt-16 mb-8">{{ process.name }}</h3>
            <body-2 class="white">{{ process.desc }}</body-2>
          </div>
        </div>
      </div>
    </div>
    <div :class="benefitSection">
      <div :class="benefitContainer">
        <div class="row justify-content-center">
          <div class="col-12">
            <img :src="context.benefit.quotesImg()" alt="quotes" />
            <p :class="benefitTitle">{{ context.benefit.title }}</p>
          </div>
          <div v-for="benefit in context.benefit.content" :key="benefit.alt" class="col-12 col-sm-6 col-md-4">
            <div class="pt-32">
              <div :class="benefitCard" :style="context.style.benefitCardStyle">
                <img style="margin-top: -32px" class="mb-16" :src="benefit.img()" :alt="benefit.alt" />
                <div class="container">
                  <subtitle-1>{{ benefit.desc }}</subtitle-1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      style: {}
    }
  },
  computed: {
    headerSection() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'header-section-mobile' : 'header-section'
    },
    headerSectionStyle() {
      return this.$mq === 'xs' || this.$mq === 'sm'
        ? this.style.headerSectionMobileStyle
        : this.style.headerSectionStyle
    },
    headerContent() {
      return 'container text-center'
    },
    headerTitle() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'h2' : 'h1'
    },
    headerDesc() {
      return 'body1 my-24 black'
    },

    processSection() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'process-section-mobile' : 'process-section'
    },
    processSectionStyle() {
      return this.$mq === 'xs' || this.$mq === 'sm'
        ? this.style.processSectionMobileStyle
        : this.style.processSectionStyle
    },
    processContainer() {
      return 'container text-center'
    },
    processTitle() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'h3 white mb-32' : 'h2 white mb-47'
    },

    benefitSection() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'benefit-section-mobile' : 'benefit-section'
    },
    benefitContainer() {
      return 'container text-center'
    },
    benefitTitle() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'h3 mt-12 mb-32' : 'h2 mt-12 mb-64'
    },
    benefitCard() {
      if (this.$mq === 'xs' || this.$mq === 'sm') {
        return 'benefit-card benefit-card-bg mb-32'
      } else if (this.$mq === 'md') {
        return 'benefit-card-md benefit-card-bg mb-32'
      } else {
        return 'benefit-card benefit-card-bg mb-64'
      }
    }
  },
  mounted() {
    this.style = this.context.style
  }
}
</script>

<style>
.header-section {
  height: 370px;
  padding-top: 80px;
  background: #ebf4fc;
}

.header-section-mobile {
  height: 400px;
  padding-top: 60px;
  background: #ebf4fc;
}

.process-section {
  height: 603px;
  padding-top: 64px;
  margin-top: -3px;
  background: linear-gradient(0deg, #3c91e6 0%, #8abdf0 100%);
}

.process-section-mobile {
  height: 1218px;
  padding-top: 60px;
  background: linear-gradient(0deg, #3c91e6 0%, #8abdf0 100%);
}

.benefit-section {
  height: 893px;
  padding-top: 148px;
}

.benefit-section-mobile {
  padding-top: 80px;
  padding-bottom: 66px;
}

.benefit-card {
  height: 142px;
  border-radius: 16px;
}

.benefit-card-bg {
  background: #d8e9fa;
}

.benefit-card-md {
  height: 170px;
  border-radius: 16px;
}
</style>
