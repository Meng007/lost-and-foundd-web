<template>
<div style="height: 100%">
  <!-- 上部内容 -->
  <div class="my-top">
    <div class="my-lb">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in url" :key="item">
        <router-link to="https://www.baidu.com">
          <el-image :src="item"></el-image>
        </router-link>
        </el-carousel-item>
      </el-carousel>
      <h3 class="lb-title">我的梦</h3>
    </div>
    <div class="my-right">
      <ul>
        <li>
          <span>1</span>
          github官方地址 - GitHub · GitHub
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "Index",
  data(){
  return{
    url:[
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3077468642,283228861&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2937282285,2194795818&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3494504637,435273751&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3835571701,132777933&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1652776056,2910704525&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2723402121,2325411329&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3759109446,2227863324&fm=26&gp=0.jpg'
    ]
  }
  }

}
</script>

<style scoped lang="less">
  .my-top{
    display: flex;
    justify-content: space-between;
    padding: 40px;

    .my-lb{
      position: relative;
      width: 650px;
      height: 310.5px;

      .lb-title{
        position: absolute;
        bottom: 10px;
        color: white;
        cursor: pointer;
        text-align: center;
        right: 50%;
        margin-left: -50% ;
        background-color: #707070;
        border-radius: 5px;
        padding: 2px;
        z-index: 9999;
      }
    }
  }
  .my-right{
    width: 100%;
    /*border: solid 1px red;*/
    ul{

      li{
        list-style: none;
      }
    }
  }
</style>