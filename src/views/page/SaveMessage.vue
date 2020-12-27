<template>
    <div style="height: 100%;">
        <el-row :gutter="8">
            <el-col :span="15">
                <!--<el-form :model="message" :rules="messageRules" ref="message" label-position="right">
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
                </el-form>-->
                <MessageForm/>
            </el-col>
            <el-col :span="8">
                热门留言
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import MessageForm from "@/components/MessageForm";
    export default {
        name: "SaveMessage",
        components:{
            MessageForm
        },
        data() {
            return {

            }
        },
        created() {
            document.title = '小主平台|发布留言'
        },
        methods: {


        }

    }
</script>

<style scoped>

</style>
