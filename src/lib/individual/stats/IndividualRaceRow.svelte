<script lang="ts">
	import { P, Progressbar } from 'flowbite-svelte';
	import RaceVisualizationChart from './RaceVisualizationChart.svelte';
	import dayjs from 'dayjs';

	export let pp: any;

	const raceTypes = {
		AL: 'Allowance',
		MS: 'Maiden Special Weight',
		CL: 'Claiming',
		OC: 'Allowance Optional Claiming',
		MC: 'Maiden Claiming',
		SO: 'Starter Optional Claiming',
		MO: 'Maiden Optional Claiming',
		ST: 'Stakes',
		SA: 'Starter Allowance'
	};

	const trackConditions = {
		FT: 'Fast',
		GD: 'Good',
		FM: 'Firm',
		MY: 'Muddy',
		SY: 'Sloppy'
	};

	const badLuckComments = [
		'bump',
		'stumbled',
		'checked',
		'steadied',
		'stopped',
		'squeezed',
		'steady',
		'head_turned',
		'unprepared_start',
		'wd',
		'wide',
		'bled'
	];

	function formatRaceClass(raceClass: string) {
		return raceTypes[raceClass as keyof typeof raceTypes] || raceClass;
	}

	function formatDistance(distance: number) {
		distance = distance / 100;
		if (distance < 8) {
			if (Number.isInteger(distance)) return `${distance}f`;
			else return `${Math.floor(distance)} 1/2f`;
		} else if (distance == 8) {
			return `1 mile`;
		} else {
			const remainder = distance % 8;
			const miles = Math.floor(distance / 8);
			if (Number.isInteger(remainder)) {
				if (remainder == 2 || remainder == 6) {
					return `${miles} ${remainder / 2}/4 miles`;
				} else if (remainder == 4) {
					return `${miles} ${remainder / 4}/2 miles`;
				} else {
					return `${miles} ${remainder}/8 miles`;
				}
			} else return `${miles} ${remainder * 2}/16 miles`;
		}
	}

	function formatSurface(surface: string) {
		if (surface == 'T') return 'Turf';
		else if (surface == 'D') return 'Dirt';
		else if (surface == 'AW') return 'All Weather';
		else return surface;
	}

	function formatCondition(condition: String) {
		return trackConditions[condition as keyof typeof trackConditions] || condition;
	}

	function getBadLuck(longComment: string) {
		let badLuck =
			(badLuckComments.find((comment) => longComment.includes(comment))?.length ?? 0) * 20;
		badLuck = badLuck > 100 ? 100 : badLuck;
		return `${badLuck}`;
	}
</script>

<div class="col-span-2">
	<P class="text-xs font-semibold"
		>{dayjs(pp.racedate._text).format('YYYY-MM-DD')} {pp.trackname._text}</P
	>
	<P class="text-xs font-thin"
		>{pp.lineafter._text && !pp.lineafter._text.includes('Claim')
			? pp.lineafter._text
			: formatRaceClass(pp.raceclass._text)}
		{parseInt(pp.purse._text).toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		})}</P
	>
	<P class="text-xs font-thin"
		>{formatDistance(pp.distance._text)}
		{formatSurface(pp.surface._text)}
		{formatCondition(pp.trackcondi._text)}</P
	>
	<P class="text-xs">Class Rating: <span class="font-bold">{pp.classratin._text}</span></P>
	<P class="text-xs">Speed Figure: <span class="font-bold">{pp.speedfigur._text}</span></P>
</div>
<div class="col-span-8">
	<RaceVisualizationChart {pp} />
</div>
<div class="col-span-2">
	<div class="flex w-full items-center gap-2">
		<P class="whitespace-nowrap text-sm font-semibold">Bad Luck:</P>
		<Progressbar progress={getBadLuck(pp.longcommen._text)} color="red" size="h-3" class="flex-1" />
	</div>
	<P class="text-xs font-thin">{pp.shortcomme._text}</P>
	<P class="text-xs">Winning Speed Figure: <span class="font-bold">{pp.winnersspe._text}</span></P>
</div>
