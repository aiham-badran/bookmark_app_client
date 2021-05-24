export const state = () => ({
  folders: [
    {
      id: 1,
      name: 'my page',
      icon:"mdi-folder",
      parent: null,
    },
    {
      id: 2,
      name: 'my work',
      icon:"mdi-bookmark",
      parent: null,
    },
    {
      id:3,
      name:"youtube",
      icon:"mdi-alarm-check ",
      parent:2
    }
  ],
})

export const getters =  {
  get_folders: (state) => state.folders,
}


export const mutations = {
}
