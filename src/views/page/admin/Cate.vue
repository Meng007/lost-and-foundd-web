<template>
    <div style="width: 100%;">
        <!-- 操作菜单crud -->
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="apiAddCate"
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
        <!-- 表格 -->
        <el-table
                v-loading="loading"
                :data="cateList"
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <el-table-column prop="cateName" label="分类名称" :show-overflow-tooltip="true" width="160"></el-table-column>
            <el-table-column prop="id" label="代号" width="60">
            </el-table-column>
            <el-table-column prop="sort" label="排序" width="60"></el-table-column>
            <el-table-column prop="status" label="状态"  width="80"></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
            <el-table-column label="创建人" align="center" prop="nickName"></el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="text"
                               icon="el-icon-edit"
                               @click="apiEditCate(scope.row)"
                    >修改</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-plus"
                            @click="apiAddCate2(scope.row)"
                    >新增</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="apiRemoveCate(scope.row.id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible="open" width="450px" @close="apiClose">
            <span slot="title">{{dialogTitle}}</span>
            <el-form ref="cateForm" :model="cateForm" label-position="right">
               <el-form-item label="父级分类" label-width="90px">
                   <el-select :disabled="pidFlag" v-model="cateForm.pid" placeholder="请选择">
                       <el-option
                               v-for="item in pCateList"
                               :key="item.id"
                               :label="item.cateName"
                               :value="item.id">
                       </el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="分类名称" label-width="90px">
                   <el-input placeholder="请输入分类名称" v-model="cateForm.cateName"/>
               </el-form-item>
               <el-form-item label="排序" label-width="90px">
                   <el-input-number v-model="cateForm.sort"/>
               </el-form-item>
               <el-form-item label="状态" label-width="90px">
                   <el-radio-group v-model="cateForm.status">
                           <el-radio  v-for="item in dictDataList" :label="item.dictValue" :key="item.id">{{item.dictLabel}}</el-radio>
                   </el-radio-group>
               </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button type="primary" v-if="cateForm.id" size="mini">修改</el-button>
                <el-button type="primary" v-else size="mini" @click="apiSubmitCate">提交</el-button>
                <el-button type="info" @click="apiCancel" size="mini">取消</el-button>
            </div>
        </el-dialog>
    </div>
    <!--分类添加对话框-->

</template>

<script>
    import {getCateList,getSysCateList,addCate,removeCate} from '@/api/admin/Cate'
    import {getDictDataByDictType} from '@/api/admin/DictData'
    export default {
        name: "Cate",
        data(){
            return {
                //加载
                loading: false,
                //系统分类列表
                cateList: [],
                //开关
                open: false,
                //对话款标题
                dialogTitle: '',
                //分类表单
                cateForm:{
                    cateName: '',
                    pid: '',
                    sort: '',
                    status: '0',
                },
                //父级分类
                pCateList: [],
                pidFlag: false,
                dictDataList: []
            }
        },
        created(){
            this.apiGetCateList()
            this.apiGetDictData('sys_status')
        },
        methods:{
            //获取字典数据
            apiGetDictData(dictType) {
                getDictDataByDictType(dictType).then(res =>{
                    if (res.code !==200){
                        console.log(res.msg)
                    }
                    this.dictDataList = res.data

                })

            },
            apiGetCateList(){
                this.loading = true
                getCateList().then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        this.loading = false
                        return
                    }
                    this.cateList = res.data
                    this.loading = false
                })
            },
            //添加分类
            apiAddCate(){
                this.dialogTitle = '添加系统分类'
                this.apiGetPCate()
                this.open = true
            },
            //提交分类
            apiSubmitCate(){
                addCate(this.cateForm).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        return
                    }
                    this.$message.success(res.msg)
                    this.open = false
                    this.apiGetCateList()

                })
            },
            //获取父级分类类
            apiGetPCate(){
                getSysCateList(0).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        return
                    }
                    this.pCateList = res.data
                    this.pCateList.unshift({cateName: '顶级分类',id:0})
                })
            },

            //取消
            apiCancel(){

                this.open = false
            },
            //关闭对话框突发事件
            apiClose(){
                this.cateForm.cateName = ''
                this.cateForm.status = '0'
                this.cateForm.sort = 0
                this.cateForm.pid = ''
                this.open = false
            },
            //修改分类
            apiEditCate(data){
                this.cateForm.cateName = data.cateName
                this.cateForm.status = data.status
                this.cateForm.sort = data.sort
                this.cateForm.pid = data.pid
                this.cateForm.id = data.id
                this.apiGetPCate()
                this.pidFlag = true
                this.dialogTitle = '修改系统分类'
                this.open = true
            },
            //添加
            apiAddCate2(data){
                this.cateForm.pid = data.id
                this.pidFlag = true
                this.apiGetPCate()
                this.dialogTitle = '添加系统分类'
                this.pCateList.unshift(data);
                this.open = true
            },
            //删除
            apiRemoveCate(id){
                if (id){
                    this.$confirm('是否永久删除该分类，是否继续？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() =>{
                        removeCate(id).then(res =>{
                            if (res.code !==200){
                                this.$message.error(res.msg)
                                return
                            }
                            this.$message.success(res.msg)
                            this.apiGetCateList()
                        })
                    }).catch(() =>{
                        this.$message.info('已取消删除操作！')
                    })

                }
            }
        }
    }
</script>

<style scoped>

</style>
