<script>
    const {padding = 5} = $props();
</script>
<main style="padding: {padding}px">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 80 65" style="stroke-width: 4px; stroke: currentColor;">
        <rect x="0" y="0" width="77" height="62" rx="9.3" ry="9.3"
              style="fill: transparent;"/>
        <path d="M 0 12.34 Q 0 12.34 77.23 12.34"/>
        <path d="M -0.23 49.6 Q -0.23 49.6 77.23 49.41"/>
        <path d="M 31 31 L 31 21 Q 31 18 33.57 19.55 L 49.93 29.45 Q 52.5 31 49.93 32.55 L 33.57 42.45 Q 31 44 31 41 Z"
              style="fill: transparent; stroke: currentColor;"
              stroke="#000000"/>
        <path d="M 14 12 Q 14 12 14 0"/>
        <path d="M 30 12 Q 30 12 30.05 0"/>
        <path d="M 63 12 Q 63 12 63 0"/>
        <path d="M 47.03 12 Q 47.03 12 47 0"/>
        <path d="M 13.96 62 Q 13.96 62 13.96 50"/>
        <path d="M 29.96 62 Q 29.96 62 30.01 50"/>
        <path d="M 62.96 62 Q 62.96 62 62.96 50"/>
        <path d="M 46.99 62 Q 46.99 62 46.96 50"/>
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