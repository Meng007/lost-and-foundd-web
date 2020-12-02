<template>
    <div style="height: 100%">
        用户管理

        <!--表格-->
        <el-table :data="userList">
            <el-table-column label="编号" prop=""></el-table-column>
            <el-table-column label="用户名称" prop="username"></el-table-column>
            <el-table-column label="用户昵称" prop="nickName"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="用户类型" prop="userType"></el-table-column>
            <el-table-column label="用户头像" prop="avatar"></el-table-column>
            <el-table-column label="用户状态" prop="status"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <!--<el-table-column label="" prop=""></el-table-column>
            <el-table-column label="" prop=""></el-table-column>-->
        </el-table>
    </div>
</template>

<script>
    import {getUserList} from '@/api/admin/User'
    export default {
        name: "User",
        data(){
            return{
                query:{
                    page: 1,
                    size: 10,
                    beginTime: '',
                    endTime: '',
                    username: '',
                    phone: '',
                    userType: ''
                },
                userList:[]
            }
        },
        created(){
            this.apiGetUserList();
        },
        methods:{
            /**
             * 获取用户列表
             */
            apiGetUserList(){
                getUserList(this.query).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        return
                    }
                    this.userList = res.data
                })
            }
        }
    }
</script>

<style scoped>

</style>
