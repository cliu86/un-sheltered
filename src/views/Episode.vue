<template>
  <section class="hero-video-wrapper">
    <div class="episode" @mouseover="hover = true" @mouseout="hover = false">

      <div class="video-player-wrapper">
            <video-player 
            v-if="hasEpisode"
            width="100%" 
            class="us-video" 
            ref="videoPlayer" 
            :options="playerOptions"
            @statechanged="playerStateChanged($event)" 
            :playsinline="true">
            </video-player>
            <div v-show="showControlsAndHeader">
                <span class="video-previous video-controller" v-if="prevEpisode" @click="goToVideo(prevEpisode)">
                    <div class="video-previous-info video-controller-info">
                    {{ prevEpisode.name }}
                    </div>
                </span>
                <span class="video-next video-controller" v-if="nextEpisode"  @click="goToVideo(nextEpisode)">
                    <div class="video-next-info video-controller-info">
                    {{ nextEpisode.name }}
                    </div>
                </span>
            </div>
        </div>

      <div class="video-info-wrapper">
        <div class="video-info-wrapper__content">
          <div class="video-info-wrapper__content-container">
            <h1>{{episode.name}}</h1>
            <p>{{getTimeAgo(episode.created_time)}}</p>
            <div class="video-info-wrapper__content__user">
              <vue-goodshare-facebook class="facebook-share" :page_url="currentUrl" title_social="Share on Facebook" has_icon></vue-goodshare-facebook>
             <vue-goodshare-twitter class="twitter-share"
                            :page_url="currentUrl"
                            title_social="Share on Twitter"
                            has_icon 
                        ></vue-goodshare-twitter>
            </div>

            <div class="video-info-wrapper__content__video-info">
              <img src="../assets/icons/play-button.png">
              <span>{{episode.stats.plays }} </span>
              <img src="../assets/icons/like.png">
              <span>{{episode.metadata.connections.likes.total }} </span>
              <img src="../assets/icons/layers.png">
              <span>{{episode.metadata.connections.credits.total }} </span>
              <img src="../assets/icons/comment.png">
              <span>{{episode.metadata.connections.comments.total }} </span>
              <p class="video-description">{{episode.description}}</p>
              <p class="video-commentary">Commentary by {{episode.user.name }} </p>
            </div>
          </div>
        </div>
      </div>
      <!-- The comment section -->
      <Comments :episode="episode" v-if="!reloadingPlayer" />
    </div>
  </section>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'
  import 'videojs-vimeo/src/Vimeo';
  import 'videojs-youtube/dist/Youtube';
  import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
  import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'
  import Comments from '@/components/Comments';

  export default {
    components: {
      videoPlayer,
      VueGoodshareFacebook,
      VueGoodshareTwitter,
      Comments
    },
    data() {
      return {
        hover: true,
        reloadingPlayer: false,
        playing: false,
        videoHasBeenPlaying: false,
        playerOptions: {
          // videojs options
          autoplay: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          techOrder: ["youtube", "vimeo"],
          fluid: true,
          youtube: {
            modestbranding: 1
          },
          sources: [{
            type: "video/vimeo",
            src: `https://vimeo.com/${this.$route.params.id}`
          }]
        }
      }
    },
    computed: {
      showControlsAndHeader() {
          return !this.videoHasBeenPlaying || !this.playing;
      },
      hasEpisode() {
        return !this.reloadingPlayer && this.episode;
      },
      currentUrl() {
        return window.location.href;
      },
      prevEpisode() {
        const prev = this.$store.state.videos[this.$store.state.videos.indexOf(this.episode) - 1];
        if (prev) {
          return prev;
        }
        return null;
      },
      nextEpisode() {
        const next = this.$store.state.videos[this.$store.state.videos.indexOf(this.episode) + 1];
        if (next) {
          return next;
        }
        return null;
      },
      showTitle() {
        if (!this.playing) {
          return true;
        }
        return false;
      },
      episode() {
        return this.$store.getters.getEpisodeById(this.$store.state.route.params.id);
      }
    },
    methods: {
      playerStateChanged($event) {
        if ($event.play === true) {
          this.playing = true;
          setTimeout(() => {
             return this.videoHasBeenPlaying = true;
          }, 3000);
        }
        if ($event.pause === true) {
          this.videoHasBeenPlaying = this.playing = false;
        }
        this.$emit('playerStateChanged', this.playing);
        this.$emit('playerNeedsControls', this.showControlsAndHeader);
      },
      updatePlayerAndControls() {
        this.reloadingPlayer = true
        this.$nextTick(() => {
          const videoId = this.$store.getters.getVideoId(this.episode);
          this.$set(this.playerOptions.sources, 0, {
            type: "video/vimeo",
            src: `https://vimeo.com/${videoId}`
          });
          this.reloadingPlayer = false
        });
      },
      getTimeAgo(timestamp) {
        return moment(timestamp).fromNow();
      },
      goToVideo(video) {
        const videoId = this.$store.getters.getVideoId(video);
        this.$router.push({
          path: `/episodes/${videoId}`, 
        })
      },
    },
    watch: {
      '$route' (to, from) {
        this.updatePlayerAndControls()
      }
    }

    
  }
