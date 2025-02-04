<script lang="ts">
	import { animationsEnabled } from '$lib/stores';
	import { Chart } from 'flowbite-svelte';

	export let pp: any;

	let options: ApexCharts.ApexOptions;

	$: buildOptions(pp);

	function buildOptions(pp: any) {
		const {
			positionst,
			position1,
			position2,
			positionfi,
			lenbackstr,
			lenback1,
			lenback2,
			lenbackfin
		} = pp;

		options = {
			series: [
				{
					name: 'Positions',
					data: [
						parseInt(lenbackstr._text) > 1000
							? 1000
							: parseInt(lenbackstr._text) < 0
								? 0
								: parseInt(lenbackstr._text),
						parseInt(lenback1._text) > 1000
							? 1000
							: parseInt(lenback1._text) < 0
								? 0
								: parseInt(lenback1._text),
						parseInt(lenback2._text) > 1000
							? 1000
							: parseInt(lenback2._text) < 0
								? 0
								: parseInt(lenback2._text),
						parseInt(lenbackfin._text) > 1000
							? 1000
							: parseInt(lenbackfin._text) < 0
								? 0
								: parseInt(lenbackfin._text)
					]
				}
			],
			chart: {
				type: 'line',
				height: 150,
				toolbar: {
					show: false
				},
				zoom: {
					enabled: false
				},
				animations: {
					enabled: $animationsEnabled
				}
			},
			plotOptions: {
				bar: {
					horizontal: true
				}
			},
			dataLabels: {
				enabled: true,
				formatter: function (value, opts) {
					return opts.dataPointIndex == 0
						? positionst._text
						: opts.dataPointIndex == 1
							? position1._text
							: opts.dataPointIndex == 2
								? position2._text
								: positionfi._text;
				}
			},
			legend: {
				position: 'top'
			},
			yaxis: {
				reversed: true,
				title: {
					text: 'Lengths Back'
				},
				labels: {
					formatter: function (value) {
						return (value / 100).toString();
					}
				},
				min: 0,
				max: 1000
			},
			xaxis: {
				categories: ['Start', '1st Call', '2nd Call', 'Finish']
			},
			tooltip: { enabled: false }
		};
	}
</script>

<Chart {options} />
