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
            style="width: 240px"
        >
          <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
          />
        </el-select>
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

<!-- 表格-->
  <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column label="角色编号" prop="roleId" width="120" />
    <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
    <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" />
    <el-table-column label="显示顺序" prop="roleSort" width="100" />
    <el-table-column label="状态" align="center" width="100">

    </el-table-column>
    <el-table-column label="创建时间" align="center" prop="createTime" width="180">
    </el-table-column>
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
        >修改{{scope.row.id}}</el-button>
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
        }
      }
    }
</script>

<style scoped>

</style>
