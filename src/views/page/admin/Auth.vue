<template>
    <div style="height: 100%">
      <!-- 搜索  -->
      <el-row>
        <el-form :inline="true">
          <el-form-item label="用户账号" prop="username">
            <el-input v-model="query.goodsName"
                      placeholder="请输入用户账号"
                      clearable
                      size="small"
                      style="width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录时间">
            <el-date-picker
                v-model="query.beginTime"
                size="small"
                style="width: 240px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" >搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" >重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <!-- 操作菜单crud -->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
          >导出</el-button>
        </el-col>
      </el-row>

      <!--表格-->
      <el-table v-loading="loading" :data="userList" >
        <el-table-column align="center" type="index" label="编号"></el-table-column>
        <el-table-column align="center" label="用户账号" prop="username"></el-table-column>
        <el-table-column align="center" label="用户昵称" prop="user.nickName"></el-table-column>
        <el-table-column align="center" label="操作系统" prop="os"></el-table-column>
        <el-table-column align="center" label="浏览器" prop="browser"></el-table-column>
        <el-table-column align="center" label="ip" prop="ipaddr"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="用户token" prop="token"></el-table-column>
        <el-table-column align="center" label="登录时间"  :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{parseTime(scope.row.loginTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="apiLogout(scope.row.token)">强退</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import {getLoginUser} from '@/api/admin/Auth'
    export default {
        name: "Auth",
      data(){
        return {
          query:{
            page: 1,
            size: 10,
            total: 0,
            beginTime: [],
            endTime: '',
            goodsName: '',
            goodsType: '',
            phone: ''
          },
          //加载
          loading: false,
          //用户列表
          userList: []
        }
      },
      created(){
        this.apiGetLoginList()
      },
      methods:{
        /**
         * 获取登录用户
         */
        apiGetLoginList(){
          this.loading = true
          getLoginUser(this.query).then(res =>{
            if (res.code !==200){
              this.$message.error(res.msg)
              this.loading = false
              return
            }
            this.userList = res.data
            this.query.total = res.total
            this.loading = false
          })
        },
        apiLogout(token){
          console.log(token)
        }
      }
    }
</script>

<style scoped>

</style>
