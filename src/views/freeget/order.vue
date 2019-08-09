<template>
    <div class="order">
           <!-- //顶部 -->
        <Back title="零元订单"/>
        <!-- //title -->
        <div :class="islack?'tit':'tits'">意向商品会在助力成功后72小时内发货如有质量问题请联系客服</div>
        <!-- 无内容 -->
        <div class="lack" v-if="islack">
            <img src="../../assets/img/free/WDD.png" alt="">
            您还没有商品订单快去升级，每月都可获得0元商品
        </div>
        <!-- 有内容  -->
        <div class="contbox" v-else>
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <div class="item" v-for="(item,ind) in infos" :key="ind">
                <div class="item-top"><span class="top-name">{{item.recipient}}</span><span class="top-phone">{{item.tel}}</span></div>
                <div class="item-address">{{item.address}}</div>
                <div class="item-good">
                    <img :src="item.goodsUrl" alt="">
                    <div class="good-right">
                         <div class="good-right-tit">{{item.goodsName}}</div>
                         <div class="good-right-zl">4个新好友助力即可免费领</div>
                         <div class="good-right-price">原价:￥<span class="price-num">{{item.price}}</span></div>
                    </div>
                </div>
                <div class="item-time">
                    <div class="time-tit">发起时间</div>
                    <div class="time-num">{{item.createTime | fileTime}}</div>
                </div>
                <div class="item-time">
                    <div class="time-tit">获得新粉丝助力</div>
                    <div class="zl-num">{{item.helpNum}}人</div>
                </div>
                 <div class="item-time">
                    <div class="time-tit">订单状态</div>
                    <div class="status-success" v-if="item.status==0">进行中</div>
                    <div class="status-fail" v-else-if="item.status==1">助力失败</div>
                    <div class="status-fail" v-else-if="item.status==2&&item.orderStatus==0">助力成功</div>
                    <div class="status-fail" v-else-if="item.orderStatus==1">已经发货</div>
                </div>
            </div>
            </van-list>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
import { List } from 'vant';
import Back from '../../components/Back'
import 'vant/lib/list/style';
export default {
    name:"order",
    components: {
       [List.name]: List,
       Back
    },
    data(){
        return{
            islack:true, //是否显示缺省页:   显示：ture
            page:1,//页码
            token:"", 
            //数据
            infos:[],
            loading: false,
            finished: false
        }
    },
    filters:{
          fileTime(times){
             return times.slice(0,-2)
          }
    },
    methods:{
        onLoad(){
                Toast.loading({
                    message: '加载中...',
                    duration:0
                });
           let datas = {
                 token:this.token,
                 cursor:this.page,
                 size:"10"
           };
        this.axios.post('/api/zeroUserBuy/zeroOrder', datas).then(res=>{
             Toast.clear()
              console.log("获取",res)
              if(res.data.code==200){
                 this.loading = false;//  加载状态结束
                if(res.data.data.length>0){
                    this.page++
                    this.islack=false
                   this.infos=this.infos.concat(res.data.data)
                }else{
                    this.finished = true;// 数据全部加载完成
                }
              }else{
                   Toast("网络异常");
              }
           });
        },
      
    },
    created(){
        let token=localStorage.getItem("token")
        this.token=token
        this.onLoad()
    }
}
</script>
<style scoped>
.order{
    background: #F8F8F8
}

.tit,.tits{
    width: 100%;
    height: .54rem;
    font-size: .24rem;
    color: #3E3E4D;
    font-weight: bold;
    text-align: center;
    line-height: .54rem;
    margin-top: 1rem
}
.tits{
    color: #D27D3C;
    background: #F9F7DB;
}
.lack{
    width: 100%;
    margin-top: 1.7rem;
    font-size: .28rem;
    color: #909090;
    text-align: center
}
.lack img{
    width:3.76rem;
    height: 3.62rem;
    display: block;
    margin: 0 auto .34rem;
}
.contbox{
    width: 100%;
    padding:.26rem .28rem
}
.item{
    width: 100%;
    border-radius: .16rem;
    background: #fff;
    padding:.32rem .26rem;
    margin-bottom: .36rem
}
.item-top{
    display: flex;
    align-items: center;
    margin-bottom: .1rem
}
.top-name{
    font-size: .28rem;
    color:#3E3E4D;
    margin-right: .24rem
}
.top-phone{
    font-size: .28rem;
    color:#909090;
}
.item-address{
    font-size: .28rem;
    color: #3E3E4D;
    margin-bottom: .2rem
}
.item-good{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between
}
.item-good img{
    width: 1.62rem;
    height: 1.62rem;
    border-radius: .04rem
}
.good-right{
    width: 4.48rem;
}
.good-right-tit{
    width: 100%;
    font-size: .28rem;
    color: #3E3E4D;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-weight: bold;
    margin-bottom: .1rem
}
.good-right-zl{
    font-size: .24rem;
    color: #909090;
    margin-bottom: .06rem
}
.good-right-price{
    font-weight: bold;
    font-size: .24rem;
    color: #3E3E4D
}
.price-num{
    font-size: .28rem
}
.item-time{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #3E3E4D;
    font-size: .24rem;
    margin-top: .25rem
}
.time-num{
    font-size: .28rem
}
.zl-num,.status-success,.status-fail{
    font-size: .28rem;
    font-weight: bold
}
.status-success{
    color: #14ACEF
}
.status-fail{
     color: #FC2C54
}
</style>


