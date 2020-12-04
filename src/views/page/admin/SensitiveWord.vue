<template>
    <div style="height: 100%;">
      <!-- 搜索  -->
      <el-row>
        <el-form :inline="true">
          <el-form-item label="物品名称" prop="username">
            <el-input v-model="query.goodsName"
                      placeholder="请输入物品名称"
                      clearable
                      size="small"
                      style="width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item label="物品标题" prop="nickname">
            <el-input v-model="query.goodsType"
                      placeholder="请输入物品标题"
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
          <el-form-item label="丢失时间">
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
    </div>
</template>

<script>
    export default {
        name: "SensitiveWord",
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
