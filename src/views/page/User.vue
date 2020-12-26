<template>
    <div style="height: 100%">
        <el-container style="height: 100%">
            <!--侧边菜单-->
            <el-aside style="height: 100%;background: #304156" width="200px">
                <el-menu
                        style="height: 100%;overflow: hidden"
                        mode="vertical"
                        background-color="#304156"
                        text-color="#bfbfd0"
                        active-text-color="#2634b7"
                        router
                >
                    <el-menu-item>
                        <h1 class="title">
                            <i class="el-icon-user-solid"></i>
                            <a href="#">{{title}}</a>
                        </h1>
                    </el-menu-item>
                    <el-menu-item :index="url.personal">
                        <i class="el-icon-location"></i>
                        <span>个人信息</span>
                    </el-menu-item>
                    <el-menu-item :index="url.myMessage">
                        <i class="el-icon-location"></i>
                        <span>信息中心</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">物品管理</span>
                        </template>
                        <el-menu-item :index="url.myGoods">物品列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">我的留言</span>
                        </template>
                        <el-menu-item :index="url.leavingMessage">留言列表</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container style="height: 100%">
                <!--头部-->
                <el-header>
                    <el-dropdown class="my-avatar">
                     <span class="el-dropdown-link">
                        <el-avatar :src="avatar"></el-avatar>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/">
                                <el-dropdown-item>返回首页</el-dropdown-item>
                            </router-link>
                            <el-dropdown-item><span class="text" @click="logout">退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "User",
        data() {
            return {
                title: '小主个人中心',
                navTitle: '',
                url: {
                    myGoods: '/my-goods',
                    myMessage: '/my-message',
                    personal: '/personal',
                    leavingMessage: '/leaving-message'
                }
            }
        },
        created() {
            document.title = '小主平台|个人中心'
        },
        computed: {
            ...mapState({
                onLine: state => state.user.onLink,
                userType: state => state.user.userType,
                avatar: state => state.user.avatar
            })
        },
        methods: {
            /**
             * 推出登录
             */
            logout() {
                this.$store
                    .dispatch("LogOut").then(res => {
                    console.log(res)
                    this.$message.success(res.msg)
                    this.$router.push('/')
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .title {
        /*float: left;*/
        line-height: 60px;
        a {
            display: inline-block;
            color: #bfbfd0;
            text-decoration: none;
        }
    }

    .my-avatar {
        float: right;
        right: 5px;
        top: 5px;
    }

    a {
        text-decoration: none;
    }
</style>
