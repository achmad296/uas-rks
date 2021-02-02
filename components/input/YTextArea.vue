<template>
  <div>
    <label :for="id">{{ label }}</label>
    <textarea
      :id="id"
      :name="id"
      :value="value"
      v-bind="$attrs"
      :class="classes"
      :placeholder="placeholder"
      :style="textareaHeight"
      @input="handleInput"
      v-on="getListeners"
    />
    <p class="caption">{{ caption }}</p>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  inheritAttrs: false,
  props: {
    id: { type: String, default: '' },
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    classes: { type: Object, default: () => {} },
    caption: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    height: { type: String, default: '' }
  },
  computed: {
    getListeners() {
      const { input, ...others } = this.$listeners
      return { ...others }
    },

    textareaHeight() {
      return {
        minHeight: `${this.height}px`
      }
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
label {
  display: block;
}

textarea {
  resize: none;
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #d6d4d5;
  border-radius: 8px;
  background: #fafbfc;
}

textarea.is-invalid {
  color: #dd403a;
  border: 1px solid #dd403a;
}

textarea.is-valid {
  color: #3c91e6;
  border: 1px solid #3c91e6;
}

::placeholder {
  color: #d6d4d5;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
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
</style>
