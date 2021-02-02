import Vue from 'vue'
import Vue2Editor, { Quill } from 'vue2-editor'

const Image = Quill.import('formats/image')
Image.className = 'img-wysiwyg'
Quill.register(Image, true)

Vue.use(Vue2Editor)
