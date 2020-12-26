<template>
    <div>
       <el-row>
           <el-col :span="16">
               <div  style="position: relative;height: 350px">
                   <img style="display: inline-block;position: absolute; top: 100px;left: 50%;transform: translate(-50%,0)" :src="require('@/assets/image/no_data.png')" alt="">
                   <span style="display: inline-block;position: absolute;left: 50%;top: 164px;transform: translate(-50% ,0);color: #909399;font-size: 14px" >暂无数据</span>
               </div>
           </el-col>
           <el-col :span="8">
               热门话题
           </el-col>
       </el-row>
    </div>
</template>

<script>
    export default {
        name: "Message",
        created(){
            document.title = '小主平台|留言墙'
        },
    }
</script>

<style scoped>

</style>
