export const state = () => ({
  lang: 'en',
  dir_rtl: false,
})

export const getters =  {
  lang: (state) => state.lang,
  // lang
  is_dir_rtl: (state) => state.dir_rtl
  //dri
}
