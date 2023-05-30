<template>
	<div id="tml-toasts">
		<!-- <div class="toast error active">HELLO</div> -->
		<div
			v-for="(toast, $t) of toasts"
			:key="'toast_'.$t"
			class="toast"
			:class="[toast.type, { active: toast.active }]"
		>
			{{ toast.message }}
		</div>
	</div>
</template>
<script setup>
	import useToasts from "../composables/useToast";
	import { inject } from "vue";
	const uid = inject("uid");
	const { state: toasts } = useToasts(uid);
</script>
<style></style>
