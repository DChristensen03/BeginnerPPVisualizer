<script lang="ts">
	import RaceInformation from '$lib/RaceInformation.svelte';
	import type { RaceRoot } from '$lib/types/race';
	import { Label, Fileupload, Hr, Pagination } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import convert from 'xml-js';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	import RaceStats from '$lib/RaceStats.svelte';
	import HorsePp from '$lib/individual/HorsePP.svelte';

	let files: FileList | undefined;
	let races: RaceRoot[] = [];
	let race: RaceRoot | undefined;

	onMount(async () => {
		const blob = await fetch('/data/baq20241003ppsXML.xml').then((response) => response.blob());
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
	<h1 class="mb-4 text-2xl font-bold">XML File Upload</h1>

	<div class="mb-6">
		<Label for="file-upload" class="mb-2">Upload XML file</Label>
		<Fileupload id="file-upload" accept=".xml" bind:files />
	</div>
</div>

<div class="mb-2 flex justify-center print:hidden">
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
</div>

{#if race}
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
{/if}
