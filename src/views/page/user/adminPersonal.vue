<template>
    <div style="height: 100%">
        <el-row :gutter="6">
            <el-col :span="14">
                <el-tabs tab-position="left" stretch v-loading="loading">
                    <el-tab-pane label="用户账号">
                        <span slot="label"><i class="el-icon-user-solid"></i>用户账号</span>
                        <!--用户账号-->
                        <el-form :model="account" label-position="right">
                            <el-form-item label="用户账号" label-width="90px">
                                <el-input placeholder="请输入用户账号" disabled v-model="account.username" />
                            </el-form-item>
                            <el-form-item label="用户昵称" label-width="90px">
                                <el-input placeholder="请输入用户昵称" v-model="account.nickName" />
                            </el-form-item>
                            <el-form-item label="用户名字" label-width="90px">
                                <el-input placeholder="请输入用户名字" v-model="account.realName" />
                            </el-form-item>
                            <el-form-item label="用户性别" label-width="90px">
                                <el-radio-group v-model="account.sex">
                                    <el-radio v-for="item in sexList" :key="item.id" :label="item.dictValue">{{item.dictLabel}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label-width="90px">
                                <el-button type="primary" @click="apiUpdateAccount(1)">修改</el-button>
                                <el-button type="warning">重置密码</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="">
                        <span slot="label"><i class="el-icon-phone"></i>联系信息</span>
                        <!--联系信息-->
                        <el-form :model="contact" >
                            <el-form-item   label="用户电话" label-width="90px">
                                <el-input placeholder="请输入用户电话" v-model="contact.phone"/>
                            </el-form-item>
                            <el-form-item  label="用户微信" label-width="90px">
                                <el-input placeholder="请输入用户微信" v-model="contact.weixin"/>
                            </el-form-item>
                            <el-form-item  label="用户QQ" label-width="90px">
                                <el-input placeholder="请输入用户QQ" v-model="contact.qq"/>
                            </el-form-item>
                            <el-form-item  label="用户邮箱" label-width="90px">
                                <el-input placeholder="请输入用户邮箱" v-model="contact.email"/>
                            </el-form-item>
                            <el-form-item  label="用户地址" label-width="90px">
                                <el-input placeholder="请输入用户地址" v-model="contact.dormitory"/>
                            </el-form-item>
                            <el-form-item label-width="90px">
                               <el-button type="primary" @click="apiUpdateAccount(2)">修改</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="">
                        <span slot="label"><i class="el-icon-s-promotion"></i>个人简介</span>
                        <!--个人简介-->
                        <el-form :model="intro">
                            <el-form-item label="简介" label-width="90px">
                                <el-input placeholder="请输入用户简介" :rows="4" type="textarea" v-model="intro.introduce"/>
                            </el-form-item>
                            <el-form-item label-width="90px">
                                <el-button type="primary" @click="apiUpdateAccount(3)">修改</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="10">
                <div class="my-avatar">
                    <el-avatar shape="square" :size="90" :src="avatar"></el-avatar>
                    <label for="file">点击修改头像</label>
                    <input @change="onFileChangeFirst" id="file" ref="file" hidden type="file" />
                </div>
            </el-col>
        </el-row>

        <!--修改头像弹出层-->
        <el-dialog :visible="open" @opened="dialogOpened" append-body>
            <span slot="title">{{dialogTile}}</span>
            <div class="edit-avatar">
                <img style="height: 200px;" :src="editImage" ref="img" />
            </div>
            <div slot="footer">
                <el-button type="primary" @click="apiSubmitImage">修改</el-button>
                <el-button type="info" @click="open = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getDictDataByDictType} from '@/api/admin/DictData'
    import {getUserInfo,updateUser} from '@/api/admin/User'
    import request from '@/utils/request'
    import 'cropperjs/dist/cropper.css';
    import Cropper from 'cropperjs';
    export default {
        name: "Personal",
        data(){
            return{
                //开关
                open: false,
                //弹出层标题
                dialogTile: '',
                //头像
                avatar: '',
                //账号
                account:{
                    id: '',
                    username: '',
                    realName: '',
                    nickName: '',
                    sex: ''
                },
                //联系方式
                contact:{
                    id: '',
                    weixin: '',
                    phone: '',
                    qq: '',
                    email: '',
                    dormitory: ''
                },
                //简介
                intro:{
                    introduce: ''
                },
                //性别
                sexList: [],
                //
                loading: false,
                //编辑头像地址
                editImage: '',
                //裁切
                cropper: ''

            }
        },
        created(){
            document.title = '用户信息'
            this.apiGetDictData()
            this.apiGetUserInfo()
        },
        methods:{
            //获取用户行性别
            apiGetDictData(){
                getDictDataByDictType('user_sex').then(res =>{
                    this.sexList = res.data
                })
            },
            //获取用户信息
            apiGetUserInfo(){
                this.loading = true
                getUserInfo().then(res =>{
                    //账号信息
                    this.account.username = res.data.user.username
                    this.account.realName = res.data.realName
                    this.account.nickName = res.data.user.nickName
                    this.account.sex = res.data.user.sex + ''
                    this.account.id = res.data.user.id
                    //联系信息
                    this.contact.dormitory = res.data.dormitory
                    this.contact.email = res.data.email
                    this.contact.phone = res.data.phone
                    this.contact.weixin = res.data.weixin
                    this.contact.qq = res.data.qq
                    this.contact.id = res.data.user.id
                    //简介
                    this.intro.introduce = res.data.introduce
                    //头像
                    this.avatar = res.data.user.avatar

                    this.loading = false
                })
            },
            //头像修改
            onFileChangeFirst(){
                const  file = this.$refs.file.files[0]
                this.$refs.file.value = ''
                this.dialogTitle = '修改头像'
                this.editImage = window.URL.createObjectURL(file)
                this.open = true
            },
            //打开弹出层后初始化裁切器
            dialogOpened(){
                const image = this.$refs.img
                if(this.cropper){
                    this.cropper.replace(this.editImage)
                    return
                }
                 this.cropper = new Cropper(image, {
                   /* aspectRatio: 16 / 9,*/
                    aspectRatio: 1,
                     viewMode: 1,
                     dragMode: 'none',
                     movable: true,
                     cropBoxResizable: false
                     //cropBoxMovable: false,
              /*      crop(event) {
                        console.log(event.detail.x);
                        console.log(event.detail.y);
                        console.log(event.detail.width);
                        console.log(event.detail.height);
                        console.log(event.detail.rotate);
                        console.log(event.detail.scaleX);
                        console.log(event.detail.scaleY);
                    },*/
                });
            },
            //提交裁切器图片
            apiSubmitImage(){
                this.cropper.getCroppedCanvas().toBlob(blob => {
                    console.log(blob)
                    var fileForm = new FormData()
                    fileForm.append('file',blob)
                    request({
                        url: '/user/avatar',
                        method: 'post',
                        data: fileForm
                    }).then(res =>{
                        this.avatar = res.data.fileUrl
                        this.$store
                            .dispatch('SetAvatarUrl',res.data.fileUrl)
                        this.open = false
                    })
                })
            },
            //修改用户账号信息
            apiUpdateAccount(index){
                if (index ===1){
                    updateUser(this.account).then(res => {
                        this.$message.success(res.msg)
                        this.apiGetUserInfo()
                    })
                }else if (index === 2){
                    updateUser(this.contact).then(res => {
                        this.$message.success(res.msg)
                        this.apiGetUserInfo()
                    })
                }else {
                    updateUser(this.intro).then(res => {
                        this.$message.success(res.msg)
                        this.apiGetUserInfo()
                    })
                }

                this.apiGetUserInfo()

            }

        }
    }
</script>

<style scoped lang="less">
    .my-avatar{
        text-align: center;

        label{
            cursor: pointer;
        }
        label:hover{
            color: #409EFF;
        }
    }
.my-avatar .el-avatar{
    display: block;
    margin: 20px auto;
}
</style>
