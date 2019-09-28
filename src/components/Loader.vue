<template>
    <div>
        <v-img></v-img>
			<v-progress-circular
			style="margin:auto"
			:size="70"
			:width="7"
			color="green accent-2"
			indeterminate>
        </v-progress-circular>  
    </div>
</template>

<script>
export default {
    name : 'Loader'
}
</script>