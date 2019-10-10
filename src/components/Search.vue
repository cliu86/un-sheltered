<template>
    <div class="searchInputContainer" :class="{'inputActive': showInput}" >
        <div @keydown.down="select('down')" @keydown.up="select('up')" @keydown.enter="goToVideo(selected.uri.split('/')[2])">
            <input type="text" ref="search" class="search" v-model="query" v-show="showInput" autofocus />
            <div class="search-results" v-show="query.length && showInput">
                <ul v-if="results.length" class="search-results__content">
                    <li 
                        v-for="(result, index) in results" 
                        :key="index" 
                        @mouseover="selected = result"
                        @mouseout="selected = null" 
                        @click="goToVideo(selected.uri.split('/')[2])" 
                        :class="{'selected': selected === result}">
                        <span class="title" v-text="result.name"></span>
                        <div class="date" v-text=" 'Created on ' + getDateTime(result.created_time)"></div> 
                    </li>
                </ul>
                <div v-else-if="query.length && !results.length" class="not-found">
                    Sorry, no results found
                </div>
            </div>
        </div>
        <button @click="showInput = !showInput">
            <img src="@/assets/icons/search.svg" v-if="!showInput " />
            <img src="@/assets/icons/cancel.svg" v-else />
        </button>
    </div>
</template>
<script>
    import Fuse from 'fuse.js'
    export default {
        name: 'Search',
        created() {
            this.fuse = new Fuse(this.$store.state.videos, {
                keys: [
                    "name",
                    "description"
                ]
            });
        },
        data() {
            return {
                query: '',
                fuse: null,
                selected: null,
                showInput: false,
                temp: 'hello'
            }
        },
        computed: {
            results() {
                return this.fuse.search(this.query);
            }
        },
        methods: {
            goToVideo(id) {
                if (!this.selected) {
                    return;
                }
                // go to this.selected
                this.$router.push({
                 path: `/episodes/${id}`
                });

                this.show = false;
            },
             getDateTime(timestamp) {
                return moment(timestamp).format("MMMM D, YYYY")
            },
            select(direction) {
                if (!this.results.length) {
                    return;
                }
                if (direction === 'down') {
                    if (!this.selected) {
                        this.selected = this.results[0];
                    } else if(this.results[this.results.indexOf(this.selected) + 1]) {
                        this.selected = this.results[this.results.indexOf(this.selected) + 1];
                    }
                }
                if (direction === 'up') {
                    if(this.results[this.results.indexOf(this.selected) - 1]) {
                        this.selected = this.results[this.results.indexOf(this.selected) - 1];
                    }
                }
            }
        },
        watch: {
            showInput(newVal, oldVal) {
                if (newVal === true) {
                    this.$refs.search.focus();
                } else {
                    this.query = '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .searchInputContainer {
        position: absolute;
        right: 1em;
        top: 1.15em;
        @media (min-width:768px) {
            top: 1em;
             right: 3em;
        }
         @media (min-width:992px) {
            top: 1.5em;
        }
        button {
            width: 1.2em;
            height: 1.2em;
          
            margin-top: 11px;
            right: 0;
            margin-right: 45px;
            @media (min-width:768px) {
                 margin-right: 70px;
                 width: 1.5em;
                 height: 1.5em;
            }
            @media (min-width:992px) {
                width: 2em;
                 height: 2em;
            }
            position: absolute;
            z-index: 2;
            &:active,
            &:focus {
                outline: none;
                border: none;
            }
            img {
                width: 100%;
                height: auto;
            }
        }

        .not-found {
            text-align: left;
            height: 2em;
            text-indent: 1.4em;
            padding: .3em 0 .3em 0;
        }
    }
    .search {
        z-index: 1;
        border: 1px solid white;
        height:2.7em;
        width: 7em;
        position: absolute;
        right: 0;
        top: 0;
        display: block;
        margin-right: 40px;
        color: white;
        text-indent: 10px;
    
        opacity: 0;
        transition: 0.6s all ease;
        &:focus {
            outline-color: #fff;
        }
        @media (min-width:768px){
            margin-right: 60px;
            height: 3em;
            width: 16em;
            text-indent: 1.4em;
        }
        @media (min-width:992px){
            height: 3.5em;
            width: 21em;
        }
    }

    .inputActive .search {
        opacity: 1;
    }

    .search-results {
         margin-right: 60px;
        background-color: white;
        z-index: 10;
        color: black;
        height: auto;
        width: 21em;
        position: absolute;
        right: 0;
        top: 42px;
    }

    .search-results__content {
        list-style: none;
        font-size: 1em;
        li {
            text-align: left;
            text-indent: 1.4em;
            height: 3.5em;
            padding: .3em 0 .3em 0;
            &.selected {
                background: rgba(0, 0, 0, 0.3);
            }
            .date {
                color: gray;
            }
        }
    }

    

    /* ------ The fade in  ----- */

    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

</style>