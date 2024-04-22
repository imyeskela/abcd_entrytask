<script lang="ts">
    import { Currencies } from "../env.ts";
    import { onMount } from "svelte";
    const baseApiUrl = "https://open.er-api.com/v6/latest/";
    let selectedFirstCur = "USD";
    let selectedSecondCur = "RUB";
    let coefficient;
    let promise;
    let firstInputValue = 0;
    let secondInputValue = 0;

    async function getCoefficients() {
        const response = await fetch(`${baseApiUrl}${selectedFirstCur}`);
        if (response.ok) {
            return await response.json().then((response) => {
                coefficient = response["rates"][selectedSecondCur];
            });
        }
    }

    function convert2to1() {
        firstInputValue = (secondInputValue / coefficient).toFixed(3);
    }

    function convert1to2() {
        secondInputValue = (firstInputValue * coefficient).toFixed(3);
    }

    function onConvertChangeFirst() {
        promise = getCoefficients().then(() => {
            convert2to1();
        });
    }

    function onConvertChangeSecond() {
        promise = getCoefficients().then(() => {
            convert1to2();
        });
    }

    onMount(() => {
        promise = getCoefficients().then(() => {
            convert1to2();
        });
    });
</script>

<div class="converter-container">
    {#await promise then}
        <h1>Converter</h1>
        <div class="converter-input">
            <input
                id="1_input"
                bind:value={firstInputValue}
                on:input={() => convert1to2()}
            />
            <label for="1_input">
                <select
                    bind:value={selectedFirstCur}
                    on:change={() => onConvertChangeFirst()}
                >
                    {#each Currencies as item}
                        <option value={item}>{item}</option>
                    {/each}
                </select>
            </label>
        </div>
        <div class="converter-input">
            <input
                id="2_input"
                bind:value={secondInputValue}
                on:input={() => convert2to1()}
            />
            <label for="2_input">
                <select
                    bind:value={selectedSecondCur}
                    on:change={() => onConvertChangeSecond()}
                >
                    {#each Currencies as item}
                        <option value={item}>{item}</option>
                    {/each}
                </select>
            </label>
        </div>
    {/await}
</div>

<style>
    h1 {
        font-family: "Gilroy";
        font-weight: 600;
    }
    .converter-container {
        display: flex;
        flex-direction: column;
        font-weight: 400;
        gap: 2rem;
        align-items: center;
    }

    .converter-container input{
      outline: none;
      font-family: Gilroy;
      border: 1px solid rgb(156, 156, 156)
    }
    .converter-container select {
      font-family: Gilroy;
      background-color: inherit;
      border: 1px solid rgb(156, 156, 156);
    }
</style>
