<template>
<div style="height: 100%">
  <!-- 搜索  -->
  <el-row>
    <el-form :inline="true">
      <el-form-item label="角色名称" prop="username">
        <el-input v-model="query.goodsName"
                  placeholder="请输入角色名称"
                  clearable
                  size="small"
                  style="width: 240px"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限字符" prop="nickname">
        <el-input v-model="query.goodsType"
                  placeholder="请输入权限字符"
                  clearable
                  size="small"
                  style="width: 240px"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
            v-model="query.status"
            placeholder="角色状态"
            clearable
            size="small"
            style="width: 120px"
        >
          <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
          />
        </el-select>
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
          @click="apiOpenAdd"
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

<!-- 表格-->
  <el-table v-loading="loading" :data="roleList" >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column label="编号" type="index" width="120" />
    <el-table-column align="center" label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
    <el-table-column align="center" label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" />
    <el-table-column align="center" label="显示顺序" prop="sort" width="100" />
    <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status ===0 ? 'primary':'danger'">{{scope.row.statusName}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="apiEditRole(scope.row)"
        >修改</el-button>
        <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-check"
        >数据权限</el-button>
        <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
        >删除</el-button>
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

  <!--对话框-->
  <el-dialog @close="apiResetDialog" :visible="open" width="40%">
    <span slot="title">{{dialogTitle}}</span>
    <el-form :model="form" label-width="120px">
      <el-form-item label="角色名称">
        <el-input placeholder="请输入角色名称" v-model="form.roleName"/>
      </el-form-item>
      <el-form-item label="角色key">
        <el-input placeholder="请输入角色key" v-model="form.roleKey" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-radio v-model="form.status" label="0">启用</el-radio>
            <el-radio v-model="form.status" label="1">禁用</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序">
            <el-input-number style="width: 120px" v-model="form.sort" controls-position="right"  :min="1" :max="10"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button type="primary" v-if="form.id" @click="apiSubmitRole">修改</el-button>
      <el-button type="primary" v-else @click="apiSubmitRole">提交</el-button>
      <el-button type="info" @click="apiCancel">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import {getRoleList,saveRole} from '@/api/admin/Role'
    export default {
        name: "Role",
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
          //开关
          open: false,
          //加载
          loading: false,
          //角色列表
          roleList: [],
          //对话框标题
          dialogTitle: '',
          //表单数据
          form:{
            roleName: '',
            roleKey: '',
            sort: '1',
            status: '0'
          }
        }
      },
      created(){
          this.apiGetRoleList()
      },
      methods:{
        /**
         * 获取角色列表
         */
        apiGetRoleList(){
            this.loading = true
            getRoleList(this.query).then(res =>{
              if (res.code !=200){
                this.$message.error(res.msg)
                this.loading = false
                return
              }
              this.roleList = res.data
              this.query.total = res.total
              this.loading = false
            })
          },
        /**
         * 添加角色
         */
        apiOpenAdd(){
          this.dialogTitle = '添加角色'
          this.open = true
        },
        /**
         * 提交角色
         */
        apiSubmitRole(){
          saveRole(this.form).then(res =>{
            if (res.code ===200){
              this.$message.success(res.msg)
              this.apiGetRoleList()
              this.open = false
              return
            }
            this.$message.error(res.msg)
            this.open = false
          })
        },
        /**
         * 取消
         */
        apiCancel(){
          this.open =false
        },
        /**
         * 修改
         */
        apiEditRole(data){
          this.dialogTitle = '修改角色'
          this.form.id = data.id
          this.form.roleName = data.roleName
          this.form.roleKey = data.roleKey
          this.form.sort = data.sort
          this.form.status = data.status+''
          this.open = true
        },
        /**
         * 对话框关闭重置form
         */
        apiResetDialog(){
          this.form.id = ''
          this.form.roleName = ''
          this.form.roleKey = ''
          this.form.sort = 1
          this.form.status = '0'
        }
      }
    }
</script>

<style scoped>

</style>
