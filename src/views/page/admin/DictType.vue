<template>
    <div style="height: 100%;">
      <!-- 搜索  -->
      <el-row>
        <el-form :inline="true">
          <el-form-item label="字典名称" prop="username">
            <el-input v-model="query.dictName"
                      placeholder="请输入字典名称"
                      clearable
                      size="small"
                      style="width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item label="字典代号" prop="nickname">
            <el-input v-model="query.dictType"
                      placeholder="请输入字典代号"
                      clearable
                      size="small"
                      style="width: 240px"
            ></el-input>
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
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="apiSearchDictType">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="apiResetSearch">重置</el-button>
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
              @click="apiAddDictType"
          >新增</el-button>
        </el-col>
       <!-- <el-col :span="1.5">
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
        </el-col>-->
        <el-col :span="1.5">
          <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
          >导出</el-button>
        </el-col>
      </el-row>

      <!--表格-->
      <el-table v-loading="loading" :data="dictList" highlight-current-row>
        <el-table-column align="center" label="" type="selection"/>
        <el-table-column align="center" label="编号" type="index"/>
        <el-table-column align="center" label="字典名称" prop="dictName"/>
        <el-table-column align="center" label="字典代号" prop="dictType"/>
        <el-table-column align="center" label="状态" >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status ===1?'primary':'danger'">{{scope.row.statusName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime"/>
        <el-table-column align="center" label="创建用户" prop="nickName"/>
        <el-table-column align="center" label="备注" prop="remark"/>
        <el-table-column label="操作" >
          <template  slot-scope="scope">
            <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="apiEditDictType(scope.row)"
            >修改</el-button>
            <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="apiRemoveDictType(scope.row.id)"
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
      <!--添加修改-->
      <el-dialog @close="apiResetDialog" width="450px" :visible="open" >
        <span slot="title">{{dialogTitle}}</span>
        <el-form ref="dictForm" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="字典名称" prop="dictName">
              <el-input placeholder="请输入字典名称" style="width: 310px" v-model="form.dictName"/>
            </el-form-item>
            <el-form-item label="字典类型" prop="dictType">
              <el-input placeholder="请输入字典类型" style="width: 310px" v-model="form.dictType"/>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio v-model="form.status" label="1">启用</el-radio>
              <el-radio v-model="form.status" label="0">禁用</el-radio>
            </el-form-item>
            <el-form-item  label="备注">
              <el-input  type="textarea"
                         placeholder="请输入备注"
                         :rows="2"
                         style="width: 310px"
                         v-model="form.remark"/>
            </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="apiUpdateDictType" v-if="form.id">修改</el-button>
          <el-button type="primary" @click="apiSubmitDictType" v-else>提交</el-button>
          <el-button type="info" @click="apiClose">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {getDictTypeList,addDictType,updateDictType,removeDictType} from '@/api/admin/DictType'
    export default {
        name: "DictType",
      data(){
        return {
          query:{
            page: 1,
            size: 10,
            total: 0,
            beginTime: '',
            endTime: '',
            dictName: '',
            dictType: '',
            status: ''
          },
          //表格加载
          loading: false,
          //记录时间
          time: [],
          open: false,
          //字典类型表单
          form:{
            dictName: '',
            dictType: '',
            status: '1',
            remark: ''
          },
          //字典列表
          dictList: [],
          //表单校验
          rules:{},
          //对话框标题
          dialogTitle: ''
        }
      },
      created(){
          this.apiGetDictType()
      },
      methods:{
          /**
           *
           * 获取字典类型列表
           * */
          apiGetDictType(){
            this.loading = true
            getDictTypeList(this.query).then(res =>{
              if (res.code !==200){
                this.$message.error(res.msg)
                this.loading = false
                return
              }
              this.dictList = res.data
              this.query.total = res.total
              this.loading = false
            })
          },
        /**
         * 添加字典
         */
        apiAddDictType(){
          this.dialogTitle = '添加字典类型'
          this.open = true;
          },
        /**
         * 关闭点击修改对话框
         */
          apiClose(){
            this.open = false
          },
        /**
         *  提交添加
         */
        apiSubmitDictType(){

          addDictType(this.form).then(res =>{
            if (res.code ==200){
              this.$message.success(res.msg)
              this.open = false
              this.apiGetDictType()
            }else {
              this.$message.error(res.msg)
              this.open = false
            }
          })
        },
        /**
         * 删除字典类型
         */
        apiRemoveDictType(id){

          if (id){
            this.$confirm('永久删除该字典分类，是否继续','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() =>{
              //删除操作
              removeDictType(id).then(res =>{
                if (res.code !==200){
                  this.$message.error(res.msg)
                  return
                }
                this.$message.success(res.msg)
                this.apiGetDictType()
              })
            }).catch(() =>{
              this.$message.info("已取消删除操作！")
            })
          }

        },
        /**
         * 字典类型搜索
         */
        apiSearchDictType(){
          if(this.time.length>0){
            this.query.beginTime = this.time[0]
            this.query.endTime = this.time[1]
          }
          this.apiGetDictType()
        },
        /**
         * 重置搜索
         */
        apiResetSearch(){
          this.query.endTime = ''
          this.query.beginTime = ''
          this.query.dictName = ''
          this.query.dictType = ''
          this.query.status = ''
          this.time =[]
          this.apiGetDictType()
        },
        /**
         * 修改字典类型
         */
        apiEditDictType(data){
          this.dialogTitle = '修改字典类型'
          this.form.dictName = data.dictName
          this.form.dictType = data.dictType
          this.form.remark = data.remark
          this.form.id = data.id
          this.form.status = data.status+''
          this.open = true
        },
        /**
         * 字典类型修改
         */
        apiUpdateDictType(){
          updateDictType(this.form).then(res =>{
            if (res.code ===200){
              this.$message.success(res.msg)
              this.apiGetDictType()
              this.open = false
            }else {
              this.$message.error(res.msg)
            }
          })
        },
        /**
         * 重置对话框内容
         */
        apiResetDialog(){
          this.form.remark = ''
          this.form.dictType = ''
          this.form.dictName = ''
          this.form.status = '1'
        },
        //删除字典类型

      }
    }
</script>

<style scoped lang="less">

</style>
