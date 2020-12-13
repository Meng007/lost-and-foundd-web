<template>
    <div style="height: 100%;">
        <el-row :gutter="4">
            <el-col :span="18">
               <!--分类-->
                <el-card>
                    <el-tag class="goods-type" v-for="i in goodsTypeList" @click="checkType(i)" :key="i.id" style="margin: 2px 2px;cursor: pointer" :type="i.click?'primary':'info'">{{i.label}}</el-tag>
                </el-card>
                <ul classs="goods-list">
                    <li v-for="(item,index) in goodsList" :key="item.id+index" class="item">
                       <div class="cover">
                           <el-image lazy fit="cover" alt="傻逼" :src="item.coverImage">
                               <div slot="error" class="image-slot">
                                   <i class="el-icon-picture-outline"></i>
                               </div>
                           </el-image>
                       </div>
                        <div class="title-body">
                            <div class="body-left">
                                <router-link :to="{path: 'goods/info',query:{goodsId:item.id}}"><el-tag type="danger">{{item.goodsType ===1 ?'失物...':'招领...'}}</el-tag>{{item.goodsTitle}}</router-link>
                                <div>
                                    <i class="el-icon-location-outline"></i> {{item.address}}
                                </div>
                                <div class="info">
                                    <div class="goods-info">
                                        <el-tooltip effect="light" content="发布日期" placement="top">
                                            <span class="goods-info-item text"><i class="el-icon-date"></i>{{item.createTime}}</span>
                                        </el-tooltip>
                                        <el-tooltip effect="light" content="浏览量" placement="top">
                                            <span class="goods-info-item text"><i class="el-icon-view"></i>{{item.views}}</span>
                                        </el-tooltip>
                                        <el-tooltip effect="light" content="留言量" placement="top">
                                            <span class="goods-info-item text"><i class="el-icon-chat-line-round"></i>{{item.messageNum}}</span>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </div>
                            <div class="person">
                               <div class="person-">
                                   <el-avatar shape="square" src="http://localhost:8080/static/img/profile.9e7a51a3.jpg"></el-avatar>
                                   <div class="name">{{item.nickName}}</div>
                                   <el-tooltip effect="light" content="丢失日期" placement="top">
                                       <span class="goods-info-item text"><i class="el-icon-date"></i>{{item.loseTime}}</span>
                                   </el-tooltip>
                               </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </el-col>
            <el-col :span="6">
                <el-card>
                    好人
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getLostGoods} from '@/api/admin/Goods'
    export default {
        name: "Lost",
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
              goodsList:[]
          }
        },
        created(){
            document.title = '小主平台|失物页'
            this.apiGetLostGoods()
        },
        methods:{
            checkType(i){
                this.goodsTypeList.forEach(val =>{
                    val.click = false
                })
                i.click = true
            },
            apiGetLostGoods(){
                getLostGoods(this.query).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        return
                    }
                    this.goodsList = res.data
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .goods-type:hover{
        color: #409EFF;
    }
    ul{
        list-style: none;
    }
   .item{
      /* display: flex;
       justify-content: flex-start;*/
       height: 151px;
       margin: 2px 0;
       padding: 5px 5px;
       border-bottom: #42b983 1px solid;
   }
   .item:last-child{
       border-bottom: 0px
   }
   .title-body{
       display: flex;
       justify-content: space-between;
       position: relative;
       margin-left: 201px;
       padding-left: 5px;
       height: 100%;
   }
    .cover{
        float: left;
        left: 0px;
        width: 200px;
        height: 150px;
        overflow: hidden;
        .el-image{
            transition: all 0.6s;
        }
        .el-image:hover{
            transform: scale(1.5,1.5);
        }
    }
    .person{
        position: relative;
        cursor: pointer;
        width: 110px;
        .person-{
            position: absolute;
            top: 50%;
            transform: translate(0,-50%);
        }
        .el-avatar{
            position: absolute;
            left: 50%;
            transform: translate(-50%,0);
        }
        .name{
            margin-top: 40px;
            text-align: center;
        }
    }
    .info{
       position: absolute;
        bottom: -1px;
        display: flex;
        justify-content: space-between;
    }
    .goods-info{

    }
    .goods-info-item{
        display: inline-block;
        margin: 0 2px;
    }
    .text{
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
</style>
