<script lang="ts">
	import RaceInformation from '$lib/RaceInformation.svelte';
	import type { RaceRoot } from '$lib/types/race';
	import { Label, Fileupload, Hr, Pagination, Toggle, Select } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import convert from 'xml-js';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	import RaceStats from '$lib/RaceStats.svelte';
	import HorsePp from '$lib/individual/HorsePP.svelte';
	import { printMode, numRaces } from '$lib/stores';

	let files: FileList | undefined;
	let races: RaceRoot[] = [];
	let race: RaceRoot | undefined;

	onMount(async () => {
		const blob = await fetch('/data/tup20250204ppsXML.xml').then((response) => response.blob());
		const file = new File([blob], 'example.xml');
		parseXMLPP(file);
	});

	$: if (files != undefined) parseXMLPP(files[0]);

	async function parseXMLPP(file: File) {
		if (!file) return;
		const json = JSON.parse(convert.xml2json(await file.text(), { compact: true, spaces: 4 }));
		races = json.data.racedata;
		races = [...races];
		race = races[0];
	}

	function previous() {
		if (!race) return;
		const index = parseInt(race?.race._text) - 1;
		if (index === 0) return;
		race = races[index - 1];
	}
	function next() {
		if (!race) return;
		const index = parseInt(race?.race._text);
		if (index > races.length - 1) return;
		race = races[index];
	}

	function pageClicked(event: MouseEvent) {
		if (!event.target) return;
		// @ts-ignore
		const index = parseInt(event.target.innerText.split(' ')[1]) - 1;
		race = races[index];
	}
</script>

<div class="mx-auto max-w-2xl print:hidden">
	<h1 class="mb-4 text-2xl font-bold">Beginner PP Visualizer</h1>

	<div class="mb-6">
		<Label for="file-upload" class="mb-2">Upload an XML file downloaded from TrackMaster</Label>
		<Fileupload id="file-upload" accept=".xml" bind:files />
	</div>
</div>

<div class="mb-2 flex justify-center print:hidden">
	<div class="me-2 inline-flex print:hidden">
		<Label for="numRaces" class="my-auto h-min">Number of Races Shown</Label>
		<Select
			id="numRaces"
			value={$numRaces.toString()}
			on:change={(e) => ($numRaces = parseInt(e?.target?.value))}
			class="ml-2 w-20"
			size="sm"
		>
			<option value="3">3</option>
			<option value="5">5</option>
			<option value="10">10</option>
		</Select>
	</div>
	{#if !$printMode}
		<Pagination
			pages={races.map((race) => ({ name: `Race ${race.race._text}` }))}
			large
			on:previous={previous}
			on:next={next}
			on:click={pageClicked}
		>
			<svelte:fragment slot="prev">
				<span class="sr-only">Previous</span>
				<ChevronLeftOutline class="h-6 w-6" />
			</svelte:fragment>
			<svelte:fragment slot="next">
				<span class="sr-only">Next</span>
				<ChevronRightOutline class="h-6 w-6" />
			</svelte:fragment>
		</Pagination>
	{/if}
	<div class="float-right my-auto ms-2">
		<Toggle id="print-mode" size="small" color="blue" bind:checked={$printMode}>Print Mode</Toggle>
	</div>
</div>

{#if race && !$printMode}
	<div
		class="mx-3 mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md print:mx-0 print:border-0 print:bg-transparent"
	>
		<RaceInformation {race} />
		<RaceStats {race} />
		{#each race.horsedata as horse}
			<Hr />
			<HorsePp {horse} />
		{/each}
	</div>
{:else if races && $printMode}
	{#each races as race}
		<div
			class="mx-3 mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md print:break-after-page print:border-0 print:bg-transparent {$printMode
				? 'mx-auto max-w-3xl'
				: ''}"
		>
			<RaceInformation {race} />
			<RaceStats {race} />
			{#each race.horsedata as horse}
				<Hr />
				<HorsePp {horse} />
			{/each}
		</div>
	{/each}
{/if}
