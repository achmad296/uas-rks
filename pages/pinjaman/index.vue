<template>
  <LayoutPinjamanPendanaan :context="pinjaman" />
</template>

<script>
export default {
  data() {
    return {
      pinjaman: {
        header: {
          title: 'Ayo kembangkan usahamu dengan Yubibursa.',
          desc: 'Dapatkan pinjaman dengan bagi hasil sesuai kesepakatan.',
          btnText: 'Ajukan Pinjaman'
        },
        process: {
          title: '3 Langkah Peminjaman',
          content: [
            {
              name: '1. Registrasi',
              desc: 'Melakukan pendaftaran di website Yubibursa sebagai Peminjam',
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/pinjaman-process-1.png')
              },
              alt: 'pinjaman-process-1-yubibursa'
            },
            {
              name: '2. Verifikasi Data',
              desc: 'Melakukan verifikasi data menggunakan KTP dan NPWP',
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/pinjaman-process-2.png')
              },
              alt: 'pinjaman-process-2-yubibursa'
            },
            {
              name: '3. Ajukan Pinjaman',
              desc: 'Mengajukan peminjaman melalui dashboard Yubibursa.',
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/pinjaman-process-3.png')
              },
              alt: 'pinjaman-process-3-yubibursa'
            }
          ]
        },
        benefit: {
          title: 'Apa sih Keuntungannya?',
          quotesImg() {
            return require('~/assets/images/lp-pinjaman-pendanaan/quotes.svg')
          },
          content: [
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pinjaman-1.png')
              },
              alt: 'benefit-pinjaman-1-yubibursa',
              desc: 'Menggunakan Konsep Syariah tanpa bunga.'
            },
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pinjaman-2.png')
              },
              alt: 'benefit-pinjaman-2-yubibursa',
              desc: 'Pengajuan pinjaman dana cepat, mudah dan aman secara online.'
            },
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pinjaman-3.png')
              },
              alt: 'benefit-pinjaman-3-yubibursa',
              desc: 'Durasi pinjaman lebih fleksibel atau dapat disesuaikan.'
            },
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pinjaman-4.png')
              },
              alt: 'benefit-pinjaman-4-yubibursa',
              desc: 'Bagi hasil menarik dengan keuntungan yang telah disepakati.'
            },
            {
              img() {
                return require('~/assets/images/lp-pinjaman-pendanaan/benefit-pinjaman-5.png')
              },
              alt: 'benefit-pinjaman-5-yubibursa',
              desc: 'Membantu bisnismu menjadi lebih berkembang.'
            }
          ]
        },

        style: {
          headerSectionStyle: {
            background: '#ebf4fc',
            backgroundImage: 'url(' + require('~/assets/images/lp-pinjaman-pendanaan/header-pinjaman.png') + ')',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover'
          },
          headerSectionMobileStyle: {
            background: '#ebf4fc',
            backgroundImage: 'url(' + require('~/assets/images/lp-pinjaman-pendanaan/header-pinjaman-mobile.png') + ')',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover'
          },

          processSectionStyle: {
            background: 'linear-gradient(0deg, #3c91e6 0%, #8abdf0 100%)',
            backgroundImage: 'url(' + require('~/assets/images/lp-pinjaman-pendanaan/bg-process-pinjaman.png') + ')',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover'
          },

          processSectionMobileStyle: {
            background: 'linear-gradient(0deg, #3c91e6 0%, #8abdf0 100%)',
            backgroundImage:
              'url(' + require('~/assets/images/lp-pinjaman-pendanaan/bg-process-pinjaman-mobile.png') + ')',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover'
          },

          benefitCardStyle: {
            background: '#d8e9fa'
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
