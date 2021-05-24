export const state = () => ({
  b_create_dialog:false,
})

export const getters =  {
  get_b_create_dialog: (state) => state.b_create_dialog,
}


export const mutations = {
  toggle_b_create_dialog:(state,toggle) => state.b_create_dialog = toggle
}
