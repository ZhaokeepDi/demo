<template>
	<div id="app">
		<div>
			<p>原图</p>
			<img style="height:300px" :src="src" />
		</div>
		<div>
			<p>点击长按拖拽，滚轮控制大小\|/</p>
			<clip :clipWidth="300" ref="clip" :clipHeight="300" :file="src" />
      <p @click="save">生成</p>
		</div>
  <div>
    <p>生成base64位图</p>
    <img style="height:300px" :src="base64" />
  </div>
		
	</div>
</template>

<script>
import clip from "./components/clip.vue"

export default {
	name: "App",
	components: {
		clip,
	},
	data() {
		return {
			src: require("./assets/1.jpg"),
			clpiImg: {},
			base64: null,
		}
	},
	methods: {
		save() {
			this.base64 = this.$refs.clip.createPng().base + ""
		},
	},
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	display: flex;
	justify-content: space-around;
}
</style>
