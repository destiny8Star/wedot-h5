<template>
    <div class="free">
        <!-- //顶部 -->
        <div class="free-top">
            <img src="../../assets/img/free/FH.png" alt="" @click="goBacks">
             免费专区
            <router-link to="/order"><span class="free-top-tit">0元订单</span></router-link>
            <!-- <span @click="$router.push({path:'/order', query:{token:token}})" class="free-top-tit">0元订单</span> -->
        </div>
        <!-- //商品内容 -->
        <div class="free-cont">
            <img src="../../assets/img/free/BJ.png" alt="" class="top-img">
            <div class="free-con">
                   <div class="free-item" v-for="item in isButList" :key="item.id">
                       <img :src="item.url" alt="" class="free-item-le">
                       <div class="free-item-right">
                            <div class="free-line"></div>
                            <div class="free-line-tit">{{item.goodsTitle}}</div>
                            <div class="free-item-price">原价：￥<span>{{item.price}}</span></div>
                            <div class="free-item-info">4个好友助力可免费领</div>
                            <div class="free-btn free-btny" @click="isGet(item.id,item.goodsTitle)">正在领取中<img src="../../assets/img/free/LQZ.png" alt=""></div>
                       </div>
                   </div>
                   <div class="free-item" v-for="item in list" :key="item.id">
                       <img :src="item.url" alt="" class="free-item-le">
                       <div class="free-item-right">
                            <div class="free-line"></div>
                            <div class="free-line-tit">{{item.goodsTitle}}</div>
                            <div class="free-item-price">原价：￥<span>{{item.price}}</span></div>
                            <div class="free-item-info">4个好友助力可免费领</div>
                             <div class="free-btn free-btnb" @click="wantGet(item.id,item.goodsTitle)">我要免费领<img src="../../assets/img/free/JT.png" alt=""></div>
                       </div>
                   </div>
            </div>
        </div>
        <!-- //弹框 -->
        <div class="mask" v-show="maskShow==1">
            <!-- //填写地址 -->
            <div class="mask maska" @click="maskShow=0,addMH=0" v-show="addMH==1">
             </div>
              <div class="address" v-show="addstatus==0">
                    <div class="add-tit">填写收货地址-免费领</div>
                    <div class="inp-name">收货人：<input type="text" class="aname" v-model="aname" placeholder="姓名"></div>
                    <div class="inp-name">手机号：<input type="number" class="aname" v-model="aphone" placeholder="号码"></div>
                    <div class="inp-are">详细收货地址：<textarea class="area" placeholder="地址" rows="3" v-model="area"></textarea></div>
                    <div class="add-btn"  @click="sureAdd">确认收货地址</div>
                </div>
             <!-- //确认地址 -->
             <div class="sureadd" v-show="addstatus==1">
                  <div class="add-tit">确认收货地址</div>
                  <div class="add-cont">
                      <div class="add-np"><span>{{this.aname}}</span> &nbsp;<span>{{this.aphone}}</span></div>
                      <div class="add-adr">{{this.area}}</div>
                  </div>
                  <div class="add-btnbox">
                      <div class="q-btn" @click="toCancel">返回</div>
                      <div class="s-btn" @click="toShare">确认</div>
                  </div>
             </div>
             <!-- 去分享 -->
             <div class="toshare" v-show="showShare==1">
                <div class="sharebg">
                    <div class="sharebg-tit">只要获得4个新粉丝帮忙助力即可免费领!</div>
                    <div class="share-btn">
                        <div class="sf-btn" @click="shareHandler(0)"><img src="../../assets/img/free/WX.png" alt="">分享至好友</div>
                        <div class="sf-btn" @click="shareHandler(1)"><img src="../../assets/img/free/PYQ.png" alt="">分享朋友圈</div>
                    </div>
                </div>
                <div class="q-share" @click="maskShow=0;addstatus=0;showShare=0"><img src="../../assets/img/free/GB.png" alt=""></div>
             </div>
        </div>
    </div>
</template>
<script>
 import { Toast } from 'vant'
