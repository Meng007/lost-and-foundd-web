<template>
    <div style="height: 100%">
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
                    <el-input v-model="query.goodsTitle"
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
                    <el-button type="cyan" icon="el-icon-search" size="mini" @click="searchGoods">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetSearch">重置</el-button>
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
                  @click="apiAddGoods"
          >新增</el-button>
        </el-col>
        <!--  <el-col :span="1.5">
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
          </el-col>-->
        <!-- <el-col :span="1.5">
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
        <el-table :data="goodsList" v-loading="loading">
            <!-- <el-table-column type="selection" width="50" align="center" />-->
            <el-table-column label="编号" type="index" align="center"></el-table-column>
            <el-table-column label="物品名称" prop="goodsName" align="center"></el-table-column>
            <el-table-column label="物品标题" prop="goodsTitle" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
            <el-table-column label="地址" prop="address" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="物品类型" prop="goodsType" align="center"></el-table-column>
            <el-table-column label="物品封面" prop="coverImage" align="center">
                <template slot-scope="scope">
                    <el-image :src="scope.row.coverImage"/>
                </template>
            </el-table-column>
            <el-table-column label="物品状态" prop="status" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="失物时间" prop="createTime" align="center"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="160">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="apiUpdateGoods(scope.row.id)"
                    >修改
                    </el-button>
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="apiRemoveGoods(scope.row.id)"
                    >删除
                    </el-button>
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
        <!--怎加修改对话框-->
        <el-dialog :visible="open" width="80%" @close="apiClose">
            <span slot="title">{{dialogTime}}</span>
            <GoodsForm :goods-form="goodsForm" @apiresult="apiResult"/>
        </el-dialog>
    </div>
</template>

<script>
  import GoodsForm from '@/components/GoodsForm'
    import {getUserList, getGoodsInfo, removeGoods} from '@/api/admin/Goods'

    export default {
        name: "MyGoods",
      components:{GoodsForm},
        data() {
            return {
                query: {
                    page: 1,
                    size: 10,
                    total: 0,
                    beginTime: '',
                    endTime: '',
                    goodsName: '',
                    goodsType: '',
                    goodsTitle: '',
                    phone: ''
                },
                //时间
                time: [],
                //我的物品列表
                goodsList: [],
                //加载开关
                loading: false,
                //对话框标题
                dialogTime: '',
                goodsForm: {
                    goodsTitle: '',
                    goodsName: '',
                    goodsContent: '',
                    loseTime: '',
                    coverImage: '',
                    goodsType: '',
                    phone: '',
                    linkman: '',
                    goodsStatus: '1'
                },
                open: false
            }
        },
        created() {
            this.apiGetUserGoods()
        },
        methods: {
            apiGetUserGoods() {
                this.loading = true
                getUserList(this.query).then(res => {
                    if (res.code !== 200) {
                        this.$message.error(res.msg)
                        this.loading = false
                        return
                    }
                    this.goodsList = res.data
                    this.loading = false
                })
            },
            /**
             * 删除物品
             */
            apiRemoveGoods(id) {
                this.$confirm('永久删除该物品，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.remove(id);
                }).catch(() => {
                    this.$message.info('取消删除操作')
                })
            },
            //删除操作
            remove(id) {
                removeGoods(id).then(res => {
                    if (res.code !== 200) {
                        this.$message.error(res.msg)
                        return
                    }
                    this.$message.success(res.msg)
                    this.apiGetUserGoods()
                })
            },
            //添加物品
            apiAddGoods() {
                this.dialogTime = '添加物品'
                this.open = true
            },
            //修改物品
            apiUpdateGoods(id) {
                getGoodsInfo(id).then(res => {
                    if (res.code !== 200) {
                        this.$message.error(res.msg)
                        return
                    }
                    this.goodsForm = res.data
                    this.open = true
                })
            },
            //搜索
            searchGoods() {
                if (this.time.length > 0) {
                    this.query.beginTime = this.time[0]
                    this.query.endTime = this.time[0]
                }
                this.apiGetUserGoods()
            },
            //重置搜索
            resetSearch() {
                this.query.endTime = ''
                this.query.beginTime = ''
                this.query.goodsName = ''
                this.query.goodsTitle = ''
                this.query.goodsType = ''
                this.apiGetUserGoods()
            },
          apiClose(){
              this.open = false
          },
            //监听
            apiResult(item) {
                this.open = item.flag
                if (item.get){
                    this.apiGetGoods()
                }
            }
        }
    }
</script>

<style scoped>

</style>
