<template>
  <div class="banner" :style="{ backgroundImage: `url(${fixedImage})` }">
    <div class="container">
      <div class="row">
        <div class="title col-12 col-md-7 col-xl-7">
          <h1>{{ items[currentSlide].title }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="subtitle col-12 col-sm-6 col-lg-6 col-xl-6">
          <body-1>
            {{ items[currentSlide].subtitle }}
          </body-1>
          <nuxt-link v-show="currentSlide < 2" to="/login">
            <y-btn :label="items[currentSlide].buttonTitle" class="carousel-btn" size="large"></y-btn>
          </nuxt-link>
        </div>
      </div>
      <transition name="fade">
        <div class="status">
          <div
            id="0"
            class="dot active"
            @click="
              clr()
              changeSlide(0)
            "
          ></div>
          <div
            id="1"
            class="dot"
            @click="
              clr()
              changeSlide(1)
            "
          ></div>
          <div
            id="2"
            class="dot"
            @click="
              clr()
              changeSlide(2)
            "
          ></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import itemImage1 from '~/assets/images/homepage/banner-slider-1.png'
import itemImage2 from '~/assets/images/homepage/banner-slider-2.png'
import itemImage3 from '~/assets/images/homepage/banner-slider-3.png'
import itemImageMobile1 from '~/assets/images/homepage/banner-slider-mobile-1.png'
import itemImageMobile2 from '~/assets/images/homepage/banner-slider-mobile-2.png'
import itemImageMobile3 from '~/assets/images/homepage/banner-slider-mobile-3.png'

export default {
  data() {
    return {
      currentSlide: 0,
      timer: 0,
      items: [
        {
          image: itemImage1,
          imageMobile: itemImageMobile1,
          title: 'Solusi Permodalan UMKM Indonesia',
          subtitle: 'Kembangkan usaha Anda melalui Yubibursa. Ajukan pinjaman dengan bagi hasil sesuai kesepakatan.',
          buttonTitle: 'Ajukan Pinjaman'
        },
        {
          image: itemImage2,
          imageMobile: itemImageMobile2,
          title: 'Bergabung bersama Memajukan UMKM',
          subtitle: 'Bantu UMKM mengembangkan usahanya. Mulai pendanaan dan dapatkan bagi hasil sesuai kesepatakan.',
          buttonTitle: 'Mulai Danai'
        },
        {
          image: itemImage3,
          imageMobile: itemImageMobile3,
          title: 'Membangun Ekonomi Syariah',
          subtitle:
            'Menggunakan prinsip-prinsip syariah. Tanpa bunga, tanpa riba, untuk mencapai keadilan dan kesejahteraan bersama.'
        }
      ]
    }
  },
  computed: {
    fixedImage() {
      return this.$mq === 'xs' || this.$mq === 'sm'
        ? this.items[this.currentSlide].imageMobile
        : this.items[this.currentSlide].image
    }
  },

  mounted() {
    this.changeSlide(0)
  },

  methods: {
    clr() {
      clearTimeout(this.timer)
    },
    changeSlide(idx) {
      const status = document.getElementsByClassName('dot')
      status[this.currentSlide].className = 'dot'
      this.currentSlide = idx
      status[idx].className = 'dot active'
      if (this.currentSlide === 2) {
        this.timer = setTimeout(() => this.changeSlide(0), 5000)
      } else if (this.currentSlide < 2) {
        this.timer = setTimeout(() => this.changeSlide(this.currentSlide + 1), 5000)
      }
    }
  }
}
</script>

<style scoped>
.banner {
  height: 540px;
  background: #d8e9fa;
  background-position: center;
  background-size: cover;
  position: relative;
}

.title {
  margin-top: 80px;
}

.dot {
  cursor: pointer;
  padding-right: 10px;
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: white;
}

.subtitle p {
  margin-top: 10px;
  margin-bottom: 24px;
}

.dot.active {
  width: 32px;
  border-radius: 10px;
  background: #3c91e6;
}

.status {
  position: absolute;
  bottom: 14px;
}

@media only screen and (max-width: 767px) {
  .banner {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 65%;
    text-align: center;
    width: 100%;
    height: 1000px;
    background-position: top left;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .title {
    margin-top: 8rem;
  }

  .subtitle {
    margin: auto;
  }

  .carousel-btn {
    margin: auto;
  }

  .status {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  }
}

@media only screen and (max-width: 570px) {
  .banner {
    padding-top: 58%;
    height: 740px;
  }
}

@media only screen and (max-width: 429px) {
  .banner {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 290px;
    text-align: center;
    width: 100%;
    height: 630px;
    background-position: top;
  }

  .title {
    margin-top: 40px;
  }

  .title h1 {
    font-size: 24px;
  }

  .subtitle p {
    font-size: 16px;
  }

  .carousel-btn {
    margin: auto;
  }

  .status {
    position: absolute;
    margin: auto;
    margin-top: 10px;
  }
}
</style>
