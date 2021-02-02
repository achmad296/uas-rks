<template>
  <div>
    <Carousel />
    <div :class="section">
      <div class="row justify-content-center">
        <div class="col-12 col-md-11 col-lg-7">
          <p :class="sectionHeaderText">Kenal lebih dekat dengan Yubibursa</p>
          <p :class="this.$mq === 'sm' ? 'body2' : 'body1'" class="text-left">
            Yubibursa adalah platform Peer-to-Peer Lending berbasis syariah. Menghubungkan UMKM yang membutuhkan modal
            usaha dengan orang-orang yang bersedia meminjamkan dananya. Menggunakan prinsip syariah, Yubibursa
            menawarkan pinjaman dan bagi hasil bebas bunga, tanpa riba. Berada di bawah naungan Yukbisnis, Yubibursa
            memiliki visi untuk menciptakan sistem perekonomian mandiri yang rahmatan lil'alamiin.
          </p>
        </div>
        <div class="col-12 col-lg-5 d-flex">
          <img src="~assets/images/homepage/ilustrasi-yubibursa.svg" alt="ilustrasi-yubibursa" style="width: 100%" />
        </div>
      </div>
    </div>
    <div :class="section">
      <div class="row justify-content-around">
        <div :class="sectionHeader">
          <p :class="sectionHeaderText">Cara Kerja Yubibursa</p>
        </div>
        <div
          v-for="illustration in illustrations"
          :key="illustration.text"
          class="col-12 col-md-4 col-lg-2 text-center"
        >
          <img :src="illustration.img()" :alt="illustration.alt" />
          <body-2>{{ illustration.text }}</body-2>
        </div>
      </div>
    </div>
    <div :class="section">
      <div class="row justify-content-around">
        <div :class="sectionHeader">
          <p :class="sectionHeaderText">Mengapa Menggunakan Yubibursa?</p>
        </div>
        <div
          v-for="yubibursaBenefit in yubibursaBenefits"
          :key="yubibursaBenefit.title"
          class="col-12 col-md-6 col-xl-5 px-4"
        >
          <div class="blue-card">
            <div class="container" style="height: 100%">
              <div class="row" style="height: 13%">
                <h2 class="col-12 text-center">{{ yubibursaBenefit.title }}</h2>
              </div>
              <div class="row" style="height: 87%">
                <div class="container d-flex flex-column justify-content-between">
                  <div v-for="benefit in yubibursaBenefit.benefits" :key="benefit.text" class="row align-items-center">
                    <div class="col-3 text-center">
                      <img :src="benefit.img()" :alt="benefit.alt" />
                    </div>
                    <div class="col-9">
                      <body-2 class="black text-left">{{ benefit.text }}</body-2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="bgSubs">
      <div class="container">
        <div class="row">
          <div v-for="subscribeText in subscribeTexts" :key="subscribeText.text" class="col-12 col-md-6 col-lg-4 p-0">
            <div :class="cardSubs">
              <p :class="subsTitle">{{ subscribeText.text }}</p>
              <body-2>{{ subscribeText.desc }}</body-2>
              <nuxt-link to="/register">
                <y-btn :label="subscribeText.btnText" size="large" class="align-self-start" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="sectionNoIntro">
      <div class="row">
        <div :class="sectionHeader">
          <p :class="sectionHeaderText">Tanya Jawab Yubibursa</p>
        </div>
        <div v-for="faq in FAQs" :key="faq.title" :class="faqItem">
          <Collapse :title="faq.title" :desc="faq.desc" />
        </div>
      </div>
    </div>
    <div class="section"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: '',
    illustrations: [
      {
        text: '1. Melakukan pendaftaran dan mengajukan peminjaman.',
        img() {
          return require('../assets/images/homepage/ilustrasi-carakerja1-yubibursa.svg')
        },
        alt: 'ilustrasi-carakerja1-yubibursa'
      },
      {
        text: '2. Melakukan peninjauan atas pengajuan pinjaman.',
        img() {
          return require('../assets/images/homepage/ilustrasi-carakerja2-yubibursa.svg')
        },
        alt: 'ilustrasi-carakerja2-yubibursa'
      },
      {
        text: '3. Memberikan pinjaman dengan proses Crowdfunding.',
        img() {
          return require('../assets/images/homepage/ilustrasi-carakerja3-yubibursa.svg')
        },
        alt: 'ilustrasi-carakerja3-yubibursa'
      },
      {
        text: '4. Mendapatkan dana pinjaman yang diajukan.',
        img() {
          return require('../assets/images/homepage/ilustrasi-carakerja4-yubibursa.svg')
        },
        alt: 'ilustrasi-carakerja4-yubibursa'
      },
      {
        text: '5. Mendapatkan bagi hasil dengan keuntungan yang disepakati.',
        img() {
          return require('../assets/images/homepage/ilustrasi-carakerja5-yubibursa.svg')
        },
        alt: 'ilustrasi-carakerja5-yubibursa'
      }
    ],
    yubibursaBenefits: [
      {
        title: 'Pendana',
        benefits: [
          {
            text: 'Menggunakan Prinsip Syariah tanpa bunga.',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan1-pendana.svg')
            },
            alt: 'ilustrasi-keuntungan1-pendana'
          },
          {
            text: 'Pendanaan  cepat, mudah dan aman secara online. ',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan2-pendana.svg')
            },
            alt: 'ilustrasi-keuntungan2-pendana'
          },
          {
            text: 'Minimum investasi sebesar Rp. 100.000.',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan3-pendana.svg')
            },
            alt: 'ilustrasi-keuntungan3-pendana'
          },
          {
            text: 'Bagi hasil menarik dengan keuntungan yang telah disepakati.',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan4-pendana.svg')
            },
            alt: 'ilustrasi-keuntungan4-pendana'
          },
          {
            text: 'Membantu UMKM di Indonesia semakin berkembang.',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan5-pendana.svg')
            },
            alt: 'ilustrasi-keuntungan5-pendana'
          }
        ]
      },
      {
        title: 'Peminjam',
        benefits: [
          {
            text: 'Menggunakan Prinsip Syariah tanpa bunga.',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan1-peminjam.svg')
            },
            alt: 'ilustrasi-keuntungan1-peminjam'
          },
          {
            text: 'Pengajuan pinjaman dana cepat, mudah dan aman secara online.',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan2-peminjam.svg')
            },
            alt: 'ilustrasi-keuntungan2-peminjam'
          },
          {
            text: 'Durasi pinjaman lebih fleksibel atau dapat disesuaikan.',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan3-peminjam.svg')
            },
            alt: 'ilustrasi-keuntungan3-peminjam'
          },
          {
            text: 'Bagi hasil menarik dengan keuntungan yang telah disepakati.',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan4-peminjam.svg')
            },
            alt: 'ilustrasi-keuntungan4-peminjam'
          },
          {
            text: 'Membantu bisnismu menjadi lebih berkembang.',
            img() {
              return require('../assets/images/homepage/ilustrasi-keuntungan5-peminjam.svg')
            },
            alt: 'ilustrasi-keuntungan5-peminjam'
          }
        ]
      }
    ],
    subscribeTexts: [
      {
        text: 'Ingin jadi Peminjam?',
        desc: 'Daftar dan mulai ajukan pinjaman untuk mengembangkan usahamu.',
        btnText: 'Daftar Peminjam'
      },
      {
        text: 'Ingin jadi Pendana?',
        desc: 'Daftar dan bantu UMKM mengembangkan usahanya. Dapatkan bagi hasil yang menarik untuk Anda.',
        btnText: 'Daftar Pendana'
      }
    ],
    FAQs: [
      {
        title: 'Apa itu Peer-to-Peer Lending (P2PL)?',
        desc:
          'Peer-to-Peer Lending  (P2PL) adalah kegiatan menghubungkan orang yang memerlukan pinjaman (Peminjam) dengan orang yang memberikan pinjaman (Pendana).'
      },
      {
        title: 'Bagaimana cara mengajukan pembiayaan di Yubibursa?',
        desc:
          'Silakan daftarkan diri Anda melalui menu "Peminjam." Isi formulir dan unggah dokumen persyaratan. Kami akan meninjau permintaan Anda sebelum diteruskan ke pendana.'
      },
      {
        title: 'Apa perbedaan P2PL konvensional dan P2PL syariah?',
        desc:
          'Pada proses P2PL konvensional, peminjam akan dikenakan bunga dan pendana akan mendapat return dari uang yang dipinjamkannya. Pada P2PL syariah, pendana tetap bisa mendapatkan bagi hasil yang menarik, namun dengan akad dan skema syariah.'
      },
      {
        title: 'Apakah aman mendanai melalui Yubibursa?',
        desc: 'Tentu saja. Setiap peminjam yang ada di Yubibursa telah melewati proses seleksi dari kami.'
      },
      {
        title: 'Apa peran Yubibursa?',
        desc:
          'Yubibursa menyediakan platform untuk menghubungkan peminjam dan pendana. Kami juga akan menyeleksi siapa saja yang dapat mendaftar sebagai peminjam dan pendana di Yubibursa.'
      },
      {
        title: 'Siapa saja yang bisa menjadi pendana di Yubibursa?',
        desc: 'Pendana berusia minimal 17 tahun dengan status Warga Negara Indonesia.'
      },
      {
        title: 'Apakah semua bisnis dapat mengajukan pembiayaan di Yubibursa?',
        desc:
          'Untuk menjaga prinsip syariah dan value dari Yukbisnis sendiri, kami tidak menerima peminjam yang berasal dari industri rokok, minuman keras, obat terlarang, babi, perjudian, prositusi, ataupun kegiatan lain yang mengandung spekulasi.'
      },
      {
        title: 'Berapa minimal pendanaan yang dapat dilakukan di Yubibursa?',
        desc:
          'Karena pendanaan di Yubibursa menggunakan sistem crowdfunding, kamu bisa mendanai UMKM mulai dari Rp100.000 saja, sehingga siapa pun bisa menjadi pendana di Yubibursa.'
      }
    ]
  }),
  computed: {
    section() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'container section-mobile intro' : 'container section intro'
    },
    sectionHeader() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'col-12 text-center mb-3' : 'col-12 text-center mb-56'
    },
    sectionHeaderText() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'h2 mb-3' : 'h1 mb-3'
    },
    subsTitle() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'h3' : 'h2'
    },
    sectionNoIntro() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'container section-mobile' : 'container section'
    },
    bgSubs() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'bg-subscribe-mobile section-mobile' : 'bg-subscribe section'
    },
    cardSubs() {
      if (this.$mq === 'xs' || this.$mq === 'sm') {
        return 'card-subs-mobile d-flex flex-column justify-content-between'
      } else if (this.$mq === 'md') {
        return 'card-subs d-flex flex-column justify-content-around mx-2'
      } else if (this.$mq === 'lg') {
        return 'card-subs d-flex flex-column justify-content-around mr-3'
      } else {
        return 'card-subs d-flex flex-column justify-content-around mr-5'
      }
    },
    faqItem() {
      return this.$mq === 'xs' || this.$mq === 'sm' ? 'col-12 col-md-6' : 'col-12 col-md-6 mb-4'
    }
  }
}
</script>

