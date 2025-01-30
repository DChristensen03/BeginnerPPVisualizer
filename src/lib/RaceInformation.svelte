<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
	import type { RaceRoot } from './types/race';

	export let race: RaceRoot;

	$: console.log(race);
</script>

<div class="mb-3 grid grid-cols-8">
	<div>
		<Heading tag="h1">{race.race._text}</Heading>
	</div>
	<div class="col-span-6">
		<div class="grid grid-rows-subgrid space-y-2">
			<P>{race.race_text._cdata}</P>
			<P class="text-gray text-xs font-extrabold italic">{race.bet_opt._text}</P>
		</div>
	</div>
	<div class="justify-end">
		<Heading
			tag="h5"
			class="text-right {race.surface._text === 'T'
				? 'text-green-400'
				: race.surface._text === 'D'
					? 'text-yellow-600'
					: 'text-gray-600'}">{race.dist_disp._text} {race.surface._text}</Heading
		>
	</div>
</div>
