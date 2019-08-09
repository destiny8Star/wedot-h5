<template>
       <div class="top">
            <img src="../assets/img/free/FH.png" alt=""  @click="goBacks">
             {{title}}
             <div></div>
        </div>
</template>
<script>
export default {
    name:"back",
    data(){
        return{

        }
    },
    props:{
      title:String
    },
    methods:{
      //返回
      goBacks(){
        upgrade.goBack()
      },
    }
}
</script>
<style scoped>
.top{
    width: 100%;
    height: 1rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
     font-size: .34rem;
    color: #3E3E4D;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
}
.top img{
    width: .32rem;
    height: .32rem;
    margin-left: .5rem;
    position: absolute;
    left: 0;
}
</style>


