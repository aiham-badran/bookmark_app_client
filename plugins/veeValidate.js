import Vue from "vue";
import { extend, ValidationProvider, ValidationObserver,localize  } from "vee-validate";
import { required, max,regex } from "vee-validate/dist/rules";
import ar from "vee-validate/dist/locale/ar"
import en from "vee-validate/dist/locale/en"


Vue.component('validation-provider',ValidationProvider);
Vue.component('validation-observer',ValidationObserver);

extend('required',required)
extend('max', max);
extend("url",value=>{
  //checking if the text input is url using regex
  let regex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9\-\_\.]+)\.([a-zA-Z]{2,})(\/?)[.\S]*$/i;
  return regex.test(value)
})

localize({
  en:{
    messages:{
      ...en.messages,
      url:"{_field_} is not valid"
    },

  },
  ar:{
    messages:{
      ...ar.messages,
      url:"{_field_} المدخل غير صالح"
    }
  }
})

let VEELOCALE = 'en'

Object.defineProperty(Vue.prototype,'veelocale',{
  get(){
    return VEELOCALE
  },
  set(val){
    VEELOCALE = val;
    localize(val)
  }
})
