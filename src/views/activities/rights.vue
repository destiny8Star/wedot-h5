<template>
    <div class="rights">
        <!-- //顶部 -->
        <Back title="服务商权益"/>
        <!-- 顶部、按钮 -->
        <div class="topBar">
              <div class="topBar-item" v-for="item in tarbs" :key="item.name" :class="{selTar:tarIndex==item.id}" @click="selTarb(item.id)">{{item.name}}<div class="itemLine" v-show="item.id==tarIndex"></div></div>
        </div>
        <div class="minadd">
            <!-- 顶部内容 -->
            <div class="minadd-top"><img src="../../assets/img/r-info.png" alt="" class="info">服务商火热招商中</div>
            <div class="minadd-bg">
                <img src="../../assets/img/r-bl.png" alt="" class="minadd-bgb">
                <div class="minadd-bgc">
                       <div class="minadd-bgc-tit"><h3>{{tarbs[tarIndex].name}}</h3><span>{{tarbs[tarIndex].tit}}</span></div>
                       <div class="minadd-bgc-info" v-html="tarbs[tarIndex].des">{{tarbs[tarIndex].des}}</div>
                </div>
             
            </div>
            <!-- 专属权益 -->
            <div class="exclus">
                    <div class="exc-tit"><div class="exc-line"></div>专属特权</div>
                    <div class="exc-imgBox">
                        <div class="exc-item" v-for="(exItem,ind) in tarbs[tarIndex].exc" :key="ind"><img :src="exItem.src" alt="" >{{exItem.name}}</div>
                    </div>
            </div>
            <!-- 零元拿走 -->         
            <div class="adv" @click="$router.push({path:'/freeGet',query:{token:token}})"><img src="../../assets/img/r-jpb.png" alt=""></div>
            <!-- 权益说明 -->
            <div class="infos">
                <div class="exc-tit info-tit"><div class="exc-line"></div>权益说明</div>
                <div class="info-box">
                    <div class="info-item" v-for="(inf,ind) in tarbs[tarIndex].exc" :key="ind">
                        <img :src="inf.timgs" alt="">
                        <div class="info-cont">
                            <div class="info-cont-tit">{{inf.name}}</div>
                             <div class="info-cont-con">{{inf.des}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- //按钮 -->
            <!-- <div class="btn" @click="open()" >{{tarbs[tarIndex].btn}}</div> -->
            <div class="btn" @click="open()" v-show="level==0">{{tarbs[tarIndex].btn}}</div>
            <div class="btn" @click="open()" v-show="level==1&&tarIndex>0">{{tarbs[tarIndex].btn}}</div>
            <div class="btn" @click="open()" v-show="level==2&&tarIndex>1">抢位</div>
        </div> 
    </div>
</template>
<script>
import { Toast } from 'vant'
import Back from '../../components/Back'
export default {
    name:"rights",
    components:{
        Back
    },
    data(){
        return {
            token:"", // 获取token
            level:"", //当前会员等级
            tarIndex:0, //当前选中的tarb    
           tarbs:[
               {
                    name:"买手PLUS",
                    id:"0",
                    tit:"自购省钱，分享赚钱",
                    des:"升级后自购每年预计可省<span>1926</span>元,分享3年能赚一套首付",
                    btn:"开通年卡",
                    exc:[
                        {
                            name:"自购省钱",
                            src:require("../../assets/img/r-zm.png"),
                            des:"消费返利可在平台任意商家无门槛抵扣并享受买手PLUS价。",
                            timgs:require("../../assets/img/r-qm.png"),
                        },
                         {
                            name:"邀请收益",
                            src:require("../../assets/img/r-zy.png"),
                            des:"邀请好友注册永久享受好友所有消费金额的2%佣金。",
                            timgs:require("../../assets/img/r-qs.png"),
                        },
                         {
                            name:"消费返佣",
                            src:require("../../assets/img/r-zx.png"),
                            des:"好友消费可获得奖励。",
                            timgs:require("../../assets/img/r-qf.png"),
                        }
                    ]
                },
                {
                    name:"买手服务商",
                    id:"1",
                    tit:"八大收益，享赚不停",
                    des:"永久享受商铺、用户交易流水佣金，2年轻松赚一套房",
                     btn:"马上升级",
                    exc:[
                        {
                            name:"消费分佣",
                            src:require("../../assets/img/r-zfy.png"),
                            des:"享受旗下所有用户在平台商户消费分红。",
                            timgs:require("../../assets/img/r-qfy.png"),
                        },
                         {
                            name:"升级奖励",
                            src:require("../../assets/img/r-zsj.png"),
                            des:"享受旗下所有用户升级买手PLUS奖励。",
                            timgs:require("../../assets/img/r-qsj.png"),
                        },
                         {
                            name:"推荐佣金",
                            src:require("../../assets/img/r-ztj.png"),
                            des:"享受推荐平级服务商的推荐奖励。",
                            timgs:require("../../assets/img/r-qtj.png"),
                        },
                           {
                            name:"平台分红",
                            src:require("../../assets/img/r-zfh.png"),
                            des:"享受平台收益的分红。",
                            timgs:require("../../assets/img/r-qfh.png"),
                        },
                         {
                            name:"推广补贴",
                            src:require("../../assets/img/r-ztg.png"),
                            des:"服务商推荐商家、用户，最高享受交易流水3.5%佣金。",
                            timgs:require("../../assets/img/r-qtg.png"),
                        },
                         {
                            name:"收款分润",
                            src:require("../../assets/img/r-zfr.png"),
                            des:"享受旗下所有用户收款的交易流水分润。",
                            timgs:require("../../assets/img/r-qfr.png"),
                        }
                    ]
                },
                {
                    name:"区域合伙人",
                    id:"2",
                    tit:"一城一主，区域独享",
                    des:"享受区域内所有交易流水分红，一城一主",
                    btn:"抢位",
                    exc:[
                        {
                            name:"消费分佣",
                            src:require("../../assets/img/r-zfy.png"),
                            des:"享受旗下所有用户在平台商户消费分红。",
                            timgs:require("../../assets/img/r-qfy.png"),
                        },
                         {
                            name:"升级奖励",
                            src:require("../../assets/img/r-zsj.png"),
                            des:"享受旗下所有用户升级买手PLUS奖励。",
                            timgs:require("../../assets/img/r-qsj.png"),
                        },
                         {
                            name:"推荐佣金",
                            src:require("../../assets/img/r-ztj.png"),
                            des:"享受推荐平级服务商的推荐奖励。",
                            timgs:require("../../assets/img/r-qtj.png"),
                        },
                           {
                            name:"区域分红",
                            src:require("../../assets/img/r-zfh.png"),
                            des:"享受平台收益的分红。",
                            timgs:require("../../assets/img/r-qfh.png"),
                        },
                         {
                            name:"推广补贴",
                            src:require("../../assets/img/r-ztg.png"),
                            des:"服务商推荐商家、用户，最高享受交易流水3.5%佣金。",
                            timgs:require("../../assets/img/r-qtg.png"),
                        },
                         {
                            name:"收款分润",
                            src:require("../../assets/img/r-zfr.png"),
                            des:"享受旗下所有用户收款的交易流水分润。",
                            timgs:require("../../assets/img/r-qfr.png"),
                        }
                    ]
                }],
        }
    },
    methods:{
        //选中tarb
        selTarb(id){
              this.tarIndex=id
        },
    
      //点击底部按钮
      open(){
          let id=this.tarIndex
          console.log("id",id)
          id==0?upgrade.upgradeToPlus(): id==1? upgrade.upgradeToService() :upgrade.upgradeToPartner()
      }
    },
    created(){
      
        let token=this.$route.query.token;
        this.token=token
        console.log("token",token)
                 Toast.loading({
                    message: '加载中...',
                    duration:0
                });
           let datas = {
                 token:this.token,
           };
          this.axios.post('/api/zero/getUserLevel', datas).then(res=>{
             Toast.clear()
              console.log("获取",res)
              if(res.data.code==200){
                  this.level= res.data.data
              }else{
                   Toast("网络异常");
              }
        });
    }
}
</script>

<style scoped>

.rights{
    background: #F8F8F8
}
.topBar{
    width: 100%;
    height: .88rem;
    display: flex;
    padding:0 .48rem;
    justify-content: space-between;
    font-size: .3rem;
    color: #909090;
    margin-top: 1rem
}
.topBar-item{
    position: relative;
    line-height: .88rem;
}
.selTar{
    color: #3E3E4D;
    font-weight: bold
}
.itemLine{
    width: .96rem;
    height: .04rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #3E3E4D;
    margin: auto
}
.minadd{
    padding-bottom: .64rem
}
.minadd-top{
    width: 100%;
    height: .64rem;
    background: #3E3E4D;
    display: flex;
    align-items: center;
    padding-left: .46rem;
    font-size: .24rem;
    color: #FDE175
}
.info{
    width: .24rem;
    height: .24rem;
    margin-right: .14rem
}
.minadd-bg{
    position: relative;
}
.minadd-bgb{
    width: 100%;
    height: 2rem;
}
.minadd-bgc{
    width: 6.78rem;
    height: 2.66rem;
    background-image: url("../../assets/img/r-by.png");
    position: absolute;
    top: .32rem;
    left: 0;
    right: 0;
    margin: auto;
    background-size: cover;
    padding-top: .48rem;
    padding: .48rem .24rem 0
}
.minadd-bgc-tit{
    margin-bottom: .4rem;
    color: #3E3E4D;
    display: flex;
    align-items: baseline
}
h3{
    font-size: .48rem;
    margin:0 .15rem;
    font-weight: bold;
}
.minadd-bgc-tit span{
    font-size: .24rem;
    font-weight: bold
}
.minadd-bgc-info{
    display: inline-block;
    padding:0 .2rem;
    height: .62rem;
    background: linear-gradient(90deg,rgba(87,78,58,1) 0%,rgba(39,39,52,1) 100%);
    border-radius: .34rem;
    font-size: .24rem;
    color: #EAD2AE;
    line-height: .62rem;
}
.minadd-bgc-info>>>span{
    color: #FDE175
}
.exclus{
    width: 6.78rem;
    padding:.16rem 0 0.24rem;
    margin:1.22rem auto 0.24rem;
    background: #fff;
    border-radius: .24rem
}
.exc-tit{
    width: 100%;
    padding-left: .4rem;
    font-size: .32rem;
    color: #3E3E4D;
    display: flex;
    align-items: center;
    font-weight: bold;
}
.exc-line{
    width: .08rem;
    height: .32rem;
    background: #FDE175;
    border-radius: 2rem;
    margin-right: .1rem;
}
.exc-imgBox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
}
.exc-item{
    width: 30%;
    font-size: .24rem;
    color: #3E3E4D;
    text-align: center;
    margin-top: .4rem
}
.exc-item img{
   width: .8rem;
   height: .8rem;
   margin: 0 auto .1rem;
   display: block
}
.adv{
    width: 100%;
}
.adv img{
    width: 6.78rem;
    height: 1.9rem;
    margin: 0 auto;
    display: block
}
.infos{
    width: 6.78rem;
    padding:.16rem 0.58rem 0.24rem .4rem;
    margin:0.24rem auto 0.4rem;
    background: #fff;
    border-radius: .24rem
}
.info-tit{
    margin-bottom: 0;
    padding:0
}
.info-box{
    width: 100%;
    padding:.16rem 0 0
}
.info-item{
    width: 100%;
    display: flex;
    align-items: center;
   font-weight: bold;
   margin-bottom: .24rem
}
.info-item img{
    width: 1.08rem;
    height: 1.08rem;
    margin-right: .16rem
}
.info-cont-tit{
   font-size: .32rem;
   color: #3E3E4D;
   margin-bottom: .08rem
}
.info-cont-con{
   font-size: .24rem;
   color: #909090;
}
.btn{
    width: 6.78rem;
    height: .8rem;
    background: #3E3E4D;
    border-radius: .4rem;
    margin:0 auto ;
    font-size: .36rem;
    color: #EAD2AE;
    text-align: center;
    line-height: .8rem;
    font-weight: bold
}
</style>

