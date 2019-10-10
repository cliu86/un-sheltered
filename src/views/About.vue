
<template>
  <section class="about" >
      <div class="container about__container" >
            <div class="about__text-content above"> 
                <div class="about__text-content__wrapper">
                    <h1 id="about-title"><b>ABOUT</b></h1>
                    <p class="subtitle">NuPath, in conjunction with Schloss Films, has created a short film series - 
                        vignettes of life stories as they've never been told (or viewed). </p>
                    <p class="description">The objective is to challenge the wider world to open their hearts and minds to 
                        understanding deeply and genuinely how much alike human experiences can be - love, loss, opportunity,
                         addiction, depression - human experiences that transcend all generations, every neighborhood, 
                         all ability levels and never discriminating.  Watch, listen and learn from these [un] told,
                          [un] scripted, [un] rated, stories of life.
                    </p>
                     <button @click="goToVideo(earliest_video.uri.split('/')[2])" class="link"><img src="../assets/icons/play-button.svg">START WATCHING !</button>
                </div>      
            </div>
            <div class="about__image-content above"></div>

            <div class="about__image-content below"></div>
             <div class="about__text-content below "> 
                <div class="wrapper">
                    <h1 id="learn-more-title"><b>NUPATH</b></h1>
                    <p class="subtitle">Who is NuPath? </p>
                    <p class="description">Based in Woburn, MA, and offering services at locations across Eastern Massachusetts, we are proud to be part
                         of a growing network of regional agencies that is changing the way the wider world views people with disabilities. At the heart
                          of this effort is our staff, a group of 500+ professionals that deliver clinical, practical, and emotional support and care, 
                          24 hours a day, 7 days a week, to the participants in our programs.
                    </p>
                    <a href="https://nupathinc.org/about-us/" target="_blank" class="link learn-more">LEARN MORE</a>
                </div>      
            </div>
      </div>
  </section>
</template>


<script>
  export default {
    methods: {
         goToVideo(id) {
              this.$router.push({
                  path: `/episodes/${id}`
              });
            }
    },
      computed: {
        videos() {
            return this.$store.state.videos;
        },
        earliest_video() {
            return _.head(_.sortBy(this.videos, [video => video.created_time]));
        }
    }
  }
</script>

<style lang="scss" scoped>
    section.about:after{
        @media (min-width:992px){
            content: '';
            display: block;
            width: 100%;
            height: 75%;
            position: absolute;
            left: 0;
            top: 0;
            background-image: url('../assets/unsheltered-logo-portrait-tilted.svg');
            background-repeat: no-repeat;
            background-size: 50%;
            background-position: center center;
            opacity: .37;
            z-index: 0;
        }
    }
    
    section.about{
        height:auto;
        background-color: #A21C35;
        width: 100%;
        color: white;
        padding-top:4em;
        @media (min-width:992px){
            padding-top:9em;
            height:84em;
            background-size: 70% 55em;
            background-position: top 7em center ;
            text-align: left;
        }
        .about__container{
            display:flex;
            flex-direction: column;
            width: 100%;
            margin-right: auto;
            margin-left: auto;
            @media (min-width: 992px){
                display:block;
            }
            @media (min-width: 1200px){
                max-width: 1300px;      
            }
        }
      
        #about-title, #learn-more-title {
            font-size: 1.7em;
        } 

        /* ------  Text comtent ------ */
        .about__text-content{
            width: 96%;
            height:30em;
            z-index: 2;
            position: relative;
            // border: 1px solid white;
            line-height: 1.3em;
            font-size: 1em;
            margin: auto;
            display:flex;
            flex-direction: column;
            justify-content: center;

            @media (min-width: 400px){
                margin-top: 0;
            }
            @media (min-width: 768px){
                font-size: 1.45em;
            }
            @media (min-width: 992px){
                width: 55%;
                font-size: 1.25em;
                height:24em;
            }
            &.above{
                order:2;
                margin-bottom: 2em;
                @media (min-width: 992px){
                    float:left;
                    margin-bottom: 0;
                }   
            }
            &.below{
                order: 4; 
                @media (min-width: 992px){
                    margin-top: 5em;
                    float:right;
                }   
            }
            
            .about__text-content__wrapper{
                display: flex;
                flex-direction: column;
            }
            .subtitle{
                margin-top: 1em;
            }
            .description{ 
                margin-top: 1.4em;
                margin-bottom:2.4em;
                @media (min-width: 992px){
                    margin-bottom:2.3em;
                }
            }

            a{
                text-decoration: none;
                padding-top: .35em;
            }
            .link{
                height:2.5em;
                width:13.5em;
                display: inline-block;
                font-size: .9em;
                background-color: white;
                color: #A21C35;
                font-weight: bold;
                 cursor: pointer;
                margin:auto;
                text-align: center;
                text-decoration: none;
                -webkit-transition: all .7s;
                transition: all .7s;
                &:hover{
                    background-color: black;
                    color:white;
                }
                @media (min-width:992px){
                    margin-left:0;
                }
                img{
                    height: 1em;
                    width:1em;
                    margin-right: .5em;
                    padding-top:.3em;
                    cursor:pointer;
                }
            }
            .learn-more{
                padding-top: .5em;
            }
        }  

        /* ------  Image comtent ------ */
        .about__image-content{
            height: 22em;
            margin: auto;
            width: 96%;
            z-index: 2;
            // border: 1px solid white;
            background-size: contain;
            background-position: center center;
            @media (min-width: 768px){
            height: 30em;
            }
            @media (min-width: 992px){
            width: 40%;
            }
            &.above{
                background-image: url('../assets/about-page-person.jpg');
                order:1;
                position: relative;
                @media (min-width: 768px){
                    background-size: cover;
                    float:right;
                }
            }
            &.below{
                float:left;
                position: relative;
                background-image: url('../assets/nupath.jpg');
                order:3;
                @media (min-width: 768px){
                    background-size: cover;
                }
                @media (min-width:992px){
                    margin-top:7.3em;
                }
            }
        }

        
    }
</style>
