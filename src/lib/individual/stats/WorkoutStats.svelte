<script lang="ts">
	import type { Workoutdaum } from '$lib/types/race';
	import dayjs from 'dayjs';
	import { P, Progressbar } from 'flowbite-svelte';

	export let workouts: Workoutdaum[];
</script>

<div class="flex w-full justify-evenly">
	{#if workouts.length > 0}
		{#each workouts.slice(0, 5) as workout}
			<div class="mx-2 w-min">
				<P class="w-full whitespace-nowrap text-start text-xs font-thin"
					>{dayjs().subtract(parseInt(workout.days_back._text), 'day').format('MM/DD/YY')}
					{workout.worktext._text}</P
				>
				<div class="flex w-full items-center gap-1">
					<P class="whitespace-nowrap text-xs font-thin"
						>{workout.ranking._text}/{workout.rank_group._text}</P
					>
					<Progressbar
						class="flex-1"
						progress={((parseInt(workout.rank_group._text) + 1 - parseInt(workout.ranking._text)) /
							parseInt(workout.rank_group._text)) *
							100}
						color="indigo"
						size="h-2"
					/>
				</div>
			</div>
		{/each}
	{:else}
		<P class="text-center text-sm font-semibold">No Workouts</P>
	{/if}
</div>
