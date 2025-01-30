<script lang="ts">
	import type { RaceRoot } from '$lib/types/race';
	import { Chart } from 'flowbite-svelte';
	import colors from '$lib/colors.json';

	export let race: RaceRoot, numRaces: Number;

	let options: ApexCharts.ApexOptions;

	$: buildOptions(race, numRaces);

	function buildOptions(race: RaceRoot, numRaces: Number) {
		const recentClass = race.horsedata.map((horse) => {
			let classLastNum: number = 0;
			if (!Array.isArray(horse.ppdata)) horse.ppdata = [horse.ppdata];
			let filteredPPs = horse.ppdata
				.filter((pp: any) => pp?.racetype._text !== 'SCR' && pp?.classratin)
				.slice(0, numRaces);
			filteredPPs.forEach((pp: any) => {
				classLastNum += parseInt(pp.classratin._text);
			});
			// @ts-ignore
			const color = colors[horse.pp._text.replace(/\D/g, '')];
			return {
				x: `(${horse.pp._text}) ${horse.horse_name._text}`,
				y: classLastNum !== 0 ? classLastNum / filteredPPs.length : 0,
				fillColor: color.primary,
				strokeColor: color.secondary,
				meta: {
					foreColor: color.secondary
				}
			};
		});
		options = {
			series: [
				{
					name: `Class Last ${numRaces}`,
					data: recentClass
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
					horizontal: false,
					borderRadius: 2,
					dataLabels: {
						position: 'top'
					}
				}
			},
			dataLabels: {
				enabled: true,
				offsetY: -20,
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
				text: `Avg. Class Rating Last ${numRaces} Races`,
				align: 'center'
			},
			subtitle: {
				text: `Horses with less than ${numRaces} races will only display the average of those races`,
				align: 'center'
			},
			yaxis: {
				title: {
					text: 'Class Rating'
				},
				stepSize: 10,
				min: 0,
				max: Math.ceil(Math.max(100, Math.max(...recentClass.map((d) => d.y))) / 10) * 10,
				labels: {
					formatter: function (val: number) {
						return val.toFixed(0);
					}
				}
			}
		};
	}
</script>

<div>
	<Chart bind:options />
</div>
