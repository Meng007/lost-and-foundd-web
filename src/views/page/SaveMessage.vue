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
                               action="https://jsonplaceholder.typicode.com/posts/"
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
    export default {
        name: "SaveMessage",
        data(){
           return{
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
            }
        }
    }
</script>

<style scoped>

</style>
