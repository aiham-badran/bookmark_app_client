export const state = () => ({
  message:null,
  show_message:false,
})

export const getters = {
  state_message: (state)=> state.show_message,

  get_message: (state) => state.message
}

export const mutations = {
  set_message: (state,mes) => (state.message = mes),

  toggle_message:(state,s_mes)=>(state.show_message = s_mes),
}

export const actions ={
}
