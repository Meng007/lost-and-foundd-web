<template>
    <div style="width: 100%;">
        <GoodsForm :goodsForm="goodsForm"></GoodsForm>
    </div>
</template>

<script>
    import GoodsForm from '@/components/GoodsForm'
    export default {
        name: "SaveGoods",
        components:{
            GoodsForm
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
                loading: false
            }
        },
        created(){
            document.title = '小主平台|发布启事'
        },
        methods:{
        },

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
