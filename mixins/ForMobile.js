//
// this file has mixin for mobile version
//

// check if breakpoint is for mobile screen
// this mixin using computed for test breakpoint in vuetify if name is xs
export const isMobile = {
  computed: {
    isMobile: function () {
      // check if breakpoint is for mobile screen
      return this.$vuetify.breakpoint.name == 'xs'
    },
    isMobileOrTablet : function () {
      // check if breakpoint is for mobile screen
      return this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name =='sm'
    },
  },
}
