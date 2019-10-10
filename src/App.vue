<template>
 
<div> 
    <Loading v-if="loading"></Loading>
    <div id="app" v-else>
        <header>
            <main-header :shaded="!is404" v-if="headerVisible" />
        </header>
        <router-view @playerNeedsControls="toggleHeader" />
        <footer>
        <main-footer />
        </footer>
        
    </div>
 </div> 
  
</template>

<script>
  import Loading from '@/views/Loading';
  import MainHeader from './components/layout/Header';
  import MainFooter from './components/layout/Footer';

  const title = 'UNSHELTERED - Inspiring stories challenging misconceptions about disabilities';
  const description = 'UN-SHELTERED explores deeply a cross-section of lives touched by disabilities, revealing a sense of similarity as opposed to difference in the human experience. Unscripted, and with the sole purpose to change the way the wider world views people living with disabilities, UN-SHELTERED challenges the viewer to look closely at their own lives and preconceived opinions of equality and social change.';
  const imageUrl = '/us-logo-portrait.png';

  export default {
    components: {
      'main-footer': MainFooter,
      'main-header': MainHeader,
      Loading
    },
    data() {
      return {
        isActive: false,
        loading: true,
        headerVisible: true
      }
    },
    computed: {
      is404() {
        return this.$route.name === '404';
      }
    },
    created() {
      this.$store.dispatch("fetchVideos")
        .then(() => {
          this.loading = false;
          window.prerenderReady = true;
        })
    },
    methods: {
      toggleHeader(state) {
        this.headerVisible = state;
      }
    },
    watch: {
      '$route' (to, from) {
       this.headerVisible = true;
      }
    },
    metaInfo: {
      title: title,
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: description },
        { name: 'og:title', property: 'og:title', content: title },
        { name: 'og:description', property: 'og:description', content: description },
        { name: 'og:image', property: 'og:image', content: imageUrl }
      ]
    }
  }
</script>
<style lang="scss" >
@import 'style/variables';
@import '~normalize.css/normalize';
*{
  font-family: 'Source Sans Pro', sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:  #494C60;
  transition: margin-right .5s;
  overflow-x: hidden;
  position: relative;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
header {
  z-index: 999;
  position: relative;
}
</style>
