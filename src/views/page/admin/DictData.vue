<template>
    <div style="height: 100%">
      <!-- 搜索  -->
      <el-row>
        <el-form :inline="true">
          <el-form-item label="字典标签" prop="username">
            <el-input v-model="query.dictLabel"
                      placeholder="请输入字典名称"
                      clearable
                      size="small"
                      style="width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据类型" prop="nickname">
            <el-input v-model="query.dictType"
                      placeholder="请输入字典类型"
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
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="apiSearchDictData" >搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="apiResetSearch" >重置</el-button>
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
              @click="apiAddDictData"
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
      <el-table v-loading="loading" :data="dictDataList" highlight-current-row>
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="编号" type="index"/>
        <el-table-column align="center" label="字典标签" prop="dictLabel"/>
        <el-table-column align="center" label="字典键值" prop="dictValue"/>
        <el-table-column align="center" label="字典类型" prop="dictTypeName"/>
        <el-table-column align="center" label="排序" prop="sort"/>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status ===0?'primary':'danger'">{{scope.row.statusName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" show-overflow-tooltip prop="createTime"/>
        <el-table-column align="center" label="创建人" prop="createUserName"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="apiEditDictData(scope.row)"
            >修改</el-button>
            <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="apiRemoveDictData(scope.row.id)"
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

      <!--字典数据对话框-->
      <el-dialog :visible="open" width="420" @close="closeDialog">
        <span slot="title">{{dialogTitle}}</span>
        <el-form label-position="rigth">
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label-width="90px" label="字典类型">
                <el-select v-model="dictDataForm.dictType" placeholder="请选择">
                  <el-option
                          v-for="item in dictTypeList"
                          :key="item.id"
                          :label="item.dictName"
                          :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="90px" label="字典标签">
                <el-input placeholder="请输入字典标签" v-model="dictDataForm.dictLabel"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="90px" label="字典数据">
                <el-input v-model="dictDataForm.dictValue"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="90px" label="请输入排序">
                <el-input-number v-model="dictDataForm.sort"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="90px" label="请选择状态">
                <el-radio v-model="dictDataForm.status" :label="0">启用</el-radio>
                <el-radio v-model="dictDataForm.status" :label="1">禁用</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button type="primary" v-if="dictDataForm.id" @click="apiSubmitEditDictData" size="mini">修改</el-button>
          <el-button type="primary" @click="apiSubmitDictData" v-else size="mini">提交</el-button>
          <el-button type="info" @click="apiCancel" size="mini">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {getDictDataList,removeDictData,addDictData,updateDictData} from '@/api/admin/DictData'
  import {getDictTypeList} from '@/api/admin/DictType'
    export default {
        name: "DictData",
      data(){
        return {
          query:{
            page: 1,
            size: 10,
            total: 0,
            beginTime: [],
            endTime: '',
            dictLabel: '',
            dictType: '',
            phone: ''
          },
          //加载
          loading: false,
          //记录时间
          time: [],
          //字典数据列表
          dictDataList: [],
          open: false,
          dialogTitle: '',
          // 字典类型表单
          dictDataForm:{
            dictLabel: '',
            dictValue: '',
            status: 0,
            dictType: '',
            sort: ''
          },
          //字典类型
          dictTypeList: []
        }
      },
      created(){
          this.apiGetDictData()
      },
      methods:{

          /****获取字典数据*****/
          apiGetDictData(){
            this.loading = true
            getDictDataList(this.query).then(res =>{
              if (res.code !==200){
                this.$message.error(res.msg)
                this.loading = false
                return
              }
              this.dictDataList = res.data
              this.query.total = res.total
              this.loading = false
            })
          },

           /**
         * 修改字典数据
         * @param data
         */
        apiEditDictData(data){
          this.apiGetDictType()
          this.dialogTitle = '修改字典数据'
             this.dictDataForm.dictLabel = data.dictLabel
             this.dictDataForm.dictValue = data.dictValue
             this.dictDataForm.status = data.status
             this.dictDataForm.sort = data.sort
             this.dictDataForm.id = data.id
             this.dictDataForm.dictType = data.dictType
             this.open = true
          console.log(data)
        },

        /**
         * 删除字典数
         * @param data
         */
        apiRemoveDictData(id){
          if (id){
            this.$confirm('永久删除该字典数据，是否继续','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() =>{
              //删除操作
              removeDictData(id).then(res =>{
                if (res.code !==200){
                  this.$message.error(res.msg)
                  return
                }
                this.$message.success(res.msg)
                this.apiGetDictData()
              })
            }).catch(() =>{
              this.$message.info("已取消删除操作！")
            })
          }
          console.log(id)
        },
        /**
         * 搜索字典数据
         */
        apiSearchDictData(){
          if (this.time.length>0){
            this.query.beginTime = this.time[0]
            this.query.endTime = this.time[1]
          }
          this.apiGetDictData()
        },

        apiResetSearch(){
          this.query.endTime = ''
          this.query.beginTime = ''
          this.query.status = ''
          this.query.dictType = ''
          this.query.dictLabel = ''
          this.time =[]
          this.apiGetDictData()
        },
        // 添加字典类型
        apiAddDictData(){
          this.apiGetDictType()
          this.dialogTitle = '添加字典数据'
          this.open = true
        },
        //提交数据
        apiSubmitDictData(){
          addDictData(this.dictDataForm).then(res =>{
            if (res.code !==200){
              this.$message.error(res.msg)
              return
            }
            this.$message.success(res.msg)
            this.apiGetDictData()
            this.open = false
          })
        },
        //修改提交
        apiSubmitEditDictData(){
          updateDictData(this.dictDataForm).then(res =>{
            if (res.code !==200){
              this.$message.error(res.msg)
              return
            }
            this.$message.success(res.msg)
            this.apiGetDictData()
            this.open = false
          })
        },
        //取消
        apiCancel(){
          this.open = false
        },
        //关闭对话框初始化 dictDataForm
        closeDialog(){
          this.dictDataForm.dictLabel = ''
          this.dictDataForm.dictValue = ''
          this.dictDataForm.status = 0
          this.dictDataForm.sort = 1
          this.dictDataForm.id = ''
          this.dictDataForm.dictType = ''
          this.open = false
        },
        //获取字典类型
        apiGetDictType(){
          getDictTypeList().then(res =>{
            if (res.code !==200){
              this.$message.error(res.msg)
              return
            }
            this.dictTypeList = res.data
            this.dictTypeList.unshift({id:'',dictName: '请选择'})
          })
        }
      }
    }
</script>

<style scoped>

</style>
