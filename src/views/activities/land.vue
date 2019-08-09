<template>
    <div class="land">
         <!-- <Back title="分享赚钱"/> -->
        <img src="../../assets/img/lan-bj.png" alt="" class="land-bg">
        <div class="land-cont">
            <img src="../../assets/img/lan-BD.png" alt="" class="land-cont-bg">
            <!-- //注册 -->
            <div class="cont-box" v-if="states==0">
                 <h3 class="cont-tit"><img src="../../assets/img/lan-DZ.png" alt="" class="cont-tit-imgl"> 狂砸5个亿打市场 <img src="../../assets/img/lan-DZ.png" alt="" class="cont-tit-img"></h3>
                 <div class="cont-victit">我们老板 真的疯了</div>
                 <div class="cont-phone">
                     <img src="../../assets/img/SJ.png" alt="" class="phone-icon">
                     <input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号码">
                 </div>
                  <div class="cont-phone cont-code">
                     <img src="../../assets/img/YZM.png" alt="" class="phone-icon">
                     <input type="number" maxlength="6" v-model="code" placeholder="请输入验证码">
                     <button class="btn-code" @click="getCode" :class="{codeAct:codeBtn!=='获取验证码'}" :disabled="disabled">{{codeBtn}}</button>
                 </div>
                  <!-- <div class="rule">
                    <img @click="agree =!agree" v-show="!agree" src="../../assets/img/yuan.png" alt="">
                    <img @click="agree =!agree" v-show='agree' src="../../assets/img/yuan_h.png" alt="">
                    <p>我同意&nbsp;<span @click="$router.push('/protocol')">《用户服务协议》</span></p>
                </div> -->
                <div class="cont-btn" @click="signIn">注册赚佣金</div>
                <div class="cont-add">您的好友{{friendPhone}}邀请您加入微点</div>
            </div>
            <!-- //注册后下载 -->
            <div class="cont-box" v-else-if="states==1">
                 <div class="logo-box">
                     <img src="../../assets/img/inlogo.png" alt="" class="logo-img">
                     微点零售
                 </div>
                 <div class="logo-anbtn" @click="downloadAPP(0)">安卓手机下载</div>
                  <div class="logo-anbtn logo-iosbtn" @click="downloadAPP(1)">苹果手机下载</div>
                <div class="cont-add">您的好友{{friendPhone}}邀请您加入微点</div>
            </div>
            <!-- //注册过的页面 -->
            <div class="cont-box" v-else-if="states==2">
                 <div class="info">
                     <div class="info-tit">您之前已经注册过</div>
                     <div class="info-tit">赶紧下载app一起赚钱！</div>
                 </div>
                 <div class="logo-anbtn" @click="downloadAPP(0)">安卓手机下载</div>
                  <div class="logo-anbtn logo-iosbtn" @click="downloadAPP(1)">苹果手机下载</div>
                <div class="cont-add">您的好友{{friendPhone}}邀请您加入微点</div>
            </div>
        </div>
    </div>
</template>
<script>
 import { Toast } from 'vant';
 import Back from '../../components/Back'
  var reg = /^1\d{10}$/;
export default {
    name:"land",
    components:{
        Back
    },
    data(){
        return{
        //   agree:true, //是否同意协议，，默认同意
          phone:"", //输入手机号
          code:"", //输入code
          codeBtn:"获取验证码", //默认获取验证码按钮 
          time:"", //倒计时
          disabled:false, //禁止重复点击
          states:"0", //默认显示模块
          mobile: '',//二维码附带手机号
          inviteCode: '',//二维码附带邀请码
          friendPhone: '',//好友手机号
        }
    },
    methods:{
            //获取验证码
            getCode:function(){
                console.log("sss")
                if(this.phone==''){
                    Toast("请输入手机号");
                    return false;
                }
                if(!reg.test(this.phone)){
                    Toast("请输入正确的手机号");
                    return false;
                }
                this.time = 60;
                this.disabled=true;
                this.timer();
                let postData = {
                    "mobile": this.phone,
                };
                this.axios.post('/api/user/smsCodeH5',postData).then(res=>{
                    console.log(res);
                    if(res.data.code==200){
                        Toast('发送成功');
                        // this.code = res.data.data;
                    }else {
                        Toast(res.data.message);
                    }
                });
            },
               //注册
            signIn(){
                if(this.phone==''){
                    Toast("请输入手机号");
                    return false;
                }
                if(!reg.test(this.phone)){
                    Toast("请输入正确的手机号");
                    return false;
                }
                if(this.code==''){
                    Toast("请输入验证码");
                    return false;
                }
             
                let postData = {
                    "mobile": this.phone,
                    "mobileAuthCode": this.code,
                    "invationCode": this.inviteCode,
                };
                this.axios.post('/api/user/h5InviteFriendRegister',postData).then(res=>{
                    console.log(res);
                    if(res.data.code==200){
                        Toast('注册成功');
                    }else if(res.data.code==6006){
                        Toast('该账号已注册');
                        this.state = false;
                    }else {
                        Toast(res.data.message);
                    }
                });
            },
            //封装一个函数，获取验证码部分：60s 或 重新发送
            timer:function (){
                if (this.time > 0) {
                    this.time --;
                    this.codeBtn = this.time+"s后重新获取";
                    setTimeout(this.timer,1000);
                } else{
                    this.time = 0;
                    this.codeBtn = "获取验证码";
                    this.disabled = false;
                }
            },
            downloadAPP(types){
                  if(types){
                    console.log('iosAPP');
                    // window.location.href = url
                }else {
                    console.log('安卓APP');
                    // window.location.href = url
                }

            }
    },
       created(){
            this.mobile = this.$route.query.mobile;
            this.inviteCode = this.$route.query.code;
            this.states = this.$route.query.states||0;
             console.log(this.mobile,this.states)
            // 判断手机号是否经过保密处理，而后赋值渲染页面
            if(!reg.test(this.mobile)){
                this.friendPhone = this.mobile;
            }else {
                this.friendPhone = this.mobile.substr(0,3) + "****" + this.mobile.substr(7);
            }


        }
}

