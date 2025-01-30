<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';
	import ClassStats from './stats/ClassStats.svelte';
	import EarlyPaceStats from './stats/EarlyPaceStats.svelte';
	import SpeedFigureStats from './stats/SpeedFigureStats.svelte';
	import SpeedFigureTrend from './stats/SpeedFigureTrend.svelte';
	import type { RaceRoot } from './types/race';

	export let race: RaceRoot;

	let numRaces: Number = 3;
</script>

<div class="inline-flex">
	<Label for="numRaces" class="my-auto h-min">Number of Races Shown</Label>
	<Select
		id="numRaces"
		value={numRaces.toString()}
		on:change={(e) => (numRaces = parseInt(e?.target?.value))}
		class="ml-2 w-20"
		size="sm"
	>
		<option value="3">3</option>
		<option value="5">5</option>
		<option value="10">10</option>
	</Select>
</div>
<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
	<ClassStats {race} {numRaces} />
	<SpeedFigureStats {race} {numRaces} />
	<EarlyPaceStats {race} />
	<SpeedFigureTrend {race} {numRaces} />
</div>
