<script lang="ts">
	import type { StatsData } from '$lib/types/race';
	import { Chart } from 'flowbite-svelte';

	export let stats: StatsData;

	let options: ApexCharts.ApexOptions;

	$: buildOptions(stats);

	function buildOptions(stats: StatsData) {
		const distanceStats = stats.stat.find((s) => s._attributes.type === 'DIST_SURF');
		const trackStats = stats.stat.find((s) => s._attributes.type === 'AT_TRK');
		const jockHorseStats = stats.stat.find((s) => s._attributes.type === 'JOCK_HORSE');
		const mudStats = stats.stat.find((s) => s._attributes.type === 'MUD');
		const trainHorseStats = stats.stat.find((s) => s._attributes.type === 'TRAN_HORSE');

		const parseStatValue = (value: any) => {
			return value?._text ? parseInt(value._text) : null;
		};

		options = {
			series: [
				{
					name: 'Starts',
					data: [
						{ x: 'Distance', y: parseStatValue(distanceStats?.starts) },
						{ x: 'Track', y: parseStatValue(trackStats?.starts) },
						{ x: 'Off', y: parseStatValue(mudStats?.starts) },
						{ x: 'Jockey/Horse', y: parseStatValue(jockHorseStats?.starts) },
						{ x: 'Trainer/Horse', y: parseStatValue(trainHorseStats?.starts) }
					]
				},
				{
					name: 'Wins',
					data: [
						{ x: 'Distance', y: parseStatValue(distanceStats?.wins) },
						{ x: 'Track', y: parseStatValue(trackStats?.wins) },
						{ x: 'Off', y: parseStatValue(mudStats?.wins) },
						{ x: 'Jockey/Horse', y: parseStatValue(jockHorseStats?.wins) },
						{ x: 'Trainer/Horse', y: parseStatValue(trainHorseStats?.wins) }
					]
				},
				{
					name: 'Places',
					data: [
						{ x: 'Distance', y: parseStatValue(distanceStats?.places) },
						{ x: 'Track', y: parseStatValue(trackStats?.places) },
						{ x: 'Off', y: parseStatValue(mudStats?.places) },
						{ x: 'Jockey/Horse', y: parseStatValue(jockHorseStats?.places) },
						{ x: 'Trainer/Horse', y: parseStatValue(trainHorseStats?.places) }
					]
				},
				{
					name: 'Shows',
					data: [
						{ x: 'Distance', y: parseStatValue(distanceStats?.shows) },
						{ x: 'Track', y: parseStatValue(trackStats?.shows) },
						{ x: 'Off', y: parseStatValue(mudStats?.shows) },
						{ x: 'Jockey/Horse', y: parseStatValue(jockHorseStats?.shows) },
						{ x: 'Trainer/Horse', y: parseStatValue(trainHorseStats?.shows) }
					]
				}
			],
			chart: {
				type: 'bar',
				height: 225,
				animations: {
					enabled: true
				},
				toolbar: {
					show: false
				}
			},
			legend: {
				show: false
			},
			dataLabels: {
				enabled: true,
				style: {
					colors: ['black']
				}
			},
			theme: {
				mode: 'light',
				palette: 'palette1'
			},
			xaxis: {
				title: {
					text: 'Horse Stats'
				}
			}
		};
	}
</script>

<Chart {options} />
