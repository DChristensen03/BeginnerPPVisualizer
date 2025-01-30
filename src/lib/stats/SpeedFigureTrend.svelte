<script lang="ts">
	import type { RaceRoot } from '$lib/types/race';
	import { Chart } from 'flowbite-svelte';
	import colors from '$lib/colors.json';

	export let race: RaceRoot, numRaces: Number;

	let options: ApexCharts.ApexOptions;

	$: buildOptions(race, numRaces);

	function buildOptions(race: RaceRoot, numRaces: Number) {
		// Transform data into series format
		const series = race.horsedata.map((horse) => {
			if (!Array.isArray(horse.ppdata)) horse.ppdata = [horse.ppdata];
			const speedFigures = horse.ppdata
				.filter((pp: any) => pp?.racetype._text !== 'SCR' && parseInt(pp?.speedfigur._text) > 0)
				.slice(0, numRaces)
				.reverse()
				.map((pp: any) => parseInt(pp.speedfigur._text));

			// Pad with nulls if less than numRaces entries
			while (speedFigures.length < numRaces) {
				speedFigures.unshift(null);
			}

			// @ts-ignore
			const color = colors[horse.pp._text.replace(/\D/g, '')];

			return {
				name: horse.pp._text,
				data: speedFigures,
				color: color.primary
			};
		});

		options = {
			series: series,
			chart: {
				type: 'line',
				height: 350,
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
				offsetY: -5,
				formatter: function (val: string | number | number[], opts: any): string {
					const seriesIndex = opts.seriesIndex;
					const dataPointIndex = opts.dataPointIndex;
					const lastIndex = opts.w.config.series[seriesIndex].data.length - 1;
					return val !== null
						? dataPointIndex === lastIndex
							? `${val} - ${series[seriesIndex].name}`
							: String(val)
						: '';
				}
			},
			xaxis: {
				title: {
					text: `Last ${numRaces} Races (Oldest to Newest)`
				},
				categories: [...Array(numRaces).keys()].map((x) => `Race ${x + 1}`)
			},
			yaxis: {
				title: {
					text: 'Speed Figure'
				}
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
