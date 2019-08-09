<template>
    <div class="what">
        <Back title="何为服务商"/>
        <div class="wimg1"><img src="../../assets/img/whatBJ.png" alt=""></div>
        <div class="wimg1"><img src="../../assets/img/whatBJ2.png" alt=""></div>
        <div class="wbtn" @click="$router.push({path:'/rights',query:{token:token}})">去升级服务商<img src="../../assets/img/whatJT.png" alt=""></div>  
    </div>
</template>
<script>
import Back from '../../components/Back'
export default {
    name:"whatSer",
    components:{
        Back
    },
    data(){
        return{
            token:"",
        }
    },
    created(){
        let token=this.$route.query.token;
        this.token=token
    }
}
</script>
<style scoped>
.what{
    width: 100%;
    position: relative;
    padding-top: 1rem
}
.wimg1 img{
   width: 100%;
   height: auto;
}
.wbtn{
    width: 100%;
    height: 1.34rem;
    background-image: url('../../assets/img/whatBtn.png');
    background-size: cover;
    font-size: .42rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
}
.wbtn img{
    width: .46rem;
    height: .17rem;
    margin-left: .15rem
}
</style>