</script>
<style lang="scss" scoped>

  .hero-video-wrapper{
      
    .video-info-wrapper__content-container{
      width: 100%;
      margin-right: auto;
      margin-left: auto;
        @media (min-width: 1200px){
            max-width: 1300px;
        }
    }

    img.logo {
          width: 300px;
          height: auto;
    }
    .episode {
      position: relative;
      background-color: black;
    }
    h1.logo-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background: #fff;
      margin: 0;
      cursor: pointer;
    }
    .us-video .vjs-big-play-button {
      background-color: red;
      border: none;
      line-height: 1.5em;
      height: 1.5em;
      width: 1.5em;
    }

    /* -------------- Episode Navigation ----------------*/
    .video-player-wrapper{
        max-width: 1300px;
        margin: auto;
        position: relative;
    }

    .video-controller{
       height:2.5em;
       width:2.5em;
       position: absolute;
       background-size: contain;
       z-index: 2;
       top:43%;
       bottom:43%;
       @media (min-width:768px){
            height:4em;
            width:4em;
       }
       @media (min-width:992px){
            height:6em;
            width:6em;
       }
       cursor: pointer;
       transition: all .2s linear;
        &:hover{
            -webkit-transform: scale(1.15);
            -ms-transform: scale(1.15);
            transform: scale(1.15);
        }
    }
    .video-previous{
        background-image: url('../assets/icons/previous-red.svg');
        left:20px;
        @media (min-width:1430px){
            left:-5.5%;
            background-image: url('../assets/icons/previous.svg');
        }
        &:hover{
            .video-previous-info{
                display: inline-block;
            }
        }
    } 
    .video-next{
        background-image: url('../assets/icons/next-red.svg');
        right:20px;
        @media (min-width:1430px){
            right:-5.5%;
            background-image: url('../assets/icons/next.svg');
        }
        &:hover{
            .video-next-info{
                display: inline-block;
            }
        }
    }


    .video-controller-info{
       color:white;
       font-weight: bold;
       font-size: .6em;
        @media (min-width:992px){
            font-size: 1.2em;
       }
       height:2em;
       line-height:2em;
       width:20em;
       position: absolute;
       top:30%;
       bottom:30%;
       background:rgba(0,0,0,0.6);
    }
    .video-previous-info{
        left:110%;
        @media (min-width:1430px){
            left:85%;
        }
        display: none;
       
    }
    .video-next-info{
        right:110%;
        @media (min-width:1430px){
            right:85%;
        }
        display: none;
    }
    /* -------------- End of Episode Navigation ----------------*/

    .video-info-wrapper{
      width: 100%;
      background-color:#a21c35;
      display:flex;
      justify-content: center;
      align-items: center;
      padding-top: 1em;
      padding-bottom: 1em;
    }
    .video-info-wrapper__content{
        width:91%;
        height:auto;
        text-align:left;
        color: white;
    }

    .twitter-share{
      margin-left: 1em;
      @media (max-width:380px){
        margin-top: .5em;
        margin-left: 0;
      }
    }

    .video-info-wrapper__content__user img{
      width:22px;
      height:22px;
      top:.3em;
      margin-right: .3em;
      position:relative;
    }

    .video-info-wrapper__content__user span{
      margin-right: 1em;
    }

    /* -- For extra small phone like Iphone 5 and below -- */
    @media (max-width:336px){
      .video-info-wrapper__content__user{
        font-size: 0.9em;
      }
      .video-info-wrapper__content__user span{
      margin-right: .5em;
      }
    }
    .video-info-wrapper__content__video-info{
      margin-top:2.2em;
      width:100%;
    }

  

    .video-info-wrapper__content__video-info img{
      width:22px;
      height:22px;
      top:.4em;
      margin-right: .3em;
      position:relative;
    }

    .video-info-wrapper__content__video-info span{
      margin-right: 2em;
      margin-left: .5em;
    }

    @media (min-width:992px){
      .video-info-wrapper__content__video-info span{
        margin-right: 3.4em;
        margin-left: .5em;
      }
    }


    .video-info-wrapper__content__video-info p{
      margin-top: 3em;
      line-height: 1.65em;
      font-size: 1em;
    }

    @media (min-width:992px){
      .video-info-wrapper__content__video-info p{
        font-size: 1.2em;
      }
    }
  }

  




</style>