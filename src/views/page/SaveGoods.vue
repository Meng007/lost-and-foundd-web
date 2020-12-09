<template>
    <div style="width: 100%;">
        <el-row v-loading="loading" :gutter="4">
            <el-form :model="goodsForm" label-position="right">
                <el-form-item style="position: relative">
                    <el-button style="position: absolute;right: 10px;z-index: 9999;"  type="primary" size="mini">发布</el-button>
                </el-form-item>
            <el-col :span="12">
                    <el-form-item label="标题" label-width="120px">
                        <el-input v-model="goodsForm.goodsTitle"/>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="物品名称">
                                <el-input v-model="goodsForm.goodsName"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="启事类型">
                                <el-radio v-model="goodsForm.goodsStatus" label="1">丢失</el-radio>
                                <el-radio v-model="goodsForm.goodsStatus" label="2">拾起</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="联系人">
                                <el-input v-model="goodsForm.linkman"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="联系电话">
                                <el-input v-model="goodsForm.phone"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="物品分类">
                                <el-select v-model="goodsForm.goodsType" placeholder="请选择">
                                    <el-option
                                            v-for="item in goodsType"
                                            :key="item.id"
                                            :label="item.cateName"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="丢(拾)时间">
                                <el-date-picker
                                        v-model="goodsForm.loseTime"
                                        align="right"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="封面图">
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false">
                                    <img v-if="goodsForm.coverImage" :src="goodsForm.coverImage" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
            </el-col>
            <el-col :span="12">
                <el-tiptap height="545px"  placeholder="请输入描述内容" v-model="goodsForm.goodsContent" :extensions="extensions"></el-tiptap>
            </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import {
        ElementTiptap,
        Doc,
        Text,
        Paragraph,
        Heading,
        Bold,
        Underline,
        Italic,
        Strike,
        ListItem,
        BulletList,
        OrderedList,
        TodoItem,
        TodoList,
        Fullscreen,
        Image,
        TextColor
    }
    from 'element-tiptap'
    import {getSysCateList} from '@/api/admin/Cate'
    export default {
        name: "SaveGoods",
        components:{
            "el-tiptap": ElementTiptap
        },
        data(){
            return {
                //物品表单
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
                //日期
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                //富文本配置
                extensions: [
                    new Doc(),
                    new Text(),
                    new Paragraph(),
                    new Heading({ level: 5 }),//标题5
                    new Image(),//图片
                    new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
                    new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
                    new Italic(),//斜体
                    new TextColor(),//文字颜色
                    new Strike(),//删除线
                    new ListItem(),
                    new BulletList(),//无序列表
                    new OrderedList(),//有序列表
                    new TodoItem(),
                    new TodoList(),
                    new Fullscreen()//全屏
                ],
                //物品分类
                goodsType: [],
                loading: false
            }
        },
        created(){
            document.title = '小主平台|发布启事'
            this.apiGetGoodsType()
        },
        methods:{
            /**
             * 获取物品分类
             */
            apiGetGoodsType(){
                this.loading = true
                getSysCateList(1).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        this.loading = false
                        return
                    }
                    this.goodsType = res.data
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .avatar-uploader .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    //el-icon-plus avatar-uploader-icon
    .avatar-uploader .avatar-uploader-icon:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-date-editor.el-input {
        width: 152px;
    }
    .el-tiptap-editor>.el-tiptap-editor__content{
        height: 318px !important;
    }
</style>
