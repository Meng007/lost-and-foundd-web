<template>
    <div style="height: 100%">
           <!-- 搜索  -->
          <el-row>
            <el-form :inline="true">
              <el-form-item label="用户名称" prop="username">
                <el-input v-model="query.username"
                          placeholder="请输入用户名称"
                          clearable
                          size="small"
                          style="width: 240px"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" prop="nickname">
                <el-input v-model="query.nickName"
                          placeholder="请输入用户昵称"
                          clearable
                          size="small"
                          style="width: 240px"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input
                    v-model="query.phone"
                    placeholder="请输入手机号码"
                    clearable
                    size="small"
                    style="width: 240px"
                />
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker
                    v-model="time"
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
                <el-button type="primary" icon="el-icon-search" size="mini" @click.native="search">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
          </el-row>

          <!-- 操作菜单crud -->
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
              >新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                  type="success"
                  icon="el-icon-edit"
                  size="mini"
              >修改</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
              >删除</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                  type="info"
                  icon="el-icon-upload2"
                  size="mini"
              >导入</el-button>
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
        <el-table  v-loading="loading" :data="userList">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="编号"  type="index" align="center"></el-table-column>
            <el-table-column label="用户名称" prop="username" align="center"></el-table-column>
            <el-table-column label="用户昵称" prop="nickName" align="center"></el-table-column>
            <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
            <el-table-column label="用户类型" prop="userType" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.userType ===1 ? 'primary' : 'info'">{{scope.row.typeName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="用户头像" align="center">
                <template slot-scope="scope">
                    <el-avatar :src="scope.row.avatar"/>
                </template>
            </el-table-column>
            <el-table-column label="用户状态" prop="status" align="center">
                <template slot-scope="scope">
                    <el-tooltip :content="scope.row.statusName" placement="top">
                        <el-switch
                                v-model="scope.row.statusName"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-value="启用"
                                inactive-value="禁用"
                        >
                        </el-switch>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" align="center" width="160"></el-table-column>
            <el-table-column label="操作"
                             align="center"
                             class-name="small-padding fixed-width"
                             width="160">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                >修改</el-button>
                <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="apiRemoveUser(scope.row.id)"
                >删除</el-button>
                <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-key"
                >重置</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
                :page-sizes="[10, 20, 30, 40]"
                :page-size="query.page"
                layout="total, sizes, prev, pager, next, jumper"
                :total="query.total">
        </el-pagination>
        <!--修改用户框-->
        <el-dialog width="600px" :visible="true" append-to-body>
            <span slot="title">修改[user]用户</span>
           <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户昵称">
                            <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机" prop="phone">
                            <el-input placeholder="请输入手机号码" maxlength="11" v-model="form.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户名称" prop="userName">
                            <el-input v-model="form.username" placeholder="请输入用户名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="用户密码" prop="password">
                            <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
                        </el-form-item>
                    </el-col>
                </el-row>
           </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {getUserList,removeUser} from '@/api/admin/User'
    export default {
        name: "User",
        data(){
            return{
                //value: '启用',
                //加载
                loading: false,
                //搜索
                query:{
                    page: 1,
                    size: 10,
                    total: 0,

                    beginTime: '',
                    endTime: '',
                    username: '',
                    nickName: '',
                    phone: '',
                    userType: ''
                },
                //时间
                time: [],
                //用户列表
                userList:[],
                form:{
                    username: '',
                    nikeName: '',
                    phone: '',
                    password: '',
                    email: '',
                    status: '',
                },
                rules:{}
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
                this.loading = true
                getUserList(this.query).then(res =>{
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
            /**
             * 删除用户
             */
            apiRemoveUser(id){
                removeUser(id).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        return
                    }
                    this.$message.success(res.msg)
                })
            },
            /**
             * 搜索
             */
            search(){
                console.log("-----233-----")
                console.log(this.time)

                if (this.time.length>0){
                    console.log("--------")
                    this.query.beginTime = this.time[0]
                    this.query.endTime = this.time[1]
                }
                console.log(this.query)
                this.apiGetUserList()
            },
            /**
             * 重置搜索
             */
            reset(){
               this.query.beginTime = '',
               this.query.endTime = ''
               this.query.username = ''
               this.query.nickName = ''
               this.query.phone =''
               this.query.userType = ''
               this.time = []
                this.apiGetUserList()
            }
        }
    }
</script>

<style scoped>

</style>
