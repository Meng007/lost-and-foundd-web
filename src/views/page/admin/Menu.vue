<template>
<div style="height: 100%;">
  <!-- 搜索  -->
  <el-row>
    <el-form :inline="true">
      <el-form-item label="菜单名称" prop="username">
        <el-input v-model="query.goodsName"
                  placeholder="请输入菜单名称"
                  clearable
                  size="small"
                  style="width: 240px"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
            v-model="query.status"
            placeholder="菜单状态"
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

  <!-- 表格 -->
  <el-table
      v-loading="loading"
      :data="menuList"
      row-key="menuId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
    <el-table-column prop="icon" label="图标" align="center" width="100">
      <template slot-scope="scope">
        <svg-icon :icon-class="scope.row.icon" />
      </template>
    </el-table-column>
    <el-table-column prop="orderNum" label="排序" width="60"></el-table-column>
    <el-table-column prop="perms" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="status" label="状态" :formatter="statusFormat" width="80"></el-table-column>
    <el-table-column label="创建时间" align="center" prop="createTime">
      <template slot-scope="scope">
        <span>{{ parseTime(scope.row.createTime) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button size="mini"
                   type="text"
                   icon="el-icon-edit"
                   @click="handleUpdate(scope.row)"
                   v-hasPermi="['system:menu:edit']"
        >修改</el-button>
        <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:menu:add']"
        >新增</el-button>
        <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:menu:remove']"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
    export default {
        name: "Menu",
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
