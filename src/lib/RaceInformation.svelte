<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
	import type { RaceRoot } from './types/race';
	import { formatTime } from './utils';

	export let race: RaceRoot;
</script>

<div class="mb-3 grid grid-cols-8">
	<div>
		<Heading tag="h1">{race.race._text}</Heading>
		<P class="font-semibold">Class Rating: {race.todays_cls._text}</P>
		<P class="font-semibold">Par Time: {formatTime(parseFloat(race.partim._text))}</P>
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
		<P class="text-right font-semibold">PT: {race.post_time._text}</P>
		<P class="text-right font-semibold"
			>Purse: {parseInt(race.purse._text).toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
				maximumFractionDigits: 0
			})}</P
		>
		{#if parseInt(race?.claimamt?._text ?? 0) > 0}
			<P class="text-right font-semibold"
				>Claiming Tag: {parseInt(race?.claimamt?._text).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
					maximumFractionDigits: 0
				})}</P
			>
		{/if}
	</div>
</div>
