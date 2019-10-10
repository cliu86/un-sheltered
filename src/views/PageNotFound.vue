<template>
    <div class="pageNotFound">
        <div class="page-content">
            <span class="heading">404</span>
            <p>Whoops, there's nothing here.</p>
            <a href="/">Go Home</a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .pageNotFound {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height:33em;
         @media (min-width:992px) {
            height: 75vh;
        }
        .page-content {
            color: #fff;
            font-size: 18px;
            .heading {
                font-size: 7em;
                 @media (min-width:992px) {
                     font-size: 16em;
                 }
            }
            p{
                font-size: large;
                @media (min-width:992px) {
                     font-size: x-large;
                 }
            }
            a{
                display: inline-block;
                width: 8em;
                text-align: center;
                height: 2.5em;
                line-height: 2em;
                margin-top: 1em;
                color:white;
                text-decoration: none;
                background-color: #942A38;
                cursor: pointer;
                font-size: large;
                border: 1px solid transparent;
                -webkit-transition: all .7s;
                transition: all .7s;
                @media (min-width:992px) {
                    width: 10em;
                     font-size: x-large;
                }
                &:hover {
                background-color: white;
                color: black;
                }
            }
        }
    }
    
</style>