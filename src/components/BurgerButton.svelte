<script>
    import {Hamburger} from "svelte-hamburgers";

    let {open = $bindable()} = $props();
</script>

<main class={open ? "open" : ""}>
    <!-- tabindex and onkeydown event added to satisfy linter. They are not required for a touchscreen app. -->
    <Hamburger
            bind:open={open}
            type="collapse"
            title="Sub pages"
            ariaLabel="Sub pages"
            ariaControls="nav"
            --color="white"
            --layer-width="34px"
            --layer-height="4px"
    />
</main>

<style>
    main {
        position: absolute;
        background-color: rgba(0, 0, 4, 0.6);
        height: 100%;

        max-width: 0;
        transition: max-width 0.3s 0.05s,
        padding 0.3s 0.05s;
        /*
        border-right: 2px rgba(50, 50, 100, 0.6) solid;
        */
        box-shadow: -3px 0 0 rgba(150, 150, 240, 0.8) inset;
        padding: 0;
        box-sizing: border-box;
        z-index: 1;
    }
</style>
