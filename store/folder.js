export const state = () => ({
  folders: [],
  selected_folder:0,
  create:false,
})

export const getters =  {
  get_folders: (state) => state.folders,
  get_folder: (state)=>state.selected_folder,
  // ------- folder ------


  create_state:(state)=>state.create,
  // ------ dialog -------
}


export const mutations = {
  set_folders :(state,data) => state.folders = data,
  set_folder :(state,data)=> state.selected_folder = data,


  add_new_folder: (state, data) => state.folders.push(data),

  // update_bookmark: (state, data) => {
  //   let index = state.bookmarks.findIndex((value) => value.id == data.id)
  //   state.bookmarks.splice(index,1,data);
  //   state.bookmark = data
  // },
  // -------- folder -------

  create_state_toggle:(state)=>state.create = !state.create
  // -------- dialog--------
}
// ------- mutations -------


export const actions = {
}
// ------ actions --------


