<template>
    <div class="footer">
        <div class="cols">
            <div class="col footer__logo" >
                <a href="https://nupathinc.org/" target="_blank">
                    <img :src="require('../../assets/nupath-logo.svg')" />
                </a>
            </div>
            <div class="col footer__text">
               NuPath helps people living with disabilities live with dignity, joy, and self-respect within their communities.
                Our mission is to make life’s journey happier, healthier, and more fulfilling by safely and 
                responsibly removing barriers to participation in the community, while delivering the specialized 
                care that adults living with disabilities deserve and the support services their families need.
            </div>
            <div class="col footer__nav" >
                <router-link class="link" to="/episodes">Episodes</router-link>
                <router-link class="link" to="/about">About</router-link>
                <router-link class="link" to="/contact">Contact</router-link>
            </div>
        </div>
        
        <div class="footer__copy-rights-social">
            <p>&copy;{{ year }} NuPath Inc. All rights reserved.</p>
            <p>
                <vue-goodshare-facebook class="facebook-share"
                    :page_url="currentUrl"
                    has_icon 
                ></vue-goodshare-facebook>

                <vue-goodshare-twitter class="twitter-share"
                    :page_url="currentUrl"
                    has_icon 
                ></vue-goodshare-twitter>
            </p>
         </div> 
    </div>
</template>

<script>
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'
export default {
     components: {
      VueGoodshareFacebook,
      VueGoodshareTwitter,
    },
    computed: {
        year() {
            return moment().format('YYYY');
        },
        currentUrl() {
            return window.location.href;
        }
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.footer{
    display: block;
    width: 96%;
    margin: auto;
    h3 {
       margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: white;
        text-decoration: none;
    }
    .cols {
        display: flex;
        flex-direction: column;
        align-items: space-between;
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
        border-bottom: 1px #fff solid;
        padding-bottom: 1em;
        line-height: 2em;
        text-align: left;

        @media (min-width:992px){
            flex-direction: row;
        }
        .col {
            flex: 1;
            flex-grow: 1;
            flex-basis: 0;
            padding: 2em;
            margin: auto;
            color: #fff;
        }
        div:nth-of-type(2) {
            flex-basis: 30%;
        }

        .footer__logo{
        img {
                width: 70%;
                height: auto;
                margin-left: 15%;
                margin-right: 15%;
                @media (min-width:768px){
                    width: 40%;
                    margin-left: 30%;
                    margin-right: 30%;
                } 
                @media (min-width:992px){
                    width: 100%;
                    margin-left: 0;
                } 
            }
        }

        .footer__text{
            font-size: 1.1em;
            text-align: center;
            margin-top: -1.5em;
            @media (min-width:768px){
                font-size: 1.25em;
                margin-top: -2em;
            }
            @media (min-width:992px){
                margin-top: 2em;
            }
        }


        .footer__nav{
            display: flex;
            justify-content: space-around;
            width: 100%;
            font-size: 1.2em; 
            .link{
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }

    .footer__copy-rights-social{
        display:flex;
        font-size: .9em;
        height:5em;
        align-items: center;
        // justify-content: space-between;
        color:darkgray;
        width: 86%;
        max-width: 1300px;
        margin:auto;
        margin-top: .6em;

        @media (min-width:992px){
            flex-direction: row;
            width: 100%;
        }
        p{
            flex: 1;
            flex-grow: 1;
            flex-basis: 0;
            .facebook-icon, .twitter-icon{
                width:2em;
                height:2em;
                margin-left: .8em;
                cursor: pointer;
            }
        }
        p:nth-of-type(1){
            text-align: left;
            margin-left: 1em;
        }
        p:nth-of-type(2){
            text-align: right;
            margin-right: 1em;
        }

    }
}

</style>