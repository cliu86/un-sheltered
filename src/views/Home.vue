<template>
    <div class="home">
        <Feature
        :title="featured.name"
        :video-id="$store.getters.getVideoId(featured)"
        :image="featured.pictures.sizes[6].link"
        :duration="'Duration: '+Math.floor(featured.duration/60) + ' minutes ' + featured.duration%60 + ' seconds'"
        :date-added="getDateTime(featured.created_time) + ' '"
        :views="featured.stats.plays +' views'"
        :comments =" featured.metadata.connections.comments.total +' comments'"
        />

        <div class="mobile-nav-bar" v-if="isMobile">
            <div class="mobile-nav-bar__inner-wrapper">
                <a class="video-icon" @click="mobileTabSelected = 'videos'" :class="{'video-icon--selected': mobileTabSelected === 'videos'}">
                       <p>VIDEOS</p>  
                </a> 
                <a class="info-icon" @click="mobileTabSelected = 'info'" :class="{'video-icon--selected': mobileTabSelected === 'info'}">    
                    <p>SERIES INFO</p>
                </a>    
            </div>     
        </div> 

        <div class="video-gallery" v-if="(mobileTabSelected === 'videos' && isMobile)">
            <div class="video-gallery__video" v-for="video in videos" :key="video.id">
                 <Thumb
                :title="video.name"
                :video-id="getId(video)"
                :image="video.pictures.sizes[3].link"
                :duration="Math.floor(video.duration/60) + 'm ' + video.duration%60 + 's'"
                :date-added="video.created_time" />
            </div>
            <div class="upcoming-episode-wrapper"  v-for="index in $store.getters.numUpcoming" :key="index">
                <router-link class="upcoming-episode" to="/subscribe">
                    <h1>Upcoming ...</h1>
                    <h3>Episode <span v-text="videos.length + index"></span> </h3>
                </router-link>
            </div>
        </div>

        <div class="swiper-slide-container" v-if="!isMobile">
            <swiper :options="swiperOptions" class="swiper-slide-content">
            <swiper-slide v-for="video in videos" :key="video.id">
                <Thumb
                :title="video.name"
                :video-id="getId(video)"
                :image="video.pictures.sizes[3].link"
                :duration="Math.floor(video.duration/60) + 'm ' + video.duration%60 + 's'"
                :date-added="video.created_time" />
            </swiper-slide>

            <swiper-slide v-for="index in $store.getters.numUpcoming" :key="index">
                <div class="upcoming-episode-wrapper">
                    <router-link class="upcoming-episode" to="/subscribe">
                        <h1>Upcoming ...</h1>
                        <h3>Episode <span v-text="videos.length + index"></span> </h3>
                    </router-link>
                </div>
            </swiper-slide>
           
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            </swiper>
        </div>

        <div class="info-wrapper" v-if="(mobileTabSelected === 'info' && isMobile) || !isMobile">
            <div class="info-wrapper__inner-wrapper">
                <v-container grid-list-lg >
                    <v-layout row>
                        <v-flex text-xs-center  class="info-wrapper-content">
                            <v-flex xs12 md4 class="info-wrapper__img">
                                <img :src="require('@/assets/us-logo-portrait.svg')" class="logo" />
                            </v-flex> 
                            <v-flex xs12 md8 class="info-wrapper__text">
                                <h2 class="info-content__title">The real and raw stories of people living with disabilities</h2>
                                <p class="info-content__text">
                                UN-SHELTERED explores deeply a cross-section of lives touched by disabilities, revealing a sense of similarity as 
                                opposed to difference in the human experience. Unscripted, and with the sole purpose to change the way the wider 
                                world views people living with disabilities, UN-SHELTERED challenges the viewer to look closely at their own lives
                                 and preconceived opinions of equality and social change.
                                </p>
                                <a @click="goToAbout()" class="info-content__button">ABOUT</a>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Feature from '@/components/Feature'
