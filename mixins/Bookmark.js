//
// this file has mixin for bookmark action
//

//
//  return bookmark object using id
export const getBookmark = {
  methods:{
    async fetch_bookmark_by_id(){
      return await this.$axios.$get(`bookmarks/${this.b_id}/`, {
        params: this.url_params,
        auth: {
          username: 'root',
          password: 'root',
        },
      })
    }
  },
  computed: {
    async bookmark() {
      let data =  this.bookmarks.find((value) => value.id == this.b_id)
      if(data){
        console.log(data)
        return data
      }
      else {
        console.log('f',data)
        return  await this.fetch_bookmark_by_id()
      }
    },
    //---- bookmark ------
  },
}
