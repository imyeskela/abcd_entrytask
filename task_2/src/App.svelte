<script lang="ts">
    import Converter from "./lib/Converter.svelte";
</script>

<main>
    <div class="main-container">
        <Converter />
    </div>
</main>

<style>
    @font-face {
        font-weight: 400;
        font-family: 'Gilroy';
        src: url("./assets/fonts/GILROY-REGULAR.TTF");
    }
    @font-face {
        font-weight: 600;
        font-family: 'Gilroy';
        src: url("./assets/fonts/GILROY-SEMIBOLD.TTF");
    }
    main{
        height: 100%;
    }
    .main-container {
        font-family: "Gilroy";
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
</style>