import Thumb from '@/components/Thumb'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'home',
  components: {
    Feature,
    Thumb,
    swiper,
    swiperSlide
  },
  data() {
    return {
      mobileTabSelected: 'videos',
    windowWidth: 0,
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
         breakpoints: { 
          480: { 
            slidesPerView: 1
          },
          850: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1320: {
            slidesPerView: 3,
            spaceBetween: 25
          }
        }
      }
    }
  },
  methods: {
    getId(video) {
      let uriParts = video.uri.split('/');
      return uriParts[2];
    },
    getDateTime(timestamp) {
        return moment(timestamp).format("MMMM D, YYYY")
    },
    goToJotForm() {
      this.$router.push({
        path: `/jotform`, 
      });
    },
    goToAbout() {
      this.$router.push({
        path: `/about`, 
      });
    },
    getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
    }
  },
  mounted() {
     this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      //Init
      this.getWindowWidth()
    })

  },
  computed: {
    isMobile() {
        if (this.windowWidth <= 768){
            return true;
        }
        return false;
    },
    videos() {
      return this.$store.state.videos;
    },
    featured() {
      return this.$store.state.videos.length ? this.$store.state.videos[0] : {};
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
      .logo {
        width: 500px;
        height: auto;
      }
      .swiper-slide-container{
        width: 100%;
        background: black; 
        position: relative;
        padding-top:-10em;
      }
      .swiper-slide{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
      }

      .upcoming-episode-wrapper{
            background-image:url('../assets/up-coming-video.png');
            background-size: contain;
            transition: all .2s linear;
            &:hover{
                -webkit-transform: scale(1.35);
                -ms-transform: scale(1.35);
                transform: scale(1.35);
                z-index: 10;
            }
        .upcoming-episode{
            height: 12em;
            width: 19em;
            background:rgba(0,0,0,0.61);
            text-decoration: none;
            color:white;
            display:flex;
            flex-direction:column;
            justify-content:center;
            cursor: pointer;
            span{
                margin-left: .25em;
            }
        }
      }
     

      .swiper-slide-content {
          height: 16em;
          width: 100%;
          margin-top: -11.5em;
      }
      // For iphone 5 and below
      @media (max-width:350px){
        .swiper-slide-content{
          margin-top: -13.5em;
        }  
      }

      @media (min-width:768px){
        .swiper-slide-content{
          height: 18em;
          width: 90%;
          max-width: 1400px;
          margin-top: -7em;
        }  
      }

      @media (min-width:992px){
          height: auto;
        .swiper-slide-content{
          margin-top: -4.5em;
        }  
      }

      .info-wrapper{
        background-image: url('../assets/brick.jpg');
        background-size: cover;
        color: #fff;
        top:0;
        position: relative;
        @media (min-width: 992px){
            margin-top: -7em;
        }

        .info-wrapper__inner-wrapper{
            background:rgba(0,0,0,0.6);
            width: 100%  ;
            height: 100%  ;
            padding-top: 6em;
            padding-bottom: 2em;
        }

        .info-wrapper-content{
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            @media (min-width: 992px){
                flex-direction: row;
            }
        }
        .info-wrapper__text{
            text-align: center;
            width: 94%;
            margin: auto;
            @media (min-width: 992px){
              text-align: left;
              margin-left: 1em;       
            }
        }
        
        .info-wrapper__img img{
            width: 12.5em;
            margin-top: -5em;
            @media (min-width: 768px){
                width: 15em;
                margin-top: -5em;
            }
            @media (min-width: 992px){
                width: 20em;
                height: 18em;
                margin-top:0;
            }
        }
        

        .info-content__title{
          font-size: 1.67em;
        }
        .info-content__text{
          font-size: 1.2em;
          margin-top: 1em;
          line-height: 1.6em;
        }
        .info-content__button{
          display: inline-block;
          width: 8em;
          font-size: larger;
          text-align: center;
          height: 2.6em;
          line-height: 2.6em;
          text-decoration: none;
          color:white;
          background-color: #942A38;
          cursor: pointer;
          font-weight: 500;
          margin-left: 0;
          -webkit-transition: background-color  1s; 
          transition: background-color 1s;
          &:hover{
                background-color: white;
                color:black;
          }
        }
      }
      /* ------  The new mobile nav bar -------*/
      .mobile-nav-bar{
           height:5em;
           width:100%;
           
           position: relative;
           color:white;
           background-color: black;
           cursor: pointer;
           .mobile-nav-bar__inner-wrapper{
                display: flex;
                justify-content: space-around;
                align-items: center;
                width:70%;
                height:inherit;
                margin: auto;
           }
            .video-icon{
                &.video-icon--selected{
                      background-image: url('../assets/icons/video-icon-red.svg');
                }
                height:2.2em;
                width: 2.2em;
                margin-top: -.85em;
                background-image: url('../assets/icons/video-icon.svg');
                background-size: contain;
            }
            .info-icon{
                &.video-icon--selected{
                      background-image: url('../assets/icons/info-icon-red.svg');
                }
                height:2.2em;
                width: 2.2em;
                margin-top: -.85em;
                background-image: url('../assets/icons/info-icon.svg');
                background-size: contain;
            }

          .video-icon p{
              font-size: .9em;
              position: relative;
              top:100%;
              right: 10%;
          }

          .info-icon p{
              font-size: .9em;
              position: relative;
              top:105%;
              left: -75%;
              width: 6em;
          }
      }

       .video-gallery{
            width: 100%;
            height: auto;
            display: flex;
            padding-top: 2em;
            flex-direction: column;
            align-items: center;
            background-color:#942A38;
            @media (min-width:768px){
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
            }
            .video-gallery__video{
                display: inline-block;
                margin-bottom: 2em;
                @media (min-width:768px){
                   margin-left: 2em;
                }
            }
       }

        .upcoming-episode-wrapper{
            background-image:url('../assets/up-coming-video.png');
            background-size: contain;
            transition: all .2s linear;
            height: 12em;
            width: 19em;
            margin-bottom: 2em;
           &:hover{
                -webkit-transform: scale(1.35);
                -ms-transform: scale(1.35);
                transform: scale(1.35);
                z-index: 10;
            }
            @media (min-width:768px){
               margin-left: 2em;
            }
         }

        .upcoming-episode{
            height: 12em;
            width: 19em;
            background:rgba(0,0,0,0.61);
            text-decoration: none;
            color:white;
            display:flex;
            text-align: center;
            flex-direction:column;
            justify-content:center;
            cursor: pointer;
            margin-bottom: 2em;
            h1{
                margin-left: auto;
                margin-right: auto;
            }
            span{
                margin-left: .25em;
            }
        }
  }
  
</style>
