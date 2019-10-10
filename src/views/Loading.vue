<template>
   <section class="nupath-gradient-bg">
        <div class="nupath-logo-overlay"></div>
        <div class="nupath-gradient-overlay">
             <h1>Loading...</h1>
              <fulfilling-bouncing-circle-spinner
                :animation-duration="3000"
                :size="60"
                :color="'white'"
               />
        </div>     
    </section>
</template>
<script>
    import {FulfillingBouncingCircleSpinner} from 'epic-spinners'
    export default {
        components: {
            FulfillingBouncingCircleSpinner
        }
    }
</script>
<style lang="scss" scoped>
    .nupath-gradient-bg{
        position: relative;
        z-index: 1;
        background: #A21C35; 
        height:100vh;
        width: 100vw;
    }
    .nupath-gradient-overlay{
        h1{
           z-index: 10;
           color:white;
           margin-bottom: 1em;
           font-family: 'Source Sans Pro', sans-serif;
        }
        position: absolute;

       display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height:100vh;
        width: 100vw;
        background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,1) 96%, rgba(0,0,0,1) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 96%,rgba(0,0,0,1) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 96%,rgba(0,0,0,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#000000',GradientType=0 ); /* IE6-9 */
        z-index: 2;
    }
    .nupath-logo-overlay{
        position: absolute;
        flex-direction: column;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 3;
        background-image: url('../assets/unsheltered-logo-portrait-tilted.svg');
        background-size: 50%;
        background-repeat: no-repeat;
        background-position: center center;
         opacity: .1;
    }
</style>