<template>
    <div style="height: 100%;">
        <el-row :gutter="4">
            <el-col :span="18">
                <!--分类-->
                <el-card>
                    <el-tag class="goods-type" v-for="i in goodsTypeList" @click="checkType(i)" :key="i.id" style="margin: 2px 2px;cursor: pointer" :type="i.click?'primary':'info'">{{i.cateName}}</el-tag>
                </el-card>
                <GoodsList :goods-list="goodsList"/>
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
                    typeId: '',
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
            },
            apiGetTakeGoods(){
                getTakeGoods(this.query).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        return
                    }
                    this.goodsList = res.data
                    this.query.total = res.total
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
            }
        },

    }
</script>

<style scoped>
    .goods-type:hover{
        color: #409EFF;
    }
</style>
