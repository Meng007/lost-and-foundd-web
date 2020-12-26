<template>
    <div style="height: 100%;">
        <el-container style="height: 100%">
            <!--侧边菜单-->
            <el-aside  style="height: 100%;" width="200px">
                <el-menu
                        style="height: 100%;overflow: hidden"
                        mode="vertical"
                        background-color="#304156"
                        text-color="#bfbfd0"
                        active-text-color="#2634b7"
                        default-active="/"
                        router
                >
                   <el-menu-item>
                       <h1 class="title">
                           <i class="el-icon-s-home"></i>
                           <a href="#">{{title}}</a>
                       </h1>
                   </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">认证中心</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item :index="url.auth">令牌管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">后台管理</span>
                        </template>
                        <el-menu-item :index="url.user">用户管理</el-menu-item>
                        <el-menu-item :index="url.role">角色管理</el-menu-item>
                        <el-menu-item :index="url.menu">菜单管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">物品管理</span>
                        </template>
                        <el-menu-item :index="url.goods">物品列表</el-menu-item>
                        <el-menu-item :index="url.goodsMessage">物品留言</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">字典管理</span>
                        </template>
                        <el-menu-item :index="url.dictType">字典分类</el-menu-item>
                        <el-menu-item :index="url.dictData">字典数据</el-menu-item>
                        <el-menu-item :index="url.cate">系统分类</el-menu-item>
                        <el-menu-item :index="url.sensitiveWord">铭感词管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">消息中心</span>
                        </template>
                        <el-menu-item :index="url.message">消息列表</el-menu-item>
                        <el-menu-item>系统公告</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
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
                               <router-link tag="a" :to="url.personal">
                                   <el-dropdown-item >个人信息</el-dropdown-item>
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
    import { mapState } from 'vuex'
    export default {
        name: "Admin",
        data(){
            return{
                title: '小主后台管理',
                url:{
                    auth: '/admin/auth',
                    user: '/admin/user',
                    role: '/admin/role',
                    menu: '/admin/menu',
                    perm: '/admin/perm',
                    dictData: '/admin/dict-data',
                    dictType: '/admin/dict-type',
                    message: '/admin/message',
                    sensitiveWord: '/admin/sensitive-word',
                    goods: '/admin/goods',
                    goodsMessage: '/admin/goods-message',
                    cate: '/admin/cate',
                    personal: '/admin/personal'
                }
            }
        },
        created(){
            document.title = '小主平台|管理中心'
        },
        computed:{
            ...mapState({
                onLine: state => state.user.onLink,
                userType: state => state.user.userType,
                avatar: state => state.user.avatar
            })
        },
        methods:{
            /**
             * 推出登录
             */
            logout(){
                this.$store
                    .dispatch("LogOut", this.loginForm).then(res =>{
                    this.$message.success(res.msg)
                    this.$router.push('/')
                })
            },
        }
    }
</script>

<style scoped lang="less">
.title{
    margin: 0;
    line-height: 60px;
    a{
        color: #bfbfd0;
        display: inline-block;
        text-decoration: none;
    }
}
    .my-avatar{
        float: right;
        top: 6px;
        right: 5px;
        cursor: pointer;
    }
    a{
        text-decoration: none;
    }
</style>
