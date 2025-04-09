<script>
    const {padding = 5} = $props();
</script>
<main style="padding: {padding}px">
    <svg xmlns="http://www.w3.org/2000/svg"
         version="1.1" viewBox="-0.5 -0.5 31 29"
         stroke="currentColor">
        <path d="M 17 25 L 17 12 L 25.31 12 L 29 16 L 29 27 L 17 27 L 17 21" fill="none"/>
        <path d="M 19.77 18 L 26.23 18" fill="none"/>
        <path d="M 19.77 21 L 26.23 21" fill="none"/>
        <path d="M 19.77 24 L 26.23 24" fill="none"/>
        <path d="M 29 16 L 25.31 16 L 25.31 12" fill="none"/>
        <path d="M 0 13 L 0 0 L 8.31 0 L 12 4 L 12 15 L 0 15 L 0 9" fill="none"/>
        <path d="M 2.77 6 L 9.23 6" fill="none"/>
        <path d="M 2.77 9 L 9.23 9" fill="none"/>
        <path d="M 2.77 12 L 9.23 12" fill="none"/>
        <path d="M 12 4 L 8.31 4 L 8.31 0" fill="none"/>
        <path d="M 14 26 L 6 26 L 6 22" fill="none"/>
        <path d="M 6 22.5 L 3 22.5 L 6 18.5 L 9 22.5 L 5 22.5" fill="none"/>
        <path d="M 15 1 L 23 1 L 23 5" fill="none"/>
        <path d="M 23 5 L 26 5 L 23 9 L 20 5 L 24 5" fill="none"/>
    </svg>
</main>

<style>
    main {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    svg {
        color: white;
    }
</style>