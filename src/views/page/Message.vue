<template>
    <div>
        <el-row>
            <el-col :span="16" v-loading="loading">
                <div v-if="commentList.length ===0" style="position: relative;height: 350px">
                    <img style="display: inline-block;position: absolute; top: 100px;left: 50%;transform: translate(-50%,0)"
                         :src="require('@/assets/image/no_data.png')" alt="">
                    <span style="display: inline-block;position: absolute;left: 50%;top: 164px;transform: translate(-50% ,0);color: #909399;font-size: 14px">暂无数据</span>
                </div>
                <ul v-else>
                    <li v-for="(item,index) in commentList" :key="item.id + index">
                        <div class="item">
                            <div class="person" style="margin-bottom:12px;padding: 0 16px;min-height:50px;">
                                <el-avatar style="float: left;margin-right: 10px" :src="item.avatar"></el-avatar>
                                <div class="user-info">
                                    <div class="nickname" style="margin-bottom: 5px;vertical-align:middle">
                                        {{item.nickName}}
                                    </div>
                                    <div class="date" style="font-size: 13px">
                                        <span style="color: #909399">{{item.createTime}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="content">
                                {{item.content}}
                            </div>
                            <div class="img">
                                <el-image
                                        :lazy="true" fit="cover"
                                        v-for="(img,index) in item.images"
                                        :key="img.imagePath + index"
                                        :src="img.imagePath"
                                        :preview-src-list="item.preview"
                                ></el-image>
                            </div>
                            <div class="tag">
                                <el-tag v-for="(item,index) in item.tags" :key="item.tagName + index">{{item.tagName}}
                                </el-tag>
                            </div>
                            <div class="info">
                                <span class="my-icon-span"><i class="my-icon-i el-icon-view"></i>{{item.views}}</span>
                                <span class="my-icon-span"><i class="my-icon-i el-icon-chat-line-round"></i>{{item.messageNum}}</span>
                                <span class="my-icon-span"><i class="my-icon-i my-icon el-icon-thumb"></i>{{item.agreeNum}}</span>
                            </div>
                            <el-form :model="comment">
                                <el-form-item prop="content">
                                    <el-input :maxlength="250"
                                              v-model="comment.content"
                                              type="textarea"
                                              :rows="2"
                                              suffix-icon="el-icon-edit-outline"
                                    />
                                </el-form-item>
                                <el-form-item>
                                    <el-button style="float: right" type="primary">发表</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </li>
                </ul>
            </el-col>
            <el-col :span="8">
                热门话题
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {/*addComment,*/getCommentList} from '@/api/admin/Comment'

    export default {
        name: "Message",
        data() {
            return {
                query: {
                    page: 1,
                    size: 10,
                    total: 0
                },
                comment:{
                  content: '',
                  commentId: '',
                  messageId: ''
                },
                loading: false,
                commentList: []
            }
        },
        created() {
            document.title = '小主平台|留言墙'
            this.apiGetCommentList()
        },
        methods: {
            //获取留言列表
            apiGetCommentList() {
                this.loading = true
                getCommentList(this.query).then(res => {
                    this.commentList = res.data
                    this.query.total = res.total
                    this.loading = false
                })
            },
            //
        }
    }
</script>

<style scoped lang="less">
    ul {
        list-style-type: none;
    }

    .item {
        margin: 10px;
    }

    .img .el-image {
        width: 150px;
        height: 100px;
        /*transition: all 0.6s;*/
    }

    my-icon-i{
        font-size: 24px;
        cursor: pointer;
    }
    .my-icon-i:hover{
        color: #409EFF;
    }
    .my-icon-span {
        float: right;
        margin-left: 55px;

    }
    .info{
        margin-bottom: 10px;
    }
    .info:after{
        content: "";
        display: block;
        clear: both;
    }
    .content{
        margin-bottom: 8px;
    }
</style>
