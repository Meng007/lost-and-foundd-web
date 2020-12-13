<template>
    <div style="height: 100%">
        {{this.$route.query.text}}
    </div>
</template>

<script>
    export default {
        name: "Search",
        created(){
            document.title = '小主平台|搜索'
        },
    }
</script>

<style scoped>

</style>
