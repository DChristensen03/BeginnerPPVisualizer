<script lang="ts">
	import type { RaceRoot } from '$lib/types/race';
	import { Chart } from 'flowbite-svelte';
	import colors from '$lib/colors.json';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import { animationsEnabled } from '$lib/stores';

	export let race: RaceRoot;

	let options: ApexCharts.ApexOptions;

	$: buildOptions(race);

	dayjs.extend(customParseFormat);

	function predictEarlyPosition(ppdata: any, targetDistance: number, raceDate: dayjs.Dayjs) {
		if (!ppdata || !Array.isArray(ppdata) || ppdata.length === 0) return 0;
		// Constants for weighting
		const DAYS_WEIGHT_FALLOFF = 180; // How quickly time weight decreases
		const DISTANCE_WEIGHT_FALLOFF = 100; // How quickly distance similarity weight decreases
		const MIN_WEIGHT = 0.1; // Minimum weight for any race

		// Calculate weights and weighted sum for each historical race
		let totalWeight = 0;
		let weightedSum = 0;

		ppdata.forEach((race: any) => {
			if (!race?.pacefigure?._text) return; // Skip if no pace figure
			// Calculate days since race
			const daysSince = raceDate.diff(dayjs(race?.racedate._text, 'YYYYMMDD'), 'day');

			// Time weight: exponential decay based on days since race
			const timeWeight = Math.exp(-daysSince / DAYS_WEIGHT_FALLOFF);

			// Distance weight: exponential decay based on distance difference
			const distanceDiff = Math.abs(parseInt(race.distance._text) - targetDistance);
			const distanceWeight = Math.exp(-distanceDiff / DISTANCE_WEIGHT_FALLOFF);

			// Combine weights and ensure minimum weight
			let totalRaceWeight = Math.max(timeWeight * distanceWeight, MIN_WEIGHT);

			weightedSum += parseInt(race?.pacefigure._text) * totalRaceWeight;
			totalWeight += totalRaceWeight;
		});

		// Return weighted average of early speed ratings
		return totalWeight > 0 ? weightedSum / totalWeight : null;
	}

	function buildOptions(race: RaceRoot) {
		const targetDistance = parseFloat(race.distance._text);
		const raceDate = dayjs(race.race_date._text, 'YYYYMMDD');

		const adjustedPace: any = race.horsedata
			.filter((horse) => horse.notScratched)
			.map((horse) => {
				if (!Array.isArray(horse.ppdata)) horse.ppdata = [horse.ppdata];
				let weightedEPF = predictEarlyPosition(horse.ppdata, targetDistance, raceDate);

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
				},
				animations: {
					enabled: $animationsEnabled
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
					return val?.toFixed(1) ?? 0;
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
			},
			xaxis: {
				type: 'numeric'
			}
		};
	}
</script>

<div>
	<Chart {options} />
</div>