export default {
  name:"free",
  data(){
      return {
          aname:"",
          aphone:"",
          area:"",
          addstatus:"0", //是否填写了地址0:没填写.1:填写完成
          maskShow:"0",//是否显示mask  0:不显示
          addMH:"0", //是否显示填写地址的mask 0:"不显示"
          showShare:"0", //显示去分享 0:不显示  1:显示
          isButList:[],//正在领取的商品列表
          list:[],//商品列表
        //   token:"eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.i_zELAzLcfgdMx_KDVuXK7Hc9X25ojPzFm4eKSEPJxu2Z6FQRmtw8w.inJ639qDt7SUGKvYC6XoNQ.vuotQ6ecl8LLNk0ctsBtASST-W3pnVIT0mDU8-A0jwhOIbkbXNz1EYhx_mosn-D6XeRflNrljmODHiWZ_RyEmM-8p2ysOwbrskrGbOJELs0.BiWgWkxiS2oZ18nacHwsYg",
          token:"",
          zeroId:"", //点击的商品id
          gname:"", //分享商品name
          zeroUserId:"", //分享订单id
      }
  },
  methods:{
      //我要免费领,先判断是否是plus
      wantGet(id,gname){
            Toast.loading({
                message: '加载中...',
                duration:0
                });
            let datas={
                token:this.token
            }
             this.axios.post('/api/zero/checkIsPlus', datas).then(res=>{
              console.log("获取",res)
              Toast.clear()
              if(res.data.code==200){
                 return true
              }else{
                   Toast(res.data.message);
                   return false
              }
        }).then(
            res=>{
                if(res){
                    this.maskShow=1; this.addMH=1; this.zeroId=id,this.gname=gname
                }
            }
        )
        //   
      },
      //初始化信息
      init(){
              Toast.loading({
                    message: '加载中...',
                    duration:0
                });
            let datas = {
                    token:this.token
            };
            this.axios.post('/api/zero/zeroBuyHome', datas).then(res=>{
              console.log("获取",res)
              Toast.clear()
                if(res.data.code==200){
                    this.isButList=res.data.data.zeroGoodsIsBuyRespList;
                    this.list=res.data.data.zeroGoodsResps//商品列表
                }else{
                    Toast("网络异常");
                 }
              });
      },
      //确认收货地址
      sureAdd(){
          let name=this.aname;
          let phone=this.aphone;
          let area=this.area;
          let reg=/^1\d{10}$/
          if(!(name&&phone&&area)){
              Toast('请填写完整');
              return
          }
          
          if(name.length>5){
              Toast('名字过长');
              return 
          }
          if(!reg.test(phone)){
              Toast('请输入正确手机号');
              return
          }
          this. addstatus=1
          this.addMH=0
          console.log("na",name.length,phone)
      },
      //确认地址
      toShare(){
       
         Toast.loading({
                message: '加载中...',
                duration:0
                });
        let name=this.aname;
        let phone=this.aphone;
        let area=this.area;
        let zeroId=this.zeroId
        let datas = {
                 token:this.token,
                 zeroId:zeroId,
                 realName:name,
                 mobile:phone,
                 addressDetail:area,
        };
        this.axios.post('/api/zero/buyGoods', datas).then(res=>{
              console.log("确认收货地址",res)
              Toast.clear()
              if(res.data.code==200){
                //   userId: "4c6295a3d8af4623becb469d98054858"   这里获取到两个参数，传递给app
                //   zeroUserId: 4 this.zeroUserId=res.data 
                 this.zeroUserId=res.data.zeroUserId          
                 this.addstatus=2
                 this.showShare=1
                 return true
              }else{
                  this.addstatus=0
                  this.maskShow=0
                   Toast(res.data.message);
                   return false
              }
        }).then(res=>{
            if(res){
                console.log("res",res,this)
                  this.init()
            }
        });
      },
      //取消
      toCancel(){
          this.addstatus=0
          this.addMH=1
      },
      //返回
      goBacks(){
        upgrade.goBack()
      },
      //正在领取中
      isGet(id,gname){
         this.maskShow=1;this.zeroUserId=id;this.showShare=1;this.addstatus=2;this.gname=gname
      },
      //分享
      shareHandler(type){
          let datas={
              zeroUserId:this.zeroUserId,
              token:this.token
          }
          this.axios.post('/api/zero/getGoodsShareUrl', datas).then(res=>{
              console.log("获取",res)
              Toast.clear()
              if(res.data.code==200){
                    this.maskShow=0;this.addstatus=0;this.showShare=0
                    let title="0元商品月月拿"
                    let content=this.gname
                    let url=res.data.data
                 
                    type==0?upgrade.toFriend(title,content,url):upgrade.toSquare(title,content,url)
                
              }else{
                 Toast(res.message)
              }
             
        })
      }
  } ,
  created(){
           let token=this.$route.query.token
           localStorage.setItem("token",token)
           this.token=token
           this.init()
  }   
}
</script>
<style scoped>

