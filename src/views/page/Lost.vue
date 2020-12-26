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
                <GoodsList v-else   :goods-list="goodsList"/>
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
                    丢失榜
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import GoodsList from "@/components/GoodsList";
    import {getLostGoods,getGoodsCate} from '@/api/admin/Goods'
    export default {
        name: "Lost",
        components:{
            GoodsList
        },
        data(){
          return{
              goodsTypeList: [
                  {id: 1,click: false,label: '手机'},
                  {id: 2,click: false,label: '电脑'},
                  {id: 3,click: false,label: '卡'},
                  {id: 4,click: false,label: '课本'},
                  {id: 5,click: false,label: '文具'},
                  {id: 6,click: false,label: '包'},
                  {id: 7,click: false,label: '伞'},
                  {id: 8,click: false,label: '钥匙'},
                  {id: 9,click: false,label: '手机'},
                  {id: 10,click: false,label: '手机'},
                  {id: 11,click: false,label: '手机'},
                  {id: 12,click: false,label: '手机'},
                  {id: 13,click: false,label: '手机'},
              ],
              goodsList:[],
              loading: false,
              query: {
                  page: 1,
                  size: 10,
                  goodsType: '',
                  total: 0
              },
          }
        },
        created(){
            document.title = '小主平台|失物页'
            this.apiGetGoodsCate()
            this.apiGetLostGoods()
        },
        methods:{
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
            checkType(i){
                this.goodsTypeList.forEach(val =>{
                    val.click = false
                })
                i.click = true
                this.query.goodsType = i.id
                this.apiGetLostGoods()
            },
            //获取物品列表
            apiGetLostGoods(){
                this.loading = true
                getLostGoods(this.query).then(res =>{
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
            //翻页
            apiCurrentChange(index){
                this.query.page = index
                this.apiGetLostGoods()
            },
            //条数
            apiSizeChange(index){
                this.query.size = index
                this.apiGetLostGoods()
            }
        }
    }
</script>

<style scoped lang="less">
    .goods-type:hover{
        color: #409EFF;
    }
</style>
