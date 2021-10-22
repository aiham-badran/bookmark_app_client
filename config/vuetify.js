import colors from 'vuetify/es5/util/colors'
import ar from "../lang/ar/ar"
import en from "../lang/en/en"


export default {
  customVariables:['~/assets/variables.scss'],
  treeShake:true,
  rtl:false,
  lang:{
    locales:{ar,en},
    current:"en"
  },
  customVariables: ['~/assets/variables.scss'],
  theme: {
    dark: true,
    themes: {
      dark: {
        noColro: 'transparent',
        main:"#090b13",
        background: '#111525',
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      },
      light:{
        main:"#fff",
        background: "#fefefe",
        primary: colors.blue.lighten1,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      },
    }
  }
}


