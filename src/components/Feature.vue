<template>
  <div class="feature">
    <video playsinline autoplay muted loop :poster="image" class="background-vid">
      <source src="@/assets/no-walls-trailer.mp4" type="video/mp4">
    </video>
    <div class="feature__content">
      <div class="feature__content__inner-wrapper">
        <h1 v-text="title"></h1>
        <div class="meta">
          <span class="meta__item meta__item-date" v-text="dateAdded"></span> |
          <span class="meta__item meta__item-duration" v-text="duration"></span> |
          <span class="meta__item meta__item-comments" v-text="comments"></span> |
          <span class="meta__item meta__item-views" v-text="views"></span>
        </div>
        <div class="feature__content__buttons">
            <button @click="goToVideo(videoId)"  class="feature__content__watch-now">WATCH NOW</button> 
        </div>
      </div>
    </div>
  
  </div>
  
</template>
<script>
export default {
  name: 'Feature',
  props: {
    videoId: String,
    image: String,
    title: String,
    duration: {},
    dateAdded: String,
    views: String,
    comments: String,
  },
   methods: {
        goToVideo(id) {
            this.$router.push({
                path: `/episodes/${id}`
            });
        },
   }
}
</script>
<style lang="scss" scoped>
  .background-vid {
    height: auto;
    position: absolute;
    top:0;
    width: 100%;
  }

  .feature {
    background-color: #fff;
    background-size: cover;
    position: relative;
    min-height: 12em;
    width: 100%;
    max-width: 2000px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
   
    @media (min-width: 650px) {
      height: 26em;
    }
    @media (min-width:992px) {
      height: 46em;
    }
    @media (min-width:1400px) {
      height: 55em;
    }
    .feature__content {
      width: auto;
      display: flex;
      height: 300px;
      position: absolute;
      top: 35%;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      @media (min-width: 768px) {
        top: 0;
        background: #1b1b1b;
        background: -webkit-gradient( linear, left bottom, left top, color-stop(10%, black), to(transparent));  
        background: -webkit-linear-gradient( bottom, black 10%, transparent);  
        background: -o-linear-gradient( bottom, black 10%, transparent);  
        background: linear-gradient( to top, black 10%, transparent);;
        text-align: left;
      }
      color: white;
      padding-bottom: 5.5em;
     
       // For iphone 5 and below
      @media (max-width:350px){
        padding-bottom: 8.5em;
      }
       @media (min-width: 768px) {
         padding-bottom: 0;
      }
      @media (min-width: 992px) {
        padding-bottom: 5.5em;
        padding-left: 6em;
      }
      h1 {
        text-transform: uppercase;
        font-size: 1.3em;
        font-weight: 200;
        text-align: center;
      }
      @media (min-width:768px) {
        h1 {
          margin-bottom: 1em;
          font-size: 1.7em;
        }
      }
      @media (min-width:992px) {
        h1 {
          text-align: left;
          margin-bottom: .8em;
          font-size: 2.8em;
        }
      }
      .feature__content__inner-wrapper {
        margin: auto;
        max-width: 1400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        @media (min-width:768px) {
           margin-top: 14em;
        }
        @media (min-width:992px) {
          width: 100%;
          height: 100%;
          justify-content: flex-end;
          margin-top: 0;
        }
      }
      .meta {
        display: none;
        margin-bottom: 2.4em;
        .meta__item:first-child {
          margin-left: 0;
        }
        .meta__item {
          margin: 0 1em 0 1em;
        }
      }
      @media (min-width:768px) {
        .meta {
          display: block;
          margin-top: -1em;
          text-align: center;
        }
      }
      @media (min-width:992px) {
        .meta {
          text-align: left;
        }
      }
      .feature__content__buttons {
        margin: auto;
      }
      @media (min-width:992px) {
        .feature__content__buttons {
          margin: 0;
          width: auto;
        }
      }
      .feature__content__watch-now {
        display: inline-block;
        width: 8em;
        text-align: center;
        height: 3.03em;
        line-height: 3.03em;
        background-color: #942A38;
        cursor: pointer;
        font-size: smaller;
        border: 1px solid transparent;
        -webkit-transition: all .7s;
        transition: all .7s;
        @media (min-width:992px) {
            width: 10em;
            font-size: larger;
        }
        &:hover {
          background-color: white;
          color: black;
        }
      }

    }
  }
</style>