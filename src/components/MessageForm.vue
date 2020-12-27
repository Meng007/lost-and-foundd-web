<template>
    <div style="height: 100px">
        <el-form :model="message" :rules="messageRules" ref="message" label-position="right">
            <el-form-item label-width="90px" label="内容" prop="content">
                <el-input clearable placeholder="请输入内容" v-model="message.content" type="textarea" :rows="4"/>
            </el-form-item>
            <el-form-item label-width="90px" label="选择图片">
                <el-upload
                        action="#"
                        :http-request="submitIcon"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label-width="90px" label="话题标签" prop="tags">
                <el-input placeholder="请输入标签"
                          style="width: 100px;margin-right: 4px"
                          v-for="(item,index) in message.tags"
                          :key="item.tagName+index"
                          v-model="item.tagName"
                          clearable
                          :maxlength="6"
                          :minlength="2"
                />
                <el-button type="danger" @click="removeTag">删除</el-button>
                <el-button type="primary" @click="addTag">添加</el-button>
            </el-form-item>
            <el-form-item label-width="90px">
                <el-button type="primary" size="mini" @click="apiCommentSave">提交</el-button>
                <el-button type="info" size="mini">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import {addComment} from '@/api/admin/Comment'

    export default {
        name: "MessageForm",
        data() {
            return {
                //文件上传地址
                fileUploadUrl: 'file/upload',
                dialogVisible: false,
                loading: false,
                dialogImageUrl: '',
                message: {
                    content: '',
                    images: [],
                    tags: [
                        {tagName: ''}
                    ]
                },
                messageRules:{
                    content:[
                        {required:true,message: '请输入内容',target:'blur'}
                    ],
                }
            }
        },
        created() {
            document.title = '小主平台|发布留言'
        },
        methods: {
            //删除话题标签
            removeTag() {
                if (this.message.tags.length === 1) {
                    this.$message.warning('不能删除！')
                    return
                } else {
                    this.message.tags.pop()
                    this.$message.success('删除成功！')
                }


            },
            //添加标签
            addTag() {
                const tag = this.message.tags[this.message.tags.length - 1]
                if (tag.tagName) {
                    if (this.message.tags.length === 5) {
                        this.$message.warning('标签不能超过五个')
                        return
                    }
                    this.message.tags.push({tagName: ''})
                } else {
                    this.$message.warning('上一个标签不能为空！')
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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
                        //this.goodsForm.coverImage = res.data.fileUrl
                        this.message.images.push({imagePath: res.data.fileUrl})
                    }
                })
            },
            //发布留言
            apiCommentSave() {
                this.$refs.message.validate(val => {
                    if (!val) {
                        return
                    }
                    addComment(this.message).then(res => {
                        this.$message.success(res.msg)
                        this.messageemit({flag:false,result:true})
                    })
                })
            },
            //取消
            apiCancel(){
              this.messageemit({flag:false,result:false})
            },
            //发射
            messageemit(data){
                this.$emit('sys-result',data)
            }

        },

    }
</script>

<style scoped>

</style>
