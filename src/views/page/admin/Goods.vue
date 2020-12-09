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

      <!--表格-->
      <el-table :data="goodsList">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="编号" type="index" align="center"></el-table-column>
        <el-table-column label="物品名称" prop="goodsName" align="center"></el-table-column>
        <el-table-column label="物品标题" prop="goodsTitle" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
        <el-table-column label="物品类型" prop="goodsType" align="center"></el-table-column>
        <el-table-column label="物品封面" prop="coverImage" align="center"></el-table-column>
        <el-table-column label="物品状态" prop="status" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="失物时间" prop="createTime" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作"
                         align="center"
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
                @click="apiRemoveGoods(scope.row.id)"
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
  import {getGoodsList} from '@/api/admin/Goods'
    export default {
        name: "Goods",
      data(){
          return{
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
            goodsList:[]
          }
      },
      created(){
          this.apiGetGoods()
      },
      methods:{
        /**
         * 获取物品
         */
        apiGetGoods(){
            getGoodsList().then(res =>{
              if (res.code !==200){
                this.$message.error(res.msg)
                return
              }
              this.goodsList = res.data
              this.query.total = res.total
            })
          },
        /**
         * 删除物品
         */
        apiRemoveGoods(id){
            console.log(id)
        }
      }
    }
</script>

<style scoped>

</style>
