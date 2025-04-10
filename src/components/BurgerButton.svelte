<script>
    import {Hamburger} from "svelte-hamburgers";

    let {open = $bindable()} = $props();
</script>

<main class="{open ? 'open' : ''}">
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
        display: flex;
    }
</style>
