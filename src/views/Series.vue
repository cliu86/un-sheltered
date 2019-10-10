<template>
    <section class="series">
        <div class="series__heading">
            <div class="series__heading__overlay"></div>        
        </div>
        <div class="series__container" >
            <h1>LATEST EPISODES</h1>
            <div class="series__featured">
                <div @click="goToVideo(latest.uri.split('/')[2])" class="series__featured__video">
                    <img :src="latest.pictures.sizes[4].link"  class="video-image"/> 
                    <img class="video__play-button" src="../assets/play-button-2.svg" >
                </div>
                <div class="series__featured__description">
                    <h2 class="video-name" v-text="latest.name"></h2>  
                    <p v-text="latest.description"></p>
                    <div class="learn-more-container">
                         <button @click="goToVideo(latest.uri.split('/')[2])" class="watch-now">
                            <img src="../assets/icons/play-button-white.svg">
                            WATCH NOW
                         </button>
                    </div>
                </div>
            </div>
            <hr class="series-divider">
            <div class="series__video-series">
                <h1>Episodes <small>({{$store.state.totalVideoCount}})</small></h1>
                <div class="series__video-series__content">
                    <div v-for="video in videos" class="thumb" :key="video.id">
                        <Thumb
                            :title="video.name" 
                            :video-id="$store.getters.getVideoId(video)"
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
            </div>
        </div>
    </section>   
</template>

<script>
    import Thumb from '@/components/Thumb';
    import 'video.js/dist/video-js.css'
    import 'videojs-vimeo/src/Vimeo';

    export default {
        data() {
            return {
            }
         },
        components: {
            Thumb,
        },
        methods:{
            goToVideo(id) {
                this.$router.push({
                    path: `/episodes/${id}`, 
                });
            },
            getVideoUrl() {
                if (!this.latest) {
                    return;
                }
            }
        },
        computed: {
            videos() {
                return this.$store.state.videos;
            },
            latest() {
                return _.head(_.reverse(_.sortBy(this.videos, [video => video.created_time])));
            }
        }
    }
   
