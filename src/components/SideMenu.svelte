<script>
    import {fly} from "svelte/transition";

    let {pages, openPage = $bindable(), open = $bindable()} = $props();

    /**
     * This function is called when a button in the menu is clicked
     * and the menu should be closed.
     * @param {number} index
     */
    function buttonClick(index) {
        open = false;
        openPage = index;
    }
</script>

<main class={open ? "open" : ""}>
    <!-- tabindex and onkeydown event added to satisfy linter. They are not required for a touchscreen app. -->
    <nav>
        {#if open}
            <div class="items">
                <div id="nav" class="menu" transition:fly={{ x: -15 }}>
                    {#each pages as obj, i}
                        <button
                                onclick={() => buttonClick(i)}
                                class={i === openPage ? "selected" : ""}
                        >
                            <div class="button-icon">
                                <obj.icon/>
                            </div>
                            <div>{obj.text}</div>
                        </button>
                    {/each}
                </div>
            </div>
        {/if}
    </nav>
</main>

<style>
    .items {
        margin: 4px;
    }

    main {
        position: sticky;
        background-color: var(--burger-menu-color);
        max-width: 0;
        transition: all 0.3s 0.05s;
        /*box-shadow: -3px 0 0 rgba(255, 255, 255, 0.8) inset;*/
        /*box-sizing: border-box;*/
        z-index: 1;
    }

    .open {
        max-width: 800px;
        transition: all 0.35s;
    }

    .items {
        display: flex;
        flex-direction: column;
    }

    .menu {
        display: flex;
        flex-direction: column;
    }

    button {
        padding: calc(var(--padding) * 2) calc(var(--padding) * 2);
        margin: 3px 6px;

        font-size: 1.3em;
        transition: all 0.1s,
        background-color 0.25s;
        display: flex;
        align-items: center;
        /*white-space: nowrap;*/

        min-height: 42px;
    }

    .button-icon {
        display: flex;
        align-items: center;
        width: 35px;
        padding-right: 10px;
    }

    .selected {
        border-left: 4px solid black;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }
</style>
