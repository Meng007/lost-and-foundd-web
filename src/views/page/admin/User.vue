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
                <el-input v-model="query.nickname"
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
                <el-button type="primary" icon="el-icon-search" size="mini" >搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" >重置</el-button>
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
        <el-table :data="userList">
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
    </div>
</template>

<script>
    import {getUserList,removeUser} from '@/api/admin/User'
    export default {
        name: "User",
        data(){
            return{
                //value: '启用',
                query:{
                    page: 1,
                    size: 10,
                    total: 0,
                    beginTime: [],
                    endTime: '',
                    username: '',
                    nickname: '',
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
                    this.query.total = res.total
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
            }
        }
    }
</script>

<style scoped>

</style>
