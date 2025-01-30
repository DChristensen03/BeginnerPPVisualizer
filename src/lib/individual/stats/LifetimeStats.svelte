<script lang="ts">
	import type { Horsedaum, RaceRoot } from '$lib/types/race';
	import { Chart } from 'flowbite-svelte';
	import colors from '$lib/colors.json';

	export let horse: Horsedaum;

	let options: ApexCharts.ApexOptions;

	$: buildOptions(horse);

	function buildOptions(horse: Horsedaum) {
		// Transform data into series format
		const finishes = horse.ppdata
			.filter((pp: any) => pp?.racetype._text !== 'SCR' && parseInt(pp?.speedfigur._text) > 0)
			.slice(0, 10)
			.reverse()
			.map((pp: any) => parseInt(pp.oflfinish._text));

		// Pad with nulls if less than 5 entries
		while (finishes.length < 10) {
			finishes.unshift(null);
		}

		// @ts-ignore
		const color = colors[horse.pp._text.replace(/\D/g, '')];

		options = {
			series: [{ name: horse.horse_name._text, data: finishes, color: color.primary }],
			chart: {
				type: 'line',
				height: 225,
				animations: {
					enabled: true
				},
				toolbar: {
					show: false
				},
				zoom: {
					enabled: false
				}
			},
			dataLabels: {
				enabled: true,
				offsetY: -5
			},
			xaxis: {
				title: {
					text: 'Last 10 Finishes'
				},
				categories: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
			},
			yaxis: {
				title: {
					text: 'Finish'
				},
				reversed: true,
				min: 1
			},
			stroke: {
				width: 3,
				curve: 'straight'
			},
			markers: {
				size: 5
			},
			tooltip: { enabled: false },
			legend: {
				markers: {
					strokeWidth: 2,
					shape: 'square'
				},
				labels: {
					colors: 'black'
				}
			}
		};
	}
</script>

<div>
	<Chart {options} />
</div>
