<script lang="ts">
	import ClassStats from './stats/ClassStats.svelte';
	import EarlyPaceStats from './stats/EarlyPaceStats.svelte';
	import SpeedFigureStats from './stats/SpeedFigureStats.svelte';
	import SpeedFigureTrend from './stats/SpeedFigureTrend.svelte';
	import type { RaceRoot } from './types/race';
	import { printMode } from './stores';

	export let race: RaceRoot;
</script>

<div class="grid {$printMode ? 'grid-cols-2' : 'grid-cols-1'} gap-4 lg:grid-cols-2">
	<ClassStats {race} />
	<SpeedFigureStats {race} />
	<EarlyPaceStats {race} />
	<SpeedFigureTrend {race} />
</div>
