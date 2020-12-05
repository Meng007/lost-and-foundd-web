<template>
    <div>
        <el-container>
            <el-header height="80px">
                <el-row type="flex" justify="center">
                    <el-col :span="20">
                        <div style="vertical-align: middle;height: 100%">
                            <h1 class="title threed">
                                <a href="/">
                                    <el-image  class="nav-logo" :src="require('@/assets/image/lost.svg')"></el-image> <span>{{title}}</span>
                                </a>
                            </h1>
                            <el-menu
                                    router
                                    mode="horizontal"
                                    text-color="#a0cefd"
                                    active-text-color="#1989fa"
                                    style="border-right: 0;float: right;background: transparent" class="menu">
                                <el-menu-item class="item-menu" style="float: left;vertical-align: middle">
                                    <el-input
                                            placeholder="请输入内容"
                                            prefix-icon="el-icon-search"
                                            style="width: 208px;"
                                            size="medium"
                                            v-model="query"></el-input>
                                    <el-button size="small"><span style="color: #a0cefd">搜索</span></el-button>
                                </el-menu-item>
                                <el-menu-item :index="url.lost" class="item-menu" style="float: left">
                                    <span>寻物</span>
                                </el-menu-item>
                                <el-menu-item :index="url.take" class="item-menu" style="float: left">
                                    <span>招领</span>
                                </el-menu-item>
                                <el-menu-item :index="url.message" class="item-menu" style="float: left">
                                    <span>留言墙</span>
                                </el-menu-item>
                                <el-menu-item class="item-menu" style="float: left">
                                    <span>|</span>
                                </el-menu-item>
                                <el-menu-item class="item-menu" style="float: left">
                                    <el-dropdown style="color:#a0cefd;"  placement="bottom" >
                                        <span>发布<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown" style="padding: 0;text-align: center">
                                            <router-link style="text-decoration: none" :to="url.saveGoods">
                                                <el-dropdown-item icon="el-icon-s-goods">启事</el-dropdown-item>
                                            </router-link>
                                            <router-link style="text-decoration: none" :to="url.saveMessage">
                                                <el-dropdown-item icon="el-icon-s-comment">留言</el-dropdown-item>
                                            </router-link>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-menu-item>
                                <el-menu-item class="item-menu" style="float: left">
                                    <router-link style="text-decoration: none" v-if="!onLine" :to="url.login">
                                        <span >登录</span>
                                    </router-link>
                                    <el-dropdown v-else size="small" placement="bottom">
                                        <el-avatar :size="48" :src="avatar"></el-avatar>
                                        <el-dropdown-menu style="text-decoration: none;text-align: center;padding: 0" slot="dropdown">
                                            <router-link style="text-decoration: none" v-if="userType === 1" :to="url.admin">
                                                <el-dropdown-item icon="el-icon-user-solid">管理中心</el-dropdown-item>
                                            </router-link>
                                            <router-link style="text-decoration: none"  v-if="userType === 2" :to="url.user">
                                                <el-dropdown-item icon="el-icon-user-solid"><span class="text">个人中心</span></el-dropdown-item>
                                            </router-link>
                                            <el-dropdown-item icon="el-icon-s-home" ><span class="text" @click="logout">退出登录</span></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-menu-item>
                            </el-menu>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <!--内容-->
            <el-main >
                <el-row type="flex" justify="center">
                    <el-col :span="20">
                        <router-view/>
                    </el-col>
                </el-row>
            </el-main>
            <!--底部-->
            <el-footer class="my-footer">
                <el-row type="flex" justify="center">
                    <el-col :span="20">
                        底部
                    </el-col>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "Index",
        data(){
            return{
                url:{
                  lost: '/lost',
                  take: '/take',
                  message: '/message',
                    login: '/login',
                    admin: '/admin',
                    user: '/user',
                    saveGoods: '/save-goods',
                    saveMessage: '/save-message'
                },
                title: '小主平台',
                query: ''
            }

        },
        computed:{
            ...mapState({
                onLine: state => state.user.onLink,
                userType: state => state.user.userType,
                avatar: state => state.user.avatar
            })
        },
        methods:{
            logout(){
                this.$store
                    .dispatch("LogOut", this.loginForm).then(res =>{
                        this.$message.success(res.msg)
                })
            }
        }
    }
</script>

<style scoped lang="less">
    ul{
        display: block;
        list-style-type: disc;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }
    li{
        list-style: none;
    }
.title{
    float: left;
    height: 100%;
    font-size: 25px;
    font-weight: 400;
    margin: auto 0;
    a{
        display: block;
        height: 100%;
        text-decoration: none;
        vertical-align: middle;
    }
    .nav-logo{
        vertical-align: sub;
        img{
            margin-bottom: -11px;
        }
    }
}
    .my-footer{
        width: 100%;
        position: fixed;
        bottom: 0;
    }
</style>
