<template>
<Form iframe-id="JotFormIFrame-80985880923875">
    <div class="subscribe">
        <iframe
            id="JotFormIFrame-80985880923875"
            onload="window.parent.scrollTo(0,0)"
            allowtransparency="true"
            allowfullscreen="true"
            allow="geolocation; microphone; camera"
            src="https://form.jotform.co/80985880923875"
            frameborder="0"
            style="width: 1px;
            width: 500px;
            max-width: 100%;
            height:539px;
            border:none;
            margin-top: 140px;"
            scrolling="no"
            >
        </iframe>
    </div>    
</Form>
</template>
<script>
    import Form from '@/components/Form';
    export default {
        name: 'Contact',
        components: {
            Form
        }
    }
</script>

<style lang="scss" scoped>
    .subscribe{
         @media (min-width:992px){
            width:80%;
            height:60em;
            margin:auto;
        } 
    }
</style>


