<template>
  <LayoutPinjamanPendanaan :context="pendanaan" />
</template>

<script>
export default {
  data() {
    return {
      pendanaan: {
        header: {
          title: 'Ayo bantu UMKM mengembangkan usahanya.',
          desc: 'Danai sekarang dan dapatkan bagi hasil yang menarik tanpa riba.',
          btnText: 'Mulai Danai'
        },
        process: {
          title: '3 Langkah Pendanaan',
          content: [
            {
              name: '1. Registrasi',
              desc: 'Melakukan pendaftaran di website Yubibursa sebagai Pendana',
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/pendanaan-process-1.png')
              },
              alt: 'pendanaan-process-1-yubibursa'
            },
            {
              name: '2. Verifikasi Data',
              desc: 'Melakukan verifikasi data menggunakan KTP dan NPWP',
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/pendanaan-process-2.png')
              },
              alt: 'pendanaan-process-2-yubibursa'
            },
            {
              name: '3. Beri Pendanaan',
              desc: 'Memberikan pinjaman kepada peminjam.',
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/pendanaan-process-3.png')
              },
              alt: 'pendanaan-process-3-yubibursa'
            }
          ]
        },
        benefit: {
          title: 'Apa sih Keuntungannya?',
          quotesImg() {
            return require('~/assets/images/lp-pinjaman-pendanaan/quotes-red.svg')
          },
          content: [
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pendanaan-1.png')
              },
              alt: 'benefit-pendanaan-1-yubibursa',
              desc: 'Menggunakan Konsep Syariah tanpa bunga.'
            },
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pendanaan-2.png')
              },
              alt: 'benefit-pendanaan-2-yubibursa',
              desc: 'Pendanaan  cepat, mudah dan aman secara online.'
            },
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pendanaan-3.png')
              },
              alt: 'benefit-pendanaan-3-yubibursa',
              desc: 'Pendanaan  cepat, mudah dan aman secara online.'
            },
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pendanaan-4.png')
              },
              alt: 'benefit-pendanaan-4-yubibursa',
              desc: 'Bagi hasil  menarik dengan keuntungan yang telah disepakati.'
            },
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pendanaan-5.png')
              },
              alt: 'benefit-pendanaan-5-yubibursa',
              desc: 'Membantu bisnismu menjadi lebih berkembang.'
            }
          ]
        },

        style: {
          headerSectionStyle: {
            background: '#FEFAFA',
            backgroundImage: 'url(' + require('~/assets/images/lp-pinjaman-pendanaan/header-pendanaan.png') + ')',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover'
          },
          headerSectionMobileStyle: {
            background: '#FEFAFA',
            backgroundImage:
              'url(' + require('~/assets/images/lp-pinjaman-pendanaan/header-pendanaan-mobile.png') + ')',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover'
          },

          processSectionStyle: {
            background: 'linear-gradient(0deg, #D30000 0%, #EFA3A3 100%)',
            backgroundImage: 'url(' + require('~/assets/images/lp-pinjaman-pendanaan/bg-process-pendanaan.png') + ')',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover'
          },

          processSectionMobileStyle: {
            background: 'linear-gradient(0deg, #D30000 0%, #EFA3A3 100%)',
            backgroundImage:
              'url(' + require('~/assets/images/lp-pinjaman-pendanaan/bg-process-pendanaan-mobile.png') + ')',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover'
          },

          benefitCardStyle: {
            background: '#FBE5E5'
          }
        }
      }
    }
  }
}
</script>

<style></style>
