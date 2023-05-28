<template>
    <div
      class="tml-progress"
    >
      <!-- Building a Progress Ring: https://css-tricks.com/building-progress-ring-quickly/ -->
      <svg class="w-20 h-20">
        <circle
          class="tml-progress-circle-bg"
          stroke-width="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          class="tml-progress-circle"
          stroke-width="5"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference - value / 100 * circumference"
          stroke-linecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span class="absolute text-xl text-blue-700" v-text="`${value}%`"></span>
    </div>
</template>
<script>
export default {
    props: {
        value: {default: 0},
    },
    data(){
        return {
            circumference: 30 * 2 * Math.PI
        }
    }
}
</script>