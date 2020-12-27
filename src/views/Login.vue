<template>
    <div class="login">
        <!--登录-->
        <el-form v-if="open" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
            <h3 class="title">小主失物招领平台</h3>
            <el-form-item prop="username">
                <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username" type="text" auto-complete="off"
                          placeholder="账号">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                        prefix-icon="el-icon-s-tools"
                        v-model="loginForm.password"
                        type="password"
                        auto-complete="off"
                        placeholder="密码"
                        @keyup.enter.native="handleLogin"
                >
                </el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button
                        :loading="loading"
                        size="medium"
                        type="primary"
                        style="width:100%;"
                        @click.native.prevent="handleLogin"
                >
                    <span v-if="!loading">登录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
                <br/>
                <el-button
                        size="medium"
                        type="info"
                        style="width:100%;margin-top:2px"
                        @click.native.prevent="handleReg"
                >
                    <span>注册</span>
                </el-button>
            </el-form-item>
        </el-form>
        <!--注册-->
        <el-form :model="regForm" ref="regForm" :rules="regRules" v-else label-position="right" class="login-form">
            <h3 class="title">小主失物招领平台</h3>
            <!--步骤栏-->
            <el-steps :active="index" align-center process-status="process" finish-status="finish">
                <el-step title="账号"></el-step>
                <el-step title="联系"></el-step>
                <el-step title="个人"></el-step>
            </el-steps>
            <!--第一个输入页面-->
            <template v-if="index ===0 ">
                <el-form-item label="账号" label-width="90px" prop="username">
                    <el-input v-model="regForm.username" placeholder="请输入账号"/>
                </el-form-item>
                <el-form-item label="昵称" label-width="90px" prop="nickName">
                    <el-input v-model="regForm.nickName" placeholder="请输入昵称"/>
                </el-form-item>
                <el-form-item label="密码" label-width="90px" prop="password">
                    <el-input v-model="regForm.password" placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item label="确认密码" label-width="90px" prop="confirmPassword">
                    <el-input v-model="regForm.confirmPassword" placeholder="请再输入密码"/>
                </el-form-item>
            </template>
            <!--第二个输入页-->
            <template v-else-if="index === 1">
                <el-form-item label="手机号" label-width="90px" prop="phone">
                    <el-input v-model="regForm.phone" placeholder="请输入手机号"/>
                </el-form-item>
                <el-form-item label="微信" label-width="90px" prop="weixin">
                    <el-input v-model="regForm.weixin" placeholder="请输入微信"/>
                </el-form-item>
                <el-form-item label="QQ" label-width="90px" prop="qq">
                    <el-input v-model="regForm.qq" placeholder="请输入QQ"/>
                </el-form-item>
                <el-form-item label="地址" label-width="90px" prop="dormitory">
                    <el-input v-model="regForm.dormitory" placeholder="请再输入地址"/>
                </el-form-item>
            </template>
            <!--第三个输入页-->
            <template v-else-if="index === 2">
                <el-form-item label="真实姓名" label-width="90px" prop="realName">
                    <el-input v-model="regForm.realName" placeholder="请输入真实姓名"/>
                </el-form-item>
                <el-form-item label="性别" label-width="90px" prop="sex">
                    <el-radio-group v-model="regForm.sex">
                        <el-radio v-for="item in sexList" :key="item.id" :label="item.dictValue">{{item.dictLabel}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="学校名称" label-width="90px" prop="school">
                    <el-input v-model="regForm.school" placeholder="请输入学校名称"/>
                </el-form-item>
                <el-form-item label="个人简介" label-width="90px" prop="introduce">
                    <el-input type="textarea" :rows="4" v-model="regForm.introduce" placeholder="请再输入简介内容"/>
                </el-form-item>
            </template>
            <el-form-item>
                <template v-if="index ===0">
                    <el-button type="primary" @click="firstIndex(index)">下一步</el-button>
                </template>
                <template v-else-if="index ===1">
                    <el-button type="info" @click="firstStep(index)">上一步</el-button>
                    <el-button type="primary" @click="secondIndex(index)">下一步</el-button>
                </template>
                <template v-else-if="index ===2">
                    <el-button type="info" @click="firstStep(index)">上一步</el-button>
                    <el-button type="primary" @click="apiSubmitUser">注册</el-button>
                    <el-button type="warning" @click="open = true">取消</el-button>
                </template>
            </el-form-item>
        </el-form>
        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © 2020-2021 mds All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
    import Cookies from "js-cookie";
    import {encrypt, decrypt} from '@/utils/jsencrypt'
    import request from '@/utils/request'
    import {getDictDataByDictType} from '@/api/admin/DictData'
    export default {
        name: "Login",
        /**
         * 数据
         * */
        data() {
            //密码确认校验
            const validateConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.regForm.confirmPassword !== this.regForm.password) {
                        callback(new Error('两次输入的密码不一致'));
                    }
                    callback();
                }
            };
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'))
                }
                var pattern = /0?(13|14|15|18|17)[0-9]{9}/
                if (!pattern.test(value)) {
                    callback(new Error('两次输入的密码不一致'));
                }
                callback();
            };
            const validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'))
                }
                var pattern = /[A-Za-z0-9_]+/
                if (!pattern.test(value)) {
                    callback(new Error('账号规则:a-z|A-Z|0-9'))
                }
                callback()
            }
            return {
                //性别
                sexList:[],
                //下标
                index: 0,
                open: true,
                cookiePassword: "",
                loginForm: {
                    username: "admin",
                    password: "123456",
                    rememberMe: false
                },
                //登录表单规则
                loginRules: {
                    username: [
                        {required: true, trigger: "blur", message: "用户名不能为空"}
                    ],
                    password: [
                        {required: true, trigger: "blur", message: "密码不能为空"}
                    ],
                    code: [{required: true, trigger: "change", message: "验证码不能为空"}]
                },
                //登录加载开关
                loading: false,
                //从定响
                redirect: undefined,
                //注册
                regForm: {
                    username: '',
                    password: '',
                    phone: '',
                    sex: '',
                    school: '',
                    email: '',
                    qq: '',
                    weixin: '',
                    dormitory: '',
                    introduce: '',
                    nickName: '',
                    realName: '',
                    confirmPassword: ''
                },
                //注册规则
                regRules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {validator: validateUserName, trigger: ['blur', 'change']},
                        {min: 3, max: 10, message: '请输入3-10个字符', trigger: ['blur', 'change']},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 12, message: '请输入6-12个字符', trigger: ['blur', 'change']}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: validatePhone, message: '请输入正确的手机号', trigger: ['blur', 'change']}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'}
                    ],
                    school: [
                        {required: true, message: '请输入学校名称', trigger: 'blur'},
                        {min: 4, max: 20, message: '请输入4-20个字符', trigger: ['blur', 'change']}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    qq: [
                        {required: true, message: '请输入qq', trigger: 'blur'},
                        {min: 8, max: 11, message: '请输入正确的qq', trigger: ['blur', 'change']}
                    ],
                    weixin: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'}
                    ],
                    dormitory: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                    ],
                    introduce: [
                        {required: true, message: '请输入简介', trigger: 'blur'},
                        {min: 6, max: 5000, message: '请输入6-5000字符的简介', trigger: 'blur'}
                    ],
                    nickName: [
                        {required: true, message: '请输入用户昵称', trigger: 'blur'},
                    ],
                    realName: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur'},
                        {min: 3, max: 6, message: '请输入正确的名字【3-6字符】', trigger: ['blur', 'change']}
                    ],
                    confirmPassword: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {validator: validateConfirmPassword, trigger: ['blur', 'change']}
                    ]
                }
            };
        },
        /**
         * 监听
         * */
        watch: {
            $route: {
                handler: function (route) {
                    //监听之前的url
                    this.redirect = route.query && route.query.redirect;
                },
                immediate: true
            }
        },

        /**
         *  页面创建执行
         * **/
        created() {
            document.title = '用户登录注册'
            this.getCookie();
            //this.apiGetSexList();
        },
        methods: {
            //获取性别
            apiGetSexList(){
                getDictDataByDictType('user_sex').then(res =>{
                    this.sexList = res.data
                })
            },
            /**
             * 获取登录信息
             */
            getCookie() {
                const username = Cookies.get("username");
                const password = Cookies.get("password");
                const rememberMe = Cookies.get('rememberMe')
                this.loginForm = {
                    username: username === undefined ? this.loginForm.username : username,
                    password: password === undefined ? this.loginForm.password : decrypt(password),
                    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
                };
            },
            /**
             * 登录
             */
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        //记录到cookies
                        if (this.loginForm.rememberMe) {
                            Cookies.set("username", this.loginForm.username, {expires: 30});
                            Cookies.set("password", encrypt(this.loginForm.password), {expires: 30});
                            Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
                        } else {
                            Cookies.remove("username");
                            Cookies.remove("password");
                            Cookies.remove('rememberMe');
                        }
                        this.$store
                            .dispatch("Login", this.loginForm)
                            .then(() => {
                                this.$router.push({path: this.redirect || "/"});
                            })
                            .catch(() => {
                                this.loading = false;
                            });
                    }
                });
            },

            /**
             * 注册
             */
            handleReg() {
                this.open = false
            },
            //第一个
            firstIndex(index) {
                this.index = index + 1
            },
            //第二个下一步
            secondIndex(index) {
                this.index = index + 1
                console.log(this.index)
            },
            firstStep(index) {
                if (index === 0) {
                    return
                }
                this.index = index - 1
            },
            //提交注册
            apiSubmitUser() {
                this.$refs.regForm.validate(val =>{
                    if (!val){
                        this.$message.error('请确认信息是否填写规范')
                        return
                    }
                    request({
                        url: '/reg/user',
                        method: 'post',
                        data: this.regForm
                    }).then(res => {
                        if (res.code !== 200) {
                            this.$message.error(res.msg)
                            return
                        }
                        this.$message.success(res.msg)
                        this.open = true
                    })
                })

            }
        }
    };
</script>

<style lang="less">
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-image: url("../assets/image/login-background.jpg");
        background-size: cover;
    }

    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #707070;
    }

    .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 400px;
        padding: 25px 25px 5px 25px;

        .el-input {
            height: 38px;

            input {
                height: 38px;
            }
        }

        .input-icon {
            height: 39px;
            width: 14px;
            margin-left: 2px;
        }
    }

    .login-tip {
        font-size: 13px;
        text-align: center;
        color: #bfbfbf;
    }

    .login-code {
        width: 33%;
        height: 38px;
        float: right;

        img {
            cursor: pointer;
            vertical-align: middle;
        }
    }

    .el-login-footer {
        height: 40px;
        line-height: 40px;
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: #fff;
        font-family: Arial;
        font-size: 12px;
        letter-spacing: 1px;
    }

    .el-step {
        margin-bottom: 5px;
    }
</style>
