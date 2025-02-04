<script lang="ts">
	import { animationsEnabled } from '$lib/stores';
	import type { Trainer } from '$lib/types/race';
	import { Chart } from 'flowbite-svelte';

	export let trainer: Trainer;

	let options: ApexCharts.ApexOptions;

	$: buildOptions(trainer);

	function buildOptions(trainer: Trainer) {
		const { starts, wins, places, shows } = trainer.stats_data.stat;
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
				text: `${trainer.tran_disp._text}: ${numStarts} (${numWins}-${numPlaces}-${numShows})`,
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
