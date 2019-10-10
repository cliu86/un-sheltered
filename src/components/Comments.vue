<template>
  <div class="comments container">
    <vue-disqus 
      shortname="unsheltered" 
      :identifier="episode.url" 
      :title="episode.name"
      :url="url"></vue-disqus>
  </div>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus.vue'

export default {
  name: 'Comments',
  props: ['episode'],
  components: {
    VueDisqus
  },
  computed: {
    url() {
      return window.location.href;
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
  }
  @media (min-width: 1200px){
    .container {
        max-width: 1300px;
    }
  }
</style>