import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import { ref } from 'vue'
import InterfaceGuide from './InterfaceGuide.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.provide('guide-interface', ref('web'))
    app.component('InterfaceGuide', InterfaceGuide)
  },
}
