<template>
  <vue-editor
    id="editor"
    v-model="content"
    use-custom-image-handler
    :editor-toolbar="customToolbar"
    @image-added="handleImageAdded"
  />
</template>

<script>
export default {
  data() {
    return {
      content: '',
      customToolbar: [
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ['bold', 'italic', 'underline', 'strike'],
        ['image']
      ]
    }
  },
  watch: {
    content(val) {
      this.$emit('change', val)
    }
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      const formData = new FormData()
      formData.append('file', file)

      this.$repositories.business
        .uploadImage(this.$store.getters['user/getUserAccount'].id, formData)
        .then((result) => {
          const url = result.data.response.results[0].url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch((err) => {
          throw new Error(err)
        })
    }
  }
}
</script>

<style>
.ql-editor {
  max-height: 200px;
  overflow-y: auto;
}

.ql-container.ql-snow {
  max-width: 510px;
  overflow-x: auto;
}

@media only screen and (max-width: 991px) {
  .ql-container.ql-snow {
    max-width: 656px;
  }
}
</style>
