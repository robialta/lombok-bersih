<template>
    <div>
        <v-img></v-img>
		<v-progress-circular
		style="margin:auto"
		:size="200"
		:width="8"
		color="purple"
		class="text-center"
		indeterminate>
			<div class="wr ">
				<span class="mx-auto" style="width">
					<v-img src="../assets/logo.png" class="gmbr mx-auto" max-height="80" max-width="60"></v-img>
				</span>		
				<span  class="lombok">LOMBOK </span> 
				<span class="bersih">BERSIH </span>   
			</div>
		</v-progress-circular>  
    </div>
</template>

<script>
export default {
    name : 'Loader'
}
</script>

<style scoped>
	  .lombok{
    font-family: 'Sedgwick Ave Display', cursive;
    color: #f01799;
  
  }
  .bersih{
    font-family: 'Patrick Hand', cursive;
    color: #38cfe0;
    font-size: 20px;
    /* text-shadow: 3px 3px 12px rgba(70, 240, 183, 0.58); */
    padding-right: 5px;
  }
</style>