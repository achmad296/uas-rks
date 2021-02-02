<template>
  <div>
    <label :for="id">
      {{ label }}
      <i
        v-if="tooltipText"
        id="info"
        v-tooltip.top-start="tooltipText"
        class="material-icons"
        style="color: #00a1e4; padding: 0; margin-left: 4px"
      >
        info
      </i>
    </label>
    <div class="custom-input" :class="classes">
      <span
        v-if="prepend.length"
        class="prepend"
        :style="[!transparentPrepend && { background: '#ebeaea', paddingRight: '12px' }]"
      >
        {{ prepend }}
      </span>
      <span
        v-if="iconPrepend.length"
        class="prepend icon-prepend material-icons"
        :style="[!transparentPrepend && { background: '#ebeaea', paddingRight: '12px' }]"
      >
        {{ iconPrepend }}
      </span>
      <input
        v-if="isMoney"
        :id="id"
        ref="input"
        v-currency="currencyOptions"
        :name="id"
        :type="mutableType ? mutableType : 'text'"
        :value="value"
        v-bind="$attrs"
        :placeholder="placeholder"
        autocomplete="on"
        @input="handleInput"
        v-on="getListeners"
      />
      <input
        v-else
        :id="id"
        ref="input"
        :name="id"
        :type="mutableType ? mutableType : 'text'"
        :value="value"
        v-bind="$attrs"
        :placeholder="placeholder"
        autocomplete="on"
        @input="handleInput"
        v-on="getListeners"
      />
      <span v-if="!isPassword" class="material-icons normal-icon">check_circle</span>
      <span
        v-else-if="isPassword"
        style="color: #847f82"
        class="material-icons password-icon"
        @click="switchVisibility"
      >
        {{ visibility }}
      </span>
      <span v-if="append.length" class="append">{{ append }}</span>
    </div>
    <p class="caption">{{ caption }}</p>
  </div>
</template>

<script>
import { currencyOptions } from '../../utils/currencyOptions'
export default {
  name: 'BasicInput',
  inheritAttrs: false,
  props: {
    id: { type: String, required: true },
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    type: { type: String, default: '' },
    classes: { type: Object, default: () => ({}) },
    caption: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    isPassword: { type: Boolean, default: false },
    prepend: { type: String, default: '' },
    append: { type: String, default: '' },
    transparentPrepend: { type: Boolean, default: false },
    iconPrepend: { type: String, default: '' },
    tooltipText: { type: String, default: '' },
    isMoney: { type: Boolean, default: false }
  },
  data() {
    return {
      visibility: 'visibility_off',
      mutableType: this.type
    }
  },
  computed: {
    getListeners() {
      const { input, ...others } = this.$listeners
      return { ...others }
    },
    currencyOptions() {
      return this.isMoney && currencyOptions
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
    },
    switchVisibility() {
      this.mutableType = this.mutableType === 'password' ? 'text' : 'password'
      this.visibility = this.mutableType === 'password' ? 'visibility_off' : 'visibility'
    }
  }
}
</script>

<style scoped>
.material-icons.normal-icon {
  display: none;
}

label {
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: none;
  background: #fafbfc;
  padding: 8px 0px 8px 16px;

  font-family: 'Lato';
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
}

.OTP-input input {
  padding: 0 10px;
}

.custom-input {
  background: #fafbfc;
  border: 1px solid #d6d4d5;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  height: 37px;
}

.material-icons {
  padding: 10px;
  font-size: 16px;
}

.icon-prepend.material-icons {
  font-size: 20px;
  padding-right: 0;
}

::placeholder {
  color: #d6d4d5;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
}

.custom-input:focus-within {
  background: #fff;
  border: 1px solid #3c91e6;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
}

.is-valid.custom-input {
  border: 1px solid #3c91e6;
}

.is-valid.custom-input input {
  color: #3c91e6;
}

.is-valid .material-icons.normal-icon {
  display: inline;
  color: #d8e9fa;
}

.is-invalid.custom-input {
  background: #fafbfc;
  border: 1px solid #dd403a;
}

.is-invalid.custom-input input {
  color: #dd403a;
}

.caption {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  color: #847f82;
}

.is-invalid ~ .caption {
  color: #dd403a;
}

.password-icon {
  cursor: pointer;
}

.prepend {
  display: flex;
  align-items: center;
  padding-top: 6px;
  padding-bottom: 7px;
  padding-left: 12px;
  height: 100%;
  border-radius: 7px 0px 0px 7px;
  color: #847f82;
}

.append {
  padding: 6px 12px 7px;
  height: 100%;
  border-radius: 0px 7px 7px 0px;
  background: #ebeaea;
  color: #847f82;
}

/* Change the white to any color ;) */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  box-shadow: 0 0 0 30px white inset;
}

.is-valid input:-webkit-autofill {
  -webkit-text-fill-color: #3c91e6 !important;
}

.is-invalid input:-webkit-autofill {
  -webkit-text-fill-color: #dd403a !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

@media only screen and (max-width: 767px) {
  ::placeholder {
    font-size: 0.9em;
  }
}
</style>
