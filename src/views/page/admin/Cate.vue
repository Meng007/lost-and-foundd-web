<template>
    <div style="width: 100%;">
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
                :data="cateList"
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <el-table-column prop="cateName" label="分类名称" :show-overflow-tooltip="true" width="160"></el-table-column>
            <el-table-column prop="sort" label="排序" width="60"></el-table-column>
            <el-table-column prop="status" label="状态"  width="80"></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
            <el-table-column label="创建人" align="center" prop="nickName"></el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="text"
                               icon="el-icon-edit"
                    >修改{{scope.row.id}}</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-plus"
                    >新增</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getCateList} from '@/api/admin/Cate'
    export default {
        name: "Cate",
        data(){
            return {
                //加载
                loading: false,
                //系统分类列表
                cateList: []
            }
        },
        created(){
            this.apiGetCateList()
        },
        methods:{
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
            }
        }
    }
</script>

<style scoped>

</style>
