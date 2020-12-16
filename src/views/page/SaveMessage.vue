<template>
    <div style="height: 100%;">
       <el-row :gutter="8">
           <el-col :span="15">
               <el-form label-position="rigth">
                   <el-form-item label-width="120px" label="请输入内容">
                       <el-input type="textarea" :rows="4"/>
                   </el-form-item>
                   <el-form-item label-width="120px" label="选择图片">
                       <el-upload
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
                   <el-form-item label-width="120px">
                       <el-button type="primary" size="mini">提交</el-button>
                       <el-button type="info" size="mini">取消</el-button>
                   </el-form-item>
               </el-form>
           </el-col>
           <el-col :span="8">
               热门留言
           </el-col>
       </el-row>
    </div>
</template>

<script>
    import request from '@/utils/request'
    export default {
        name: "SaveMessage",
        data(){
           return{
               //文件上传地址
               fileUploadUrl: 'file/upload',
               dialogVisible: false,
               dialogImageUrl: '',
               message:{
                   content: '',

               }
           }
        },
        created(){
            document.title = '小主平台|发布留言'
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            } ,
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
                        //this.goodsForm.coverImage = res.data.fileUrl
                    }
                })
            },
        },

    }
</script>

<style scoped>

</style>
