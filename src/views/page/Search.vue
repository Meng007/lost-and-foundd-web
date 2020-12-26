<template>
    <div style="height: 100%">
        <el-row>
            <el-col :span="14" v-loading="loading">
                <div v-if="goodsList.length ===0" style="position: relative;height: 350px">
                    <img style="display: inline-block;position: absolute; top: 100px;left: 50%;transform: translate(-50%,0)" :src="require('@/assets/image/no_data.png')" alt="">
                    <span style="display: inline-block;position: absolute;left: 50%;top: 164px;transform: translate(-50% ,0);color: #909399;font-size: 14px" >暂无数据</span>
                </div>
                <GoodsList v-else  :goods-list="goodsList"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getSearchGoods} from '@/api/admin/Goods'
    import GoodsList from "@/components/GoodsList";
    export default {
        name: "Search",
        components:{
            GoodsList
        },
        data(){
            return{
                loading: false,
                query:{
                  page: 1,
                  size: 10,
                  total: 0,
                  text: this.$route.query.text
                },
                text: this.$route.query.text,
                goodsList:[]
            }
        },
        computed:{

        },
        watch:{
            $route(){
                this.text= this.$route.query.text
            },
            text(newVal,oldVal){
                console.log(oldVal)
                this.query.text = newVal
               this.apiSearchGoods()
            }
        },
        created(){
            document.title = '小主平台|搜索'
            this.query.text = this.$route.query.text
            this.apiSearchGoods()
        },
        methods:{
            apiSearchGoods(){
                this.loading = true
                getSearchGoods(this.query).then(res =>{
                    if (res.code !==200){
                        this.loading = false
                    }
                    this.goodsList = res.data
                    this.total = res.total
                    this.goodsList.forEach(val =>{
                        const text  = "<em style='color:red'>" +this.text+ "</em>"
                        val.goodsTitle = val.goodsTitle.replace(this.text,text)
                        console.log(val.goodsTitle)
                    })
                    this.loading = false
                })
            }
        },

    }
</script>

<style scoped>

</style>