</script>
<style lang="scss" scoped>
    .series{
        background-color: #A21C35;
        height:auto;
        color:white;
        text-align: center;
         /* ---------------------- Series Heading ---------------------- */
        .series__heading{
            padding-top: 3em;
            @media (min-width:768px){
                padding-top: 0;
            }
            @media (min-width:992px){
                background-image: url('../assets/nupath-long-image.jpg');
                height: 20em;
                width: 100%;
                background-size: cover;
                background-position: center center;
            }
            .series__heading__overlay{
                @media (min-width:992px){
                    background: #1b1b1b;
                    background: -webkit-gradient( linear, left bottom, left top, color-stop(13%, black), to(transparent)); 
                    background: -webkit-linear-gradient( bottom, black 13%, transparent); 
                    background: -o-linear-gradient( bottom, black 13%, transparent); 
                    background: linear-gradient( to top, black 13%, transparent);
                    height: 20em;
                    width: 100%;
                    &::before{
                        content: '';
                        display: flex;
                        justify-content: center;
                        width: 40%;
                        height: 20%;
                        position: absolute;
                        left: 30%;
                        background-image: url('../assets/unsheltered-landscape.svg');
                        background-repeat: no-repeat;
                        background-size: 90%;
                        background-position: center center;
                        opacity: .35;
                        z-index: 0;
                        @media (min-width:1200px) and (max-width:1600px){
                            margin-top:3em;
                        }
                    }
                }
            }         
        }

        .series-divider{
            margin-top: 2em;
            @media (min-width:992px){
                margin-top: 5em;
            }
        }   

        /* ---------------------- Series Inner Wrapper ---------------------- */
        .series__container{
            width: 100%;
            margin-right: auto;
            margin-left: auto;
            @media (min-width:768px){
                justify-content: space-between;
                width: 80%;
                margin:auto;
                padding-top: 5em;
            }
            @media (min-width:992px){
                width: 90%;   
                justify-content: space-between;
                padding-top: 1em;
            }
            @media (min-width: 1200px){
                max-width: 1300px;
            }
    
            h1{
                font-size: 1.4em;
                text-align: center;
                margin-bottom: 1.5em;
                margin-top: 2em;
                @media (min-width:992px){
                    font-size: 1.8em;
                }
                @media (min-width:992px){
                    text-align: left;
                }
            }

            /* ---------------------- Featured Lastest Video ---------------------- */
            .series__featured{
                // border: 1px solid black;
                display:flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                height: auto;
                @media (min-width:992px){
                    flex-direction: row;
                }
                .series__featured__video{
                    display:flex;
                    position: relative;
                    justify-content: flex-start;
                    width:100%;  
                    height:14em; 
                    margin-bottom: 2em;
                    cursor: pointer;
                    @media (min-width:768px){ 
                        height:auto;
                        margin-bottom: 0;
                    }

                    @media (min-width:992px){
                        width:50%;  
                        height:auto;
                        margin-bottom: 0;
                    }
                    .video-image{
                        width:90%;    
                        margin: auto;          
                        @media (min-width:768px){
                            height:20em; 
                        }
                        @media (min-width:992px){
                            max-width: 750px; 
                            margin-left:0;
                        }
                        @media(min-width:992px) and (max-width:1199px){  
                            height:21em; 
                        }
                    }

                    .video__play-button{
                        height: 4em;
                        width: 16%;
                        position: absolute;
                        top: 40%;
                        bottom: 40%;
                        margin-right: 42% ;
                        margin-left: 42% ;
                        @media (min-width:768px){
                           height: 7em;
                           width: 7em;
                        }
                        @media (min-width:992px){
                            margin-right: 36% ;
                            margin-left: 36% ;
                            top: 38%;
                            bottom: 38%;
                            height: 6em;
                            width: 6em;
                        }
                    }
                }

                .series__featured__description{
                    height:auto;
                    line-height: 1.3em;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    @media (min-width:768px){
                        width:100%;
                        line-height: 1.5em; 
                        margin-top:1em;
                    }
                    @media (min-width:992px){
                        width:50%;  
                        font-size:.9em;
                    }

                    @media (min-width:1300px){
                        width:50%;  
                        margin-top: 0;
                    }
                    p{
                        width: 92%;
                        margin: 1em auto 1em auto;
                        font-size: 1.1em;
                        text-align: center; 
                        @media (min-width:768px){
                           font-size: 1.2em;
                        }
                        @media (min-width:992px){
                            text-align: left; 
                             width: 94%;
                        }
                    }
                    h2{
                        width: 94%;
                        margin:auto;
                        text-align: center;
                        @media (min-width:768px){
                            margin-top: 1em;
                        }
                         @media (min-width:992px){
                            text-align: left; 
                            margin-top: 0;
                            margin-bottom:1em;
                        }
                    }
                    .learn-more-container{
                        width: 96%;
                        margin:auto;
                        text-align: center;
                        @media (min-width:992px){
                        text-align: left; 
                        }
                        .watch-now{
                            display: inline-block;
                            width: 12em;
                            height: 3em;
                            line-height:3em;
                            font-weight: bold;
                            background-color: #A21C35;
                            color: white;
                            border: 1px solid white;
                            cursor: pointer;
                            font-size: smaller;
                             margin-top:1em;
                            -webkit-transition: all .7s;
                            transition: all .7s;
                            &:hover {
                                background-color: black;
                                color: white;
                                border: 1px solid transparent;
                            } 
                            img{
                                height:.85em;
                                width:.85em;
                                position:relative;
                                top:.1em;
                                margin-right:.6em;
                            }
                        }
                    }


    
                }  
            }

            /* ---------------------- Video Series ---------------------- */

            .series__video-series{
                // border-top:1px solid white;
                text-align: center;
                padding-top: 1em;
                width: 100%; 
                h1{
                    margin-bottom: 1.5em;
                }  
                .series__video-series__content{
                    display:flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    @media (min-width:768px){
                        justify-content: space-between; 
                    }
                    @media (min-width:992px){
                        width: 100%;   
                        justify-content: flex-start;
                    }
                    .thumb{
                        display:inline-block; 
                        margin-bottom: 2em;
                         @media (min-width:992px){
                            margin-right: 1em;
                        }
                        @media (min-width:1200px){
                            margin-right: 2em;
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
                        @media (min-width:992px){
                            margin-right: 1em;
                            margin-bottom: 1em;
                        }
                        @media (min-width:1200px){
                            margin-right: 2em;
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

            }

             
        }
    }
    
</style>