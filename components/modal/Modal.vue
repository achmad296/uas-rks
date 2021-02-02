<template>
  <!-- The Modal -->
  <div ref="outsideModal" :class="displayModal" class="modal" @click="select($event)">
    <!-- Modal content -->
    <div class="container modal-content" :class="modalContentStyle">
      <div class="row align-items-center">
        <div class="modal-title col-12 text-center" style="margin-bottom: 21px">
          <span class="closeBtn material-icons" @click="setNonActiveModal">close</span>
          <subtitle-1 class="title">
            {{ title }}
          </subtitle-1>
        </div>
        <div class="col-12 mb-16"><div class="seperator"></div></div>
        <div class="col-12">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeModal: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    displayModal() {
      return this.activeModal ? 'display-block' : 'display-none'
    },
    modalContentStyle() {
      return this.$mq === 'xs' ? 'br-none h-100 py-16' : 'my-32 br-16 pt-21 pb-16'
    }
  },
  methods: {
    select(event) {
      if (event.target === this.$refs.outsideModal) {
        this.setNonActiveModal()
      }
    },
    setNonActiveModal() {
      this.$emit('update:activeModal', false)
    }
  }
}
</script>

<style scoped>
/* The Modal (background) */
.display-none {
  display: none;
}
.display-block {
  display: block;
}
.modal {
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fff;
  max-width: 600px;
  border: 1px solid #888;
}

.h-100 {
  min-height: 100%;
}

.pt-21 {
  padding-top: 21px;
}

.title {
  margin-left: 27px;
}

.closeBtn {
  margin-right: 5px;
  float: right;
  margin-top: 2px;
  font-size: 22px;
  font-weight: bold;
}

.closeBtn:hover {
  cursor: pointer;
}
</style>
