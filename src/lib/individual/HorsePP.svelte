<script lang="ts">
	import type { Horsedaum } from '$lib/types/race';
	import { Heading, P } from 'flowbite-svelte';
	import LifetimeStats from './stats/LifetimeStats.svelte';
	import JockeyStats from './stats/JockeyStats.svelte';
	import HorseStats from './stats/HorseStats.svelte';
	import TrainerStats from './stats/TrainerStats.svelte';
	import IndividualRaceRow from './stats/IndividualRaceRow.svelte';
	import { numRaces } from '$lib/stores';
	import WorkoutStats from './stats/WorkoutStats.svelte';

	export let horse: Horsedaum;
</script>

<div class="grid grid-cols-12">
	<div class="col-span-2 flex-row">
		<div class="inline-flex">
			<div class="flex-row">
				<Heading tag="h2" class="w-min pr-1">{horse.pp._text}</Heading>
				<P class="text-xs font-semibold">{horse.morn_odds._text}</P>
			</div>
			<div class="flex-row">
				<P class="pt-1"
					>{horse.horse_name._text}
					{#if horse.ae_flag._text}<span class="rounded-sm bg-black px-1 text-white"
							>{horse.ae_flag._text == 'A' ? 'AE' : 'MTO'}</span
						>{/if}</P
				>
				<P class="text-gray text-xs font-thin italic">Trainer: {horse.trainer.tran_disp._text}</P>
			</div>
		</div>
		<div>
			<JockeyStats jockey={horse.jockey} />
		</div>
	</div>
	<div class="col-span-4">
		<LifetimeStats {horse} />
	</div>
	<div class="col-span-4">
		<HorseStats stats={horse.stats_data} />
	</div>
	<div class="col-span-2 flex-row">
		<div>
			<P class="pt-1">{horse.med._text} {horse.weight._text}</P>
		</div>
		<div>
			<P class="text-gray text-xs font-thin italic">Sire: {horse.sire.sirename._text}</P>
		</div>
		<div>
			<P class="text-gray text-xs font-thin italic">Dam: {horse.dam.damname._text}</P>
		</div>
		<div>
			<TrainerStats trainer={horse.trainer} />
		</div>
	</div>
</div>
{#each horse.ppdata.filter((pp: any) => pp?.racetype?._text !== 'SCR').slice(0, $numRaces) as pp}
	<div class="grid grid-cols-12">
		<IndividualRaceRow {pp} />
	</div>
{/each}
<div>
	<WorkoutStats workouts={horse.workoutdata} breed={horse.breed_type._text} />
</div>
