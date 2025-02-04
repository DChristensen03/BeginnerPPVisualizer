<script lang="ts">
	import { Checkbox } from 'flowbite-svelte';
	import type { RaceRoot } from './types/race';

	export let race: RaceRoot | undefined;
</script>

<div class="mb-3 flex justify-center space-x-2 print:hidden">
	{#each race?.horsedata ?? [] as horse}
		<Checkbox
			bind:checked={horse.notScratched}
			on:change={() => {
				if (race) race.horsedata = [...race.horsedata];
			}}
			title={horse.horse_name._text}
		>
			({horse.pp._text})
			{horse.horse_name._text}
		</Checkbox>
	{/each}
</div>
