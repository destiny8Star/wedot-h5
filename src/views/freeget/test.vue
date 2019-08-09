<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <div class="tessss" v-for="(item,ind) in list"
                :key="ind"
                :title="item">　潘森夺斯之后，参与了封印剑魔斯的战争，原本的争星争中死去，而阿魂回归，他保留了凡与躯，但是他却他能够的神力，于是阿成为了新的星灵，并继潘森名号。</div>
        </van-list>
    </div>
</template>
<script>
  import {List} from 'vant';
  import 'vant/lib/list/style';
export default {
    components: {
        [List.name]: List
    },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },

  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true;
        }
      }, 500);
    }
  }
}  
</script>
<style scoped>
.tessss{
  width:100%;
  height:1rem ;
  text-align: center;
  margin:.1rem 0;
  background: #8d8232
}
</style>

