<template>
    <div style="height: 100%">
        <el-row v-loading="loading" :gutter="4">
            <el-form ref="goodsForm" :model="goodsForm" label-position="right" :rules="goodsRules">
                <el-col :span="12">
                    <el-form-item label="标题" label-width="120px" prop="goodsTitle">
                        <el-input clearable placeholder="请输入标题内容" v-model="goodsForm.goodsTitle"/>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="物品名称" prop="goodsName">
                                <el-input clearable placeholder="请输入物品名称" v-model="goodsForm.goodsName"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="启事类型" prop="goodsStatus">
                                <el-radio-group v-model="goodsForm.goodsStatus">

                                    <el-radio v-for="item in goodsType" :key="item.id"  :label="item.dictValue">{{item.dictLabel}}</el-radio>
                                </el-radio-group>

                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="联系人" prop="linkman">
                                <el-input clearable placeholder="请输入联系人" v-model="goodsForm.linkman"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="联系电话" prop="phone">
                                <el-input clearable placeholder="请输入联系电话" v-model="goodsForm.phone"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="物品分类" prop="goodsType">
                                <el-select v-model="goodsForm.goodsType" placeholder="请选择">
                                    <el-option
                                            v-for="item in goodsCate"
                                            :key="item.id"
                                            :label="item.cateName"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="丢(拾)时间" prop="loseTime">
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
                            <el-form-item label-width="120px" label="封面图" prop="coverImage">
                                <el-upload
                                        :http-request="submitIcon"
                                        :headers="headers"
                                        class="avatar-uploader"
                                        :on-success="coverImageUploadSuccess"
                                        :action="fileUploadUrl"
                                        :show-file-list="false">
                                    <img v-if="goodsForm.coverImage" :src="goodsForm.coverImage" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="丢(拾)地点" prop="address">
                                <el-input clearable placeholder="请输入丢（拾）地点" v-model="goodsForm.address"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-tiptap height="500px" placeholder="请输入描述内容" v-model="goodsForm.goodsContent"
                               :extensions="extensions"></el-tiptap>
                </el-col>
               <div>
                   <el-button style="float: right;margin-right: 10px" type="info" size="mini" @click="apiCancel">取消</el-button>
                   <el-button style="float: right;margin-right: 10px" type="primary" size="mini" v-if="goodsForm.id" @click="apiUpdateGoods">修改</el-button>
                   <el-button style="float: right;margin-right: 10px" type="primary" size="mini" v-else @click="apiSaveGoods">发布</el-button>
               </div>
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
        TextAlign,
        TextColor
    }
        from 'element-tiptap'
    import {getSysCateList} from '@/api/admin/Cate'
    import {fileUpload, saveGoods, updateGoods} from '@/api/admin/Goods'
    import {getToken} from '@/utils/auth'
    import request from '@/utils/request'
    import {getDictDataByDictType} from '@/api/admin/DictData'

    export default {
        name: "GoodsForm",
        components: {
            "el-tiptap": ElementTiptap
        },
        data() {
            return {
                //启事类型
                goodsType: [],
                loading: false,
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
                    new Heading({
                        level: 5
                    }),//标题5
                    new Image({
                        uploadRequest(file) {
                            const f = new FormData()
                            f.append("file", file)
                            return fileUpload(f).then(res => {
                                res.code
                                return res.data.fileUrl
                            })
                        }
                    }),//图片
                    new Bold({
                        bubble: true
                    }), // 在气泡菜单中渲染菜单按钮
                    new Underline({
                        bubble: true,
                        menubar: false
                    }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
                    new Italic(),//斜体
                    new TextColor(),//文字颜色
                    new Strike(),//删除线
                    new TextAlign(),
                    new ListItem(),
                    new BulletList(),//无序列表
                    new OrderedList(),//有序列表
                    new TodoItem(),
                    new TodoList(),
                    new Fullscreen()//全屏
                ],
                //物品分类
                goodsCate: [],
                headers: {
                    "Authorization": 'Bearer ' + getToken(),
                    "Content-Type": "multipart/form-data;"
                },
                //文件上传地址
                fileUploadUrl: 'file/upload',
                //校验
                goodsRules: {
                    goodsTitle: [
                        {required: true, trigger: "blur", message: "物品标题不能为空"}
                    ],
                    goodsName: [
                        {required: true, trigger: "blur", message: "物品名称不能为空"}
                    ],
                    goodsContent: [
                        {required: true, trigger: "blur", message: "物品描述不能为空"}
                    ],
                    loseTime: [
                        {required: true, trigger: "blur", message: "物品丢失时间不能为空"}
                    ],
                    coverImage: [
                        {required: true, trigger: "blur", message: "物品封面不能为空"}
                    ],
                    goodsType: [
                        {required: true, trigger: "blur", message: "物品类型不能为空"}
                    ],
                    phone: [
                        {required: true, trigger: "blur", message: "联系人电话不能为空"}
                    ],
                    linkman: [
                        {required: true, trigger: "blur", message: "联系人名称不能为空"}
                    ],
                    goodsStatus: [
                        {required: true, trigger: "blur", message: "物品状态不能为空"}
                    ],
                    address: [
                        {required: true, trigger: "blur", message: "丢失地点不能为空"}
                    ],
                }
            }
        },
        props: {
            goodsForm: {
                type: Object
            }
        },
        created() {
            this.apiGetGoodsType()
            this.apiGetGoodsCate()
        },
        methods: {
            //启事类型
            apiGetGoodsType(){
                getDictDataByDictType('sys_goods_type').then(res =>{
                    this.goodsType = res.data
                })
            },
            /**
             * 获取物品分类
             */
            apiGetGoodsCate() {
                this.loading = true
                getSysCateList(1).then(res => {
                    if (res.code !== 200) {
                        this.$message.error(res.msg)
                        this.loading = false
                        return
                    }
                    this.goodsCate = res.data
                    this.loading = false
                })
            },
            /**
             * 提交数据
             */
            apiSaveGoods() {
                this.$refs.goodsForm.validate(val =>{
                    console.log(val)
                    if (!val){return}
                    saveGoods(this.goodsForm).then(res => {
                        if (res.code !== 200) {
                            this.$message.error(res.msg);
                            const obj = {flag: false, get: false}
                            this.$emit('apiresult', obj)
                            return
                        }
                        this.$message.success(res.msg)
                        this.open = false
                        const obj = {flag: false, get: true}
                        this.$emit('apiresult', obj)
                    })
                })

            },
            /**
             * 封面上传成功
             */
            coverImageUploadSuccess(res) {
                this.goodsForm.coverImage = res.data.fileUrl
            },
            /**
             * 自定义文件上传
             */
            submitIcon(file) {
                console.log(file);
                const f = new FormData()
                f.append("file", file.file)
                request({
                    url: this.fileUploadUrl,
                    data: f,
                    method: 'post',
                    headers: {"Content-Type": "multipart/form-data;"}
                }).then(res => {
                    if (res.code === 200) {
                        this.goodsForm.coverImage = res.data.fileUrl
                    }
                })
            },
            //修改
            apiUpdateGoods() {
                updateGoods(this.goodsForm).then(res => {
                    if (res.code !== 200) {
                        this.$message.error(res.msg)
                        const obj = {flag: false, get: false}
                        this.$emit('apiresult', obj)
                        return
                    }
                    this.$message.success(res.msg)
                    const obj = {flag: false, get: true}
                    this.$emit('apiresult', obj)
                })
            },
            //点击取消
            apiCancel() {
                const obj = {flag: false, get: ''}
                this.$emit('apiresult', obj)
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

    .el-tiptap-editor > .el-tiptap-editor__content {
        height: 318px !important;
    }
</style>
