<template>
    <div style="height: 100%;">
        <el-row :gutter="4">
            <el-col :span="18" v-loading="loading">
                <!--分类-->
                <el-card>
                    <el-tag class="goods-type" v-for="i in goodsTypeList" @click="checkType(i)" :key="i.id" style="margin: 2px 2px;cursor: pointer" :type="i.click?'primary':'info'">{{i.cateName}}</el-tag>
                </el-card>
                <div v-if="goodsList.length ===0" style="position: relative;height: 350px">
                    <img style="display: inline-block;position: absolute; top: 100px;left: 50%;transform: translate(-50%,0)" :src="require('@/assets/image/no_data.png')" alt="">
                    <span style="display: inline-block;position: absolute;left: 50%;top: 164px;transform: translate(-50% ,0);color: #909399;font-size: 14px" >暂无数据</span>
                </div>
                <GoodsList v-else  :goods-list="goodsList"/>

                <!--分页-->
                <el-pagination
                        @current-change="apiCurrentChange"
                        :page-size="query.size"
                        :current-page="query.page"
                        layout="total, prev, pager, next"
                        :total="query.total">
                </el-pagination>
            </el-col>
            <el-col :span="6">
                <el-card>
                    好人榜
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import GoodsList from "@/components/GoodsList";
    import {getTakeGoods,getGoodsCate} from '@/api/admin/Goods'
    export default {
        name: "Take",
        components:{
          GoodsList
        },
        created(){
            document.title = '小主平台|招领页'
            this.apiGetGoodsCate()
            this.apiGetTakeGoods()
        },
        data(){
            return{
                query: {
                    page: 1,
                    size: 10,
                    goodsType: '',
                    total: 0
                },
                goodsTypeList: [],
                goodsList: []
            }
        },
        methods:{
            checkType(i){
                this.goodsTypeList.forEach(val =>{
                    val.click = false
                })
                i.click = true
                this.query.goodsType = i.id
                this.apiGetTakeGoods()
            },
            apiGetTakeGoods(){
                this.loading = true
                getTakeGoods(this.query).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        this.loading = false
                        return
                    }
                    this.goodsList = res.data
                    this.query.total = res.total
                    this.loading = false
                })
            },
            apiGetGoodsCate(){
                getGoodsCate().then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        return
                    }
                    this.goodsTypeList = res.data
                    this.goodsTypeList.unshift({id:'',click: true,cateName: '全部'})
                })
            },
            //翻页
            apiCurrentChange(index){
                this.query.page = index
                this.apiGetGoods()
            },
        },

    }
</script>

<style scoped>
    .goods-type:hover{
        color: #409EFF;
    }
</style>
