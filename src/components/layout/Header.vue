<template>
    <div>
        <div class="main-header animated slideInDown" 
            :class="{'menu-onEpisode' : !isEpisode, 'menu--shaded': shaded }" 
            id="header-menu">
            <div class="main-header__content">
                <div class="main-header__logo">
                    <a href="/"><img src="../../assets/unsheltered-landscape.svg"/></a>
                </div>
                <div class="main-header__search" >
                    <Search />
                </div>
                <div id="nav-icon" @click="toggleSidebar">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="sidenav" v-bind:class="{ active: menuOpen }"   >
            <button @click="toggleSidebar"></button>
            <router-link to="/episodes" class="link">EPISODES</router-link>
            <router-link to="/about"  class="link">ABOUT</router-link>
            <router-link to="/subscribe"  class="link">SUBSCRIBE</router-link>
            <router-link to="/contact"  class="link">CONTACT</router-link>
            <router-link to="/"  class="link">HOME</router-link>
        </div>
    </div>
</template>

<script>
import Search from '@/components/Search';
  export default {
    name: "MainHeader",
    props: {
        shaded: {
            required: false,
            default: true
        }
    },
    data() {
        return {
            isActive: false,
            searchActive: false
        }
    },
    components: {
        Search
    },
    computed: {
        isEpisode() {
            return this.$route.path === '/';
        },
        menuOpen() {
            return this.$store.state.sidebarOpen
        }
    },
    methods: {
        toggleSidebar() {
            this.$store.dispatch('toggleSidebar')
        }
    }
  }
</script>


<style lang="scss" scoped>

    .main-header{
        width: 100%;
        height:5em;
        position: absolute;
        &.menu--shaded {
            background: linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1));
        }
        @media (min-width: 768px) {
            background: transparent; 
        }
         @media (min-width:992px){
            height:7em;
        }
        .menu-onEpisode{
            z-index: 20;
            .main-header__search{
                display: none;
            }
        }

        .main-header__content{
        max-width: 1400px;
            position: relative;
            margin: auto;
        }

        @media (min-width:768px){
        .main-header__content{
            width:92%
            }
        }

        .main-header__logo img{
            width: 13em;
            height:4.8em;
            float:left;
            margin-left: .4em;
        }

        @media (min-width:768px){
            .main-header__logo img{
                margin-left: 1.3em;
            }
        }
        @media (min-width:992px){
            .main-header__logo img{
                width: 25em;
                margin-top: .6em;
            }
        }

        .main-header__return-home{
            float:right;
            margin-left: 1.3em;
            margin-top:1.5em;
            font-size: 1.2em;
            margin-right: 1em;
            @media (min-width:768px){
                margin-right: 0;
            }
            @media (min-width:992px){
                font-size: 1.5em;
            }
            a{
                text-decoration: none;
                color:white;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    height:1.5em;
                    width: 1.5em;
                    margin-right: .6em;
                }
                span{
                    display:none;
                    @media (min-width:992px){
                        display:block;
                    }
                }
            }
        }
    }


    .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slideInDown {
        animation-name: slideInDown;
    }


    /* ----------  The new menu overlay Version   ------ overlap ------------*/
    #nav-icon {
        width: 22px;
        height: 35px;
        position: relative;
        float: right;
        transform: rotate(0deg);
        transition: .5s ease-in-out;
        cursor: pointer;
        margin-right: 20px;
        top:2em;
        bottom:2em;
        
        @media (min-width:768px){
            margin-right: 55px;
            width: 25px;
            height: 30px;
            top:1.84em;
            bottom:1.84em;
        }
        @media (min-width:992px){
            top:2.4em;
            bottom:2.4em;
            width: 32px;
            height: 45px;
        }
    }

    #nav-icon span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: white;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }

    #nav-icon span:nth-child(1) {
        top: 0px;
        transform-origin: left center;
    }

    #nav-icon span:nth-child(2) {
        transform-origin: left center;
        top: 6px;
        @media (min-width:768px){
          top: 7px;
        }
        @media (min-width:992px){
          top: 10px;
        }
    }

    #nav-icon span:nth-child(3) {
       
        transform-origin: left center;
        top: 12px;
        @media (min-width:768px){
           top: 14px;
        }
        @media (min-width:992px){
          top:20px;
        }
    }

    .sidenav {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index:9999 ;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content:flex-start;
        align-items: center;
        background-color:black;
        transform: translateX(100%);
        overflow-x: hidden;
        transition: transform 0.5s;
       
        @media(min-width:768px){
            width: 50%;
        }
        @media(min-width:992px) and (max-width:1200px){
            width: 45%;
        }

        @media(min-width:1201px){
            width: 25%;
        }
        button{
            width:25px;
            height:30px;
            position: relative;
            background-image: url("../../assets/icons/close-white.svg");
            background-size: contain;
            left:10.5em;
            margin-top: 1.9em;
            margin-bottom: 3em;
            @media(min-width:768px){
                width:30px;
                height:30px;
                background-image: url("../../assets/icons/close.svg");   
                margin-top: 3em;
                margin-bottom: 3em;
                left:0;
            }

            &:active, &:focus{
                border:none;
                outline:none;
            }
        }
        .link{
            font-size: 2.4em;
            @media(min-width:768px){
               font-size: 2.9em;
            }

        }
    }

    .active{
        transform:translateX(0);
    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }

   


</style>
