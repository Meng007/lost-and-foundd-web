<template>
    <div style="height: 100%;">
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
                        <router-link :to="{path: 'goods/info',query:{goodsId:item.id}}"><el-tag :type="item.goodsStatus ===1 ?'danger':'primary'">{{item.goodsStatus ===1 ?'失物...':'招领...'}}</el-tag><span v-html="item.goodsTitle"></span></router-link>
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
                            <el-avatar shape="square" :src="item.avatar"></el-avatar>
                            <div class="name">{{item.nickName}}</div>
                            <el-tooltip effect="light" content="丢失日期" placement="top">
                                <span class="goods-info-item text"><i class="el-icon-date"></i>{{item.loseTime}}</span>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        props:{
            goodsList:{type:Array}
        }

    }
</script>

<style scoped lang="less">

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
        margin: 0 8px;
    }
    .text{
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
</style>
