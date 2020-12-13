<template>
    <div style="height: 100%;">
        {{this.$route.query.goodsId}}
        <el-row>
            <el-col :span="16">
                <div class="goods-info-header">
                    <el-image fit="cover" src="http://localhost:8080/static/img/profile.9e7a51a3.jpg"></el-image>
                    <div class="other">

                    </div>
                </div>
                <div class="goods-info-content">

                </div>
            </el-col>
            <el-col :span="8">
                失主信息
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "GoodsInfo"
    }
</script>

<style scoped lang="less">
.goods-info-header{
    .el-image{
        width: 210px;
        height: 150px;
        float: left;
        left: 0;
    }
}
</style>
