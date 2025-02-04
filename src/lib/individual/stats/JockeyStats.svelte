<script lang="ts">
	import { animationsEnabled } from '$lib/stores';
	import type { Jockey } from '$lib/types/race';
	import { Chart } from 'flowbite-svelte';

	export let jockey: Jockey;

	let options: ApexCharts.ApexOptions;

	$: buildOptions(jockey);

	function buildOptions(jockey: Jockey) {
		const { starts, wins, places, shows } = jockey.stats_data.stat;
		const numStarts = parseInt(starts._text);
		const numWins = parseInt(wins._text);
		const numPlaces = parseInt(places._text);
		const numShows = parseInt(shows._text);

		options = {
			series: [numStarts - numWins - numPlaces - numShows, numWins, numPlaces, numShows],
			labels: ['Off Board', 'Wins', 'Places', 'Shows'],
			chart: {
				type: 'donut',
				animations: {
					enabled: $animationsEnabled
				}
			},
			title: {
				text: `${jockey.jock_disp._text}: ${numStarts} (${numWins}-${numPlaces}-${numShows})`,
				align: 'center',
				style: {
					fontSize: '10px'
				}
			},
			dataLabels: {
				style: {
					fontSize: '10px',
					fontFamily: 'Helvetica, Arial, sans-serif',
					colors: ['#000']
				},
				formatter(val, opts) {
					return `${parseFloat(val.toString()).toFixed(2)}% - ${opts.w.globals.seriesNames[opts.seriesIndex]}`;
				}
			},
			legend: {
				show: false
			}
		};
	}
</script>

<Chart {options} />
