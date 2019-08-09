<template>
    <div class="invite">
          <!-- //顶部 -->
         <Back title="邀友赚钱"/>
         <img src="../../assets/img/inBG.png" alt="" class="bg">
         <div class="intention" @click="intention">填写意向信息 等待工作人员联系<img src="../../assets/img/inJT.png" alt="" class="intention-go"></div>
         <div class="btn">
             <div class="btn-app" @click="toInvite(0)">二维码邀请</div>
             <div class="btn-app" @click="toInvite(1)">分享邀请</div>
         </div>
    </div>
</template>
<script>
import Back from "../../components/Back"
export default {
    name:"invite",
    components:{
       Back
    },
    data(){
        return{
             token:"",
        }
    },
    methods:{
        //邀请和分享按钮
        toInvite(ind){
            console.log("ind",ind)
            if(ind){
                console.log("去分享",ind)
                upgrade.inviteByLink()
            }else{
                console.log("二维码邀请",ind)
                upgrade.inviteByCode()
            }

        },
        //填写意向
        intention(){
            console.log("意向")
            this.$router.push({path:"/rights",query:{token:this.token}})
        }
    },
    created(){
        let token=this.$route.query.token
        this.token=token
    }
}
</script>
<style lang="sass" scoped>

.invite
      width: 100%
      height: auto
      position: relative
      .bg
         width: 100% 
         height: 100%
         margin-top: -0.2rem
      .intention
         position: absolute
         right: 0
         bottom: 1.8rem
         font-size: .34rem
         color: #F7FF17
         display: flex   
         align-items: center
         .intention-go
           width: .47rem
           height: .17rem
           margin: 0 .2rem 0 .12rem
      .btn
         width: 100%
         position: absolute
         bottom: .2rem
         left: 0
         display: flex
         padding: 0 .18rem
         justify-content: space-between
         .btn-app
             width: 3.4rem
             height: 1.12rem
             background-image: url("../../assets/img/inFX.png")
             background-size: cover
             text-align: center
             line-height: 1.12rem
             color: #fff
             font-size: .34rem
</style>

