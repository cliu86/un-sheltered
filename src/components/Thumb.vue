<template>
  <section class="thumb-container">
    <div @click="goToVideo(videoId)" class="thumb" :style="{backgroundImage:`url(${image})`}">
        <img class="thumb__play-button" src="../assets/play-button-2.svg" >
        <div class="title-meta-container">
          <div class="title-meta">
            <h3 v-text="title"></h3>
            <div class="meta">
                <span class="meta__item meta__item-date" v-text="timeAgo"></span>
                <span class="meta__item meta__item-duration" v-text="duration"></span>
            </div>    
          </div>
        </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Thumb',
  props: {
    videoId: String,
    image: String,
    title: String,
    duration: {},
    dateAdded: String
  },
  methods: {
    goToVideo(id) {
      this.$router.push({
        path: `/episodes/${id}`, 
      });
    }
  },
  computed: {
    timeAgo() {
      return moment(this.dateAdded).fromNow();
    }
  }
}
</script>
<style lang="scss" scoped>
 .thumb-container{
      div.thumb {
        background: #fff;
        background-size: cover;
        height: 12em;
        width: 19em;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        position: relative;
        padding: 1em;
        transition: all .2s linear;
        &:hover{
            transform: scale(1.35);
            z-index: 10;
            cursor: pointer;
            .title-meta {
            transform: translateY(0);
            transition: 0s all linear 0s;
            }
            .thumb__play-button{
            opacity: 1;
            transform: scale(1);
            }
            h3{
                animation: slideUp .7s;
                font-size: 1em;
                margin-bottom: .2em;
                margin-left: 1em;
            }
            div.meta{
                display: block;
                margin-left: 1.35em;
                font-size: .8em;
            }
        }
    }

    div.thumb:after {
      bottom: 0;
      left: 0;
      height: 50%;
      width: 100%;
      content: "";
      position: absolute;
      display: block;
      background: linear-gradient(to top, #333 0%, transparent 100%);
    }

    div.meta, h3 {
      text-align: left;
      z-index: 1;
      color: #fff;
      position: relative;
    }

    h3 {
      margin-bottom: 0.5em;
    }

    /* ------ The fade in  ----- */ 
    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    /* ------ The slide up  ----- */ 
    @keyframes slideUp {
        from { top: 8%; }
        to   { top: 0; }
    }
    .thumb__play-button{
        height: 50px;
        width: 50px;
        position: absolute;
        top: 50%;
        margin-top: -25px;
        margin-left: -25px;
        left: 50%;
        opacity: 0;
        transform: scale(0.85);
        transition: 0.2s all ease-in-out;
    }

    div.meta {
      opacity: 0.5;
    }

    div.meta > span {
      border-right: 1px solid #aaa;
      margin-right: 0.5em;
      padding-right: 0.5em;
    }
    div.meta > span:last-of-type {
      border-right: none;
      margin-right: 0;
      padding-right: 0;
    }

    .title-meta-container {
      display: block;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    .title-meta {
        transform: translateY(40%);
        transition: 0.2s all ease-in-out 0.2s;
    }
 }

</style>