.free{
       min-height: 100vh;
       background: #E95554;
       padding-top: 1rem
}
.free-top{
    width: 100%;
    height: 1rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
     font-size: .34rem;
    color: #3E3E4D;
    position: fixed;
    top: 0;
    left: 0;
}
.free-top img{
    width: .32rem;
    height: .32rem;
    margin-left: .5rem
}
.free-top-tit{
   font-size: .3rem;
   color: #E95554;
   margin-right: .36rem;
   font-weight: bold
}
.free-cont{
    background: #E95554;
    
}
.top-img{
    width: 100%;
    height: 5.72rem;
}
.free-con{
    width:100%;
    padding:.2rem .34rem .3rem .39rem
}
.free-item{
    width: 6.77rem;
    height: 4.2rem;
    background-image: url("../../assets/img/free/KUANG.png");
    background-size: cover;
    padding:.76rem .45rem .62rem .53rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .2rem
}
.free-item-le{
    width: 2.82rem;
    height: 2.82rem;
    border-radius: .07rem
}
.free-item-right{
    width: 2.63rem;
    color: #fff
}
.free-line{
    width: .34rem;
    height: .04rem;
    background: #fff;
    border-radius: .01rem;
    margin-bottom: .1rem
}
.free-line-tit{
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: .38rem;
    margin-bottom: .2rem
}
.free-item-price{
    font-size: .21rem
}
.free-item-price span{
    font-size: .32rem;
    font-weight: bold
}
.free-item-info{
    font-size: .21rem;
    margin:.1rem 0
}
.free-btn{
    width: 2.24rem;
    height: .46rem;
    background-size: cover;
    text-align: center;
    line-height: .46rem;
    font-size: .28rem
}
.free-btny{
    background-image: url("../../assets/img/free/AN.png");
}
.free-btny img{
   width: .35rem;
   height: .15rem;
   margin-left: .1rem
}
.free-btnb{
     background-image: url("../../assets/img/free/AN-Z.png"); 
}
.free-btnb img{
    width: .22rem;
    height: .22rem;
    margin-left: .1rem
}
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
}
.maska{
    background: rgba(0, 0, 0, .1)
}
.address{
    width: 100%;
    padding: .24rem .64rem .5rem;
    background: #FA4252;
    position: absolute;
    left: 0;
    bottom: 0
}
.add-tit{
    font-size: .36rem;
    color:#fff;
    text-align: center;
    margin-bottom: .3rem
}
.inp-name{
    width: 100%;
    height: .9rem;
    background: #fff;
    border-radius: .06rem;
    padding-left: .3rem;
    display: flex;
    align-items: center;
    font-size: .32rem;
    color: #3E3E4D;
    font-weight: bold;
    margin-bottom: .3rem
}
.aname{
    font-size: .3rem;
}
.aname::-webkit-input-placeholder {
    color: #909090;
    font-weight: normal
}

.aname::-moz-placeholder {
    color: #909090;
    font-weight: normal
}

.aname:-ms-input-placeholder {
    color: #909090;
    font-weight: normal
}
.inp-are{
    width: 100%;
    height: 2.12rem;
    background: #fff;
    padding: .3rem .3rem .05rem;
    font-size: .32rem;
    color: #3E3E4D;
    font-weight: bold;
    margin-bottom: .3rem
}
.area{
        margin-top: .1rem;
    width: 100%;
    font-size: .3rem;
}
.area::-webkit-input-placeholder {
    color: #909090;
    font-weight: normal
}

.area::-moz-placeholder {
    color: #909090;
    font-weight: normal
}

.area:-ms-input-placeholder {
    color: #909090;
    font-weight: normal
}
.add-btn{
    width: 100%;
    height: .9rem;
    background: linear-gradient(0deg,rgba(252,219,39,1),rgba(251,228,105,1));
    border-radius:.06rem;
    text-align: center;
    line-height: .9rem;
    font-size: .36rem;
    color: #7F4E03
}
.sureadd{
    width: 6.22rem;
    height: 4.26rem;
    padding:.4rem .52rem 0;
    background: #FA4252;
    border-radius: .2rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto
}
.add-cont{
     width:100%;
    height:1.80rem;
    background:rgba(255,255,255,1);
    box-shadow:0 0 .20rem 0 rgba(250,66,82,1);
    border-radius:.06rem;
    margin-bottom: .3rem;
    padding:.3rem;
    font-size: .26rem;
    color: #3E3E4D
}
.add-np{
    margin-bottom: .1rem
}
.add-btnbox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .26rem;
    color: #7F4E03;
    text-align: center;
    line-height: .64rem
}
.q-btn,.s-btn{
    width: 2.4rem;
    height: .64rem;
    background-image: url("../../assets/img/free/QX.png");
    background-size: cover;
}
.s-btn{
  background-image: url("../../assets/img/free/QR.png");  
}
.toshare{
    width: 100%;
    height: 5.5rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    margin: auto;
}
.sharebg{
    width: 5.54rem;
    height: 4.63rem;
    background-image: url("../../assets/img/free/sBJ.png");
    margin: 0 auto;
    background-size: cover;
    padding-top: 1.7rem;
    color: #fff
}
.sharebg-tit{
    width: 3.6rem;
    text-align: center;
    font-size: .32rem;
    margin: 0 auto .5rem
}
.share-btn{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    font-size: .28rem;
    padding:0 .8rem
}
.sf-btn img{
    width: .76rem;
    height: .76rem;
    display: block;
    margin: 0 auto .1rem;
}
.q-share{
    width: .41rem;
    height: .41rem;
    margin:.4rem auto 0
}
.q-share img{
    width: .41rem;
    height: .41rem;
}
.add-adr{
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
</style>