<style scoped>
.spacing-seperator {
  margin-left: 10px;
  margin-right: 20px;
  color: #d6d4d5;
}

.section {
  margin-top: 180px;
}

.section-mobile {
  margin-top: 80px;
}

@media (max-width: 991px) {
  .intro {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .col-12 {
    margin-bottom: 24px;
  }
}

.vs-navbar__item {
  padding: 0;
}

.blue-card {
  background: #ebf4fc;
  border-radius: 16px;
  height: 488px;
  padding: 24px 5px;
}

.card-subs {
  height: 242px;
  background: #ebf4fc;
  border: 1px solid #8abdf0;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 24px;
}

.card-subs-mobile {
  height: 210px;
  background: #ebf4fc;
  border: 1px solid #8abdf0;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 16px;
}

.bg-subscribe-mobile {
  height: 684px;
  background: #d8e9fa;
  background-image: url('~assets/images/homepage/bg-subscribe-mobile.svg');
  background-position: center;
  background-size: cover;
  padding: 48px 16px 0 16px;
}

.bg-subscribe {
  height: 541px;
  background: #d8e9fa;
  background-image: url('~assets/images/homepage/bg-subscribe.svg');
  background-position: center;
  background-size: cover;
  padding: 82px 0;
}

.mb-56 {
  margin-bottom: 56px;
}
</style>
