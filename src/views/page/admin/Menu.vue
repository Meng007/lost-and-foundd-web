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

              label="可用"
              value="1"
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
          @click="open =true"
      >新增</el-button>
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
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column prop="sort" label="排序" width="60"></el-table-column>
    <el-table-column prop="perms" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="status" label="状态"  width="80"></el-table-column>
    <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button size="mini"
                   type="text"
                   icon="el-icon-edit"
                   @click="handleUpdate(scope.row)"
        >修改</el-button>
        <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
        >新增</el-button>
        <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>


  <!-- 添加或修改菜单对话框 -->
  <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
    <el-form ref="form" :model="menuForm" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <treeselect
                    v-model="menuForm.pid"
                    :options="menuOptions"
                    :normalizer="normalizer"
                    :show-count="true"
                    placeholder="选择上级菜单"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="menuForm.menuType">
              <el-radio label="1">目录</el-radio>
              <el-radio label="2">菜单</el-radio>
              <el-radio label="3">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="menuForm.menuType != '2'" label="菜单图标">
            <el-input v-model="menuForm.icon"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="order">
            <el-input-number v-model="menuForm.order" controls-position="right" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="menuForm.menuType != '3'" label="是否外链">
            <el-radio-group v-model="menuForm.isFrame">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="menuForm.menuType != 'F'" label="路由地址" prop="path">
            <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="menuForm.menuType == '2'">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="menuForm.menuType != '1'" label="权限标识">
            <el-input v-model="menuForm.perms" placeholder="请权限标识" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="menuForm.menuType != '3'" label="显示状态">
            <el-radio-group v-model="menuForm.visible">
              <el-radio label="1">显示</el-radio>
              <el-radio label="2">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="menuForm.menuType != '3'" label="菜单状态">
            <el-radio-group v-model="menuForm.status">
              <el-radio label="1" >启动</el-radio>
              <el-radio label="2" >禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import {getMenuList,handleTree} from '@/api/admin/Menu'
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
    export default {
        name: "Menu",
      components:{
        Treeselect
      },
      data(){
        return {
          loading: false,
          title: '',
          query:{
            page: 1,
            size: 10,
            total: 0
          },
          menuOptions: [],
          open: false,
          menuForm:{
            menuName: '',
            pid: '',
            order: '',
            path: '',
            component: '',
            isFrame: '',
            menuType: '',
            perms: '',
            icon: '',
            visible: '',
            status: ''
          },
          menuList: [],
          rules:{}
        }
      },
      created(){
          this.apiMenuList()
        this.getTreeselect()
      },
      methods:{
        /**
         * 获取菜单
         */
        apiMenuList(){
            getMenuList(this.query).then(res =>{
              if (res.code !==200){
                this.$message.error(res.msg)
                return
              }
              this.menuList = res.data
              this.menuOptions = res.data

            })

          },
        /** 转换菜单数据结构 */
        normalizer(node) {
          if (node.children && !node.children.length) {
            delete node.children;
          }
          return {
            id: node.id,
            label: node.menuName,
            children: node.children
          };
        },
        /** 查询菜单下拉树结构 */
        getTreeselect() {
          getMenuList().then(response => {
            this.menuOptions = [];
            const menu = { menuId: 0, menuName: '主类目', children: [] };
            menu.children = handleTree(response.data, "id");
            this.menuOptions.push(menu);
          });
        },
        /**
         * 提交修改，添加
         */
        submitForm(){

        },
        /**
         * 取消
         */
        cancel(){

        },
      }
    }
</script>

<style scoped>

</style>
