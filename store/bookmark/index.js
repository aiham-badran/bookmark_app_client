export const state = () => ({
  path: 'bookmarks/',
  bookmarks: [],
  bookmark: null,
  query: {},
  pages: {},
  create:false,
  detail: false,
  edit: false,
  archive: false,
  loading: false,
})

export const getters = {
  get_bookmarks: (state) => state.bookmarks,
  get_bookmark: (state) => state.bookmark,
  get_bookmark_pages: (state) => state.pages,

  // ----- bookmark -----

  create_state: (state) => state.create,
  detail_state: (state) => state.detail,
  edit_state: (state) => state.edit,
  archive_state: (state) => state.archive,

  //--- dialog ----

  loading_state: (state) => state.loading,
}
// --- getters ----

export const mutations = {
  path_config: (state, path) => (state.path = path),

  set_bookmarks: (state, data) => (state.bookmarks = data),
  set_bookmark: (state, data) => (state.bookmark = data),
  add_new_bookmark: (state, data) => state.bookmarks.push(data),

  remove_bookmark:(state,data)=>{
    let index = state.bookmarks.findIndex((value)=> value.id == data)
    state.bookmarks.splice(index,1)
  },

  update_bookmark: (state, data) => {
    let index = state.bookmarks.findIndex((value) => value.id == data.id)
    state.bookmarks.splice(index, 1, data)
    state.bookmark = data
  },

  // ----- bookmark ------

  set_pages: (state, bookmarks) =>
    (state.pages = {
      current_page:bookmarks.page_number,
      num_pages: bookmarks.number_of_pages,
      next: bookmarks.next_page_number,
      previous: bookmarks.previous_page_number,
    }),
  // ------- pages -------

  add_query: (state, query) => {
    Object.assign(state.query, query)
  },
  remove_query: (state, query) => {
    delete state.query[query]

  },
  // ----- query ------

  create_state_toggle: (state) => (state.create = !state.create),
  detail_state_toggle: (state) => (state.detail = !state.detail),
  edit_state_toggle: (state) => (state.edit = !state.edit),
  archive_state_toggle: (state) => (state.archive = !state.archive),
  //--- dialog ----

  set_loading_state: (state, loading) => (state.loading = loading),
}
// ---- mutations -----

export const actions = {
  async fetch_bookmarks({ state, commit }) {
    commit('set_loading_state', true)
    let bookmarks = await this.$axios.$get(state.path, {
      params: state.query,
      auth: {
        username: 'root',
        password: 'root',
      },
    })
    commit('set_pages', bookmarks)
    commit('set_bookmarks', bookmarks.data)
    commit('set_loading_state', false)
  },
  //----- fetch_bookmarks -----

  async current_bookmark({ state, commit }, id) {
    let bookmark = state.bookmarks.find((value) => value.id == id)
    if (bookmark) {
      commit('set_bookmark', bookmark)
    } else {
      await this.$axios
        .get(`bookmarks/${id}/`, {
          params: this.url_params,
          auth: {
            username: 'root',
            password: 'root',
          },
        })
        .then((res) => res.data)
        .then((data) => {
          commit('set_bookmark', data)
        })
    }
  },
  // ------- current_bookmark -----
}
// ------ actions -------
