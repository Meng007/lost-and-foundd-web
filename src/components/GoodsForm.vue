<template>
    <div style="height: 100%">
        <el-row v-loading="loading" :gutter="4">
            <el-form :model="goodsForm" label-position="right">
                <el-col :span="12">
                    <el-form-item label="标题" label-width="120px">
                        <el-input placeholder="请输入标题内容" v-model="goodsForm.goodsTitle"/>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="物品名称">
                                <el-input placeholder="请输入物品名称" v-model="goodsForm.goodsName"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="启事类型">
                                <el-radio v-model="goodsForm.goodsStatus" :label="1">丢失</el-radio>
                                <el-radio v-model="goodsForm.goodsStatus" :label="2">拾起</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="联系人">
                                <el-input placeholder="请输入联系人" v-model="goodsForm.linkman"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="120px" label="联系电话">
                                <el-input placeholder="请输入联系电话" v-model="goodsForm.phone"/>
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
                            <el-form-item label-width="120px" label="丢（拾）地点">
                               <el-input placeholder="请输入丢（拾）地点" v-model="goodsForm.address"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-tiptap height="500px"  placeholder="请输入描述内容" v-model="goodsForm.goodsContent" :extensions="extensions"></el-tiptap>
                </el-col>
                <el-button type="primary" size="mini" v-if="goodsForm.id" @click="apiUpdateGoods">修改</el-button>
                <el-button type="primary" size="mini" v-else @click="apiSaveGoods">发布</el-button>
                <el-button type="info" size="mini" @click="open = false">取消</el-button>
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
    import {fileUpload,saveGoods,updateGoods} from '@/api/admin/Goods'
    import {getToken} from '@/utils/auth'
    import request from '@/utils/request'
    export default {
        name: "GoodsForm",
        components:{
            "el-tiptap": ElementTiptap
        },
        data(){return{
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
                    uploadRequest(file){
                        console.log("----------")
                        console.log(file)
                        const f = new FormData()
                        f.append("file",file)
                        return fileUpload(f).then(res =>{
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
            goodsType: [],
            headers: {
                "Authorization": 'Bearer '+getToken(),
                "Content-Type": "multipart/form-data;"
            },
            //文件上传地址
            fileUploadUrl: 'file/upload',
        }},
        props:{
            goodsForm:{
                type:Object
            }
        },
        created(){
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
            },
            /**
             * 提交数据
             */
            apiSaveGoods(){
                saveGoods(this.goodsForm).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg);
                        return
                    }
                    this.$message.success(res.msg)
                    this.open = false
                })
            },
            /**
             * 封面上传成功
             */
            coverImageUploadSuccess(res){
                this.goodsForm.coverImage = res.data.fileUrl
            },
            /**
             * 自定义文件上传
             */
            submitIcon(file){
                console.log(file);
                const f = new FormData()
                f.append("file",file.file)
                request({
                    url: this.fileUploadUrl,
                    data: f,
                    method: 'post',
                    headers: { "Content-Type": "multipart/form-data;"}
                }).then(res =>{
                    if (res.code ===200){
                        this.goodsForm.coverImage = res.data.fileUrl
                    }
                })
            },
            //修改
            apiUpdateGoods(){
                updateGoods(this.goodsForm).then(res =>{
                    if (res.code !==200){
                        this.$message.error(res.msg)
                        return
                    }
                    this.$message.success(res.msg)
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