</script>
<style scoped>
.land{
    width: 100%;
    position: relative;
  }
.land-bg{
    width: 100%;
    height: 100%;
}  
.land-cont{
    width: 100%;
    position: absolute;
    top: 6.3rem;
    left: 0;
}
.land-cont-bg{
   width:  100%;
   height: 6.41rem
}
.cont-box{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: .5rem
}
.cont-tit{
    width: 4.5rem;
    position: relative;
    font-size: .48rem;
    color: #FF6A67;
    margin: 0 auto;
    text-align: center;
    font-weight: bold
}
.cont-tit-imgl,.cont-tit-img{
    width: .37rem;
    height: .52rem;
    position: absolute;
    right:0;
    bottom: -.1rem;
}
.cont-tit-imgl{
    left:0;
    transform:rotateY(180deg)

}
.cont-victit{
  text-align: center;
  font-size: .26rem;
  color: #FF6A67;
  margin:.1rem 0 .25rem
}
.cont-phone{
    width: 6.18rem;
    padding:.23rem .4rem;
    margin:0 auto .3rem;
    background:rgba(245,245,245,1);
    border-radius:.41rem;
    display: flex;
    align-items: center
}
.cont-code{
    margin-bottom: .2rem;
    padding:0 .4rem
}

.phone-icon{
    width: .38rem;
    height: .38rem;
}
 input{
    width: 3.02rem;
    padding-left: .17rem;
    color: #3E3E4D;
    font-size: .32rem
 }
 input::-webkit-input-placeholder{
     color: #ccc
 }
 input::-moz-placeholder{
     color:#ccc
 }
 input:-ms-input-placeholder{
     color: #ccc
 }
 .btn-code{
     width: 1.94rem;
     height: .84rem;
     background-image: url("../../assets/img/lan-HQ.png");
     background-size: cover;
     text-align: center;
     line-height: .84rem;
     color: #fff;
     border-radius: .28rem;
 }
 .codeAct{
    color: #909090
}
 .rule{
      font-size: .24rem;
      color: #909090;
      display: flex;
      align-items: center;
      justify-content: center
 }
 .rule img{
     width: .2rem;
     height: .2rem;
     margin-right: .1rem
 }
 .rule span{
     color: #01A1FF
 }
 .cont-btn{
    width: 5.62rem;
    height: 1.11rem;
    background-image: url("../../assets/img/lan-AN.png");
    background-size: cover;
    margin: .3rem  auto .2rem;
    text-align: center;
    line-height: 1.11rem;
    font-size: .32rem;
    color: #fff
 }
 .cont-add{
     font-size: .28rem;
     color: #3E3E4D;
     text-align: center
 }
 .logo-box{
     font-size: .48rem;
     color: #FB2C53;
     text-align: center;
     margin:0 0 .3rem
 }
 .logo-img{
     margin: 0 auto;
     width: 1.54rem;
     height: 1.54rem;
     display: block
 }
 .logo-anbtn{
    width: 5.62rem;
    height: 1.11rem;
    background-image: url("../../assets/img/lan-AN.png");
    background-size: cover;
    margin: 0 auto .2rem;
    text-align: center;
    line-height: 1.11rem;
    font-size: .32rem;
    color: #fff
 }
 /* .logo-iosbtn{
     margin-bottom: .35rem
 } */
 .info{
     margin:.3rem 0 .8rem;
 }
 .info-tit{
     font-size: .48rem;
     color: #3E3E4D;
     text-align: center;
 }
</style>


