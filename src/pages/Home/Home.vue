<template>
  <div class="home">
    <HeaderYellow/>
    <div class="main">
      <!-- bannar轮播图 -->
      <div class="bannar">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in bannar" :key="item.id">
            <img v-lazy='item.bannar_img'>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 首页商品列表 -->
      <ul class="commodity-item-wrap">
        <li class="commodity-item" v-for="item in computedCategories" 
        :key="item.id">
          <!-- 列表的标题 -->
          <div class="commodity-item-header">
            <span class="commodity-item-title" :style="{color:item.color}">{{item.name}}</span>
            <a href="###">更多&nbsp;&gt;</a>
          </div>
          <!-- 列表的img -->
          <div class="commodity-item-img">
            <img v-lazy="item.category_img">
          </div>
          <!-- 列表的商品 -->
          <ul class="commodity-item-lists">
            <li class="commodity-item-list" v-for="(product,index) in item.products" 
            :key="product.id" v-if="index < 3">
              <router-link tag="div" :to="'/product-item/'+product.id" 
              class="commodity-list-img">
                <img v-lazy="product.imgs.min">
              </router-link>
              <div class="commodity-list-name">{{product.name}}</div>
              <div class="commodity-list-text">
                <p>{{product.unit}}ml</p>
                <p>￥{{product.price}}</p>
                <span class="addCircle" @click="addCart(product)">+</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import HeaderYellow from '@/components/Header-yellow/Header-yellow'
import api from '@/api'
export default {
  data () {
    return {
      bannar: []
    }
  },
  created () {
    //获取bannar
    this.$http.get(api.host + '/bannar')
    .then(res => {
      this.bannar = res.data
    })
  },
  components: {
    HeaderYellow
  },
  computed: {
    computedCategories () {
      return this.$store.state.computedCategories
    },
    //用户信息对象
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    //添加商品到购物车中
    addCart (product) {
      //首先验证是否登录
      if (this.user.id) {
        //用户已经登录或注册了
        //直接将选中的商品添加到购物车中
        this.$store.dispatch('addCart',product)
          .then(res => {
            this.$msg("提示", res.msg)
            //更新或者添加成功后，让num++
            product.num++
          })
      } else {
        //用户没有登录或注册
        this.$msg("提示","未登录，请登录")
          .then(action => {
            this.$router.push('/login')
          })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../styles/var.less');
img[lazy=loading] {
  background: url(../../styles/images/loading.gif) center center no-repeat;
  background-size: 2rem;
}
.bannar{
  height: 14rem;
  img{
    width: 100%;
  }
}
.commodity-item-wrap{
  width: 100%;
}
.commodity-item{
  font-size: 1.2rem;
  width: 100%;
  background-color: #ffffff;
  padding-bottom: 1.2rem;
  margin-bottom: 1.2rem;
}
.commodity-item-header{
  height: 4rem;
  line-height: 5rem;
  overflow: hidden;
}
.commodity-item-title{
  float: left;
  line-height: 1;
  font-size: 1.4rem;
  padding: .2rem 0 0 .6rem;
  margin: 1.3rem 0 0 3%;
  border-left: .8rem solid;
  font-weight: 700;
}
.commodity-item-header >a {
  float: right;
  color: @color-text-gray;
  font-size: 1.2rem;
  padding-right: 1rem;
}
.commodity-item-img{
  width: 95%;
  margin: 0 auto;
  img{
    width: 100%;
    border-radius: 50px;
  }
}
.commodity-item-lists{
  padding-top: 1.2rem;
  width: 100%;
  overflow: hidden;
}
.commodity-item-list{
  position: relative;
  float: left;
  width: 33.333%;
  box-sizing: border-box;
  padding-left: 10px;
  &:nth-child(2){
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
  }
}
.commodity-list-img{
  width: 90%;
  img{
    width: 100%;
  }
}
.commodity-list-name{
  margin-bottom: 2rem;
  text-align: center;
}
.commodity-list-text{
  overflow: hidden;
  p{
    margin-bottom: 0.5rem;
    &:nth-child(2){
      color: @color-text;
    }
    &:nth-child(1){
      color: @color-text-gray;
    }
  }
}
.addCircle{
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.2rem;
  text-align: center;
  border: 1px solid @color-text; 
  color: @color-text;
  border-radius: 50%;
  font-size: 2.4rem;
  position: absolute;
  bottom: 0;
  right: 0.6rem;
}
</style>


