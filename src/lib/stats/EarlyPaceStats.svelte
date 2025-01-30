<script lang="ts">
	import type { RaceRoot } from '$lib/types/race';
	import { Chart } from 'flowbite-svelte';
	import colors from '$lib/colors.json';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';

	export let race: RaceRoot;

	let options: ApexCharts.ApexOptions;

	$: buildOptions(race);

	dayjs.extend(customParseFormat);

	function buildOptions(race: RaceRoot) {
		const targetDistance = parseFloat(race.distance._text);
		const raceDate = dayjs(race?.race_date._text, 'YYYYMMDD');
		const K_D = 80; // Distance sensitivity constant (adjust as needed)
		const K_T = 40; // Time sensitivity constant (adjust as needed)

		const adjustedPace: any = race.horsedata.map((horse) => {
			let weightedEPF = 0;

			if (!Array.isArray(horse.ppdata)) horse.ppdata = [horse.ppdata];
			horse.ppdata.forEach((race: any) => {
				if (!race?.pacefigure) return;
				const epf = parseInt(race?.pacefigure._text);
				const distance = parseFloat(race.distance._text);
				const daysAgo = raceDate.diff(dayjs(race?.racedate._text, 'YYYYMMDD'), 'day');

				// Distance weight
				const distanceWeight = Math.exp(-Math.abs(distance - targetDistance) / K_D);

				// Time weight
				const timeWeight = Math.exp(-daysAgo / K_T);

				// Accumulate weighted EPF
				weightedEPF += epf * distanceWeight * timeWeight;
			});
			// @ts-ignore
			const color = colors[horse.pp._text.replace(/\D/g, '')];

			return {
				x: `(${horse.pp._text}) ${horse.horse_name._text}`,
				y: weightedEPF,
				fillColor: color.primary,
				strokeColor: color.secondary,
				meta: {
					foreColor: color.secondary
				}
			};
		});
		adjustedPace.sort((a: any, b: any) => b.y - a.y);
		options = {
			series: [
				{
					name: 'Adjusted Pace Figure',
					data: adjustedPace
				}
			],
			chart: {
				type: 'bar',
				height: 350,
				toolbar: {
					show: false
				}
			},
			states: {
				hover: {
					filter: {
						type: 'none'
					}
				},
				active: {
					filter: {
						type: 'none'
					}
				}
			},
			tooltip: {
				enabled: false
			},
			plotOptions: {
				bar: {
					borderRadius: 2,
					dataLabels: {
						position: 'top'
					},
					borderRadiusApplication: 'end',
					horizontal: true
				}
			},
			dataLabels: {
				enabled: true,
				offsetX: 20,
				style: {
					fontSize: '12px',
					colors: ['#304758']
				},
				formatter: function (val: number) {
					return val.toFixed(1);
				}
			},
			stroke: {
				show: true,
				width: 2
			},
			title: {
				text: 'Adjusted Early Pace Figure',
				align: 'center'
			},
			subtitle: {
				text: 'Estimates the early race pace based on a calculation weighting race distance as well as recency.',
				align: 'center'
			}
		};
	}
</script>

<div>
	<Chart {options} />
</div>
