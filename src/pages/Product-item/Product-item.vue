<template>
  <div class="product-item">
      <HeaderGray :headerTitle="productInfo.name + productInfo.unit+ 'ml'" back="true"/>
      <div class="main">
        <div class="img-wrap">
          <img v-lazy="productInfo.imgs.big">
        </div>
        <div class="detial-wrap">
          <p class="detial-name">{{productInfo.name}}{{productInfo.unit}}ml</p>
          <p class="detial-price">￥{{productInfo.price}}</p>
        </div>
        <!-- 商品详情 -->
        <div class="product-detial-wrap">
          <div class="product-title">商品详情</div>
          <p class="product-item">品<span class="text-hidden">品牌</span>牌
          <span class="text-hidden">品</span><span class="txt">{{productInfo.brand}}</span></p>
          <p class="product-item">产品规格<span class="text-hidden">品</span><span class="txt">{{productInfo.unit}}ml</span></p>
          <p class="product-item">保质期限<span class="text-hidden">品</span>
          <span class="txt">{{productInfo.expiration_date}}月</span></p>
        </div>
        <!-- 爱鲜蜂背景 -->
        <div class="block">
          <img src="./images/productDetailBg.jpg">
        </div>
        <!-- 详情页添加收藏商品 -->
        <div class="addCollect-wrap">
          <div class="collect active">收藏</div>
          <div class="addProduct">添加商品：
            <div class="btn-wrap">
              <span class="active">-</span>
              <span class="products-list-num">0</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <!-- 购物的车 -->
        <div class="che">
          <div class="cheNum">2</div>
        </div>
      </div>
  </div>
</template>
<script>
import HeaderGray from '@/components/Header-gray/Header-gray'
import api from '@/api'
export default {
  //当组件创建成功的时候执行，切执行一次
  activated () {
    //获取商品的id
    console.log(this.$route.params)
    let productId = this.$route.params.id
    this.$http.get(api.host + '/products/' + productId)
      .then(res => {
        //返回的数据是一个商品对象
        this.productInfo = res.data
        //console.log(res.data)
      })
  },
  data () {
    return {
      productInfo: {
        imgs: {}
      }
    }
  },
  components: {
    HeaderGray
  }
}
</script>
<style lang="less" scoped>
@import url('../../styles/index.less');
  .text-hidden{
    visibility: hidden;
  }
  .img-wrap {
    padding: 1rem;
    background-color: #fff;
    img{
      width: 100%;
    }
  }
  .detial-wrap {
    text-align: center;
    background-color: #fff;
    .detial-name {
      font-size:2.3rem;
      padding: 0 1rem; 
      color: #292d33;
      .no-wrap();
    }
    .detial-price {
      color: #f40;
      padding: 1rem 0 3rem 0;
      font-size: 1.8rem;
      font-weight: 400;
    }
  }
  .product-detial-wrap {
    background-color: #fff;
    padding: 1.5rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    font-size: 1.4rem;
    .product-title{
      margin-bottom: 1.5rem;
      background: url('images/title_bg.png') center center no-repeat;
      text-align: center;
      color: #e0bd6a;
      background-size: auto 0.2rem;
    }
    .product-item{
      height: 3rem;
      line-height: 3rem;
      color: #999999;
      .txt{
        color: #292d33;
      }
    }
  }
  .block {
    margin-bottom: 0.5rem;
    img{
      width: 100%;
      vertical-align: middle;
    }
  }
  .addCollect-wrap{
    position: fixed;
    bottom: 0;
    height: 5rem;
    line-height: 5rem;
    width: 100%;
    padding-left: 1.4rem;
    .collect{
      position: absolute;
      left: 0;
      top: 18%;
      width: 4rem;
      padding-top: 1.8rem;
      line-height: 1.8rem;
      font-size: 1rem;
      text-align: center;
      display: inline-block;
      background: url('./images/favor.png') top center no-repeat;
      background-size: 1.8rem auto;
    }
    .collect.active{
      background-image: url('./images/favor_active.png')
    }
    .addProduct{
      position: relative;
      margin-left: 3rem;
      line-height: 5rem;
      font-size: 1.4rem;
    }
    .btn-wrap{
      position: absolute;
      left: 28%;
      bottom: 0rem;
      width: 9rem;
      height:5rem;
      line-height: 6rem;
      span:nth-child(2n+1){
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.2rem;
        text-align: center;
        border: 1px solid lightgray;
        color: #f40;
        border-radius: 50%;
        font-size: 2.4rem;
      }
      span:nth-child(2n+1).active{
        border-color: #f40;
      }
      span:nth-child(2){
        display: inline-block;
        width: 2rem;
        height: 3rem;
        line-height: 2.5rem;
        text-align: center;
      }
    }
  }
  .che{
    position: fixed;
    right: 0.6rem;
    bottom: 0.7rem;
    width: 5.4rem;
    height: 5.4rem;
    border-radius: 50%;
    border: 0.3rem solid #ffffff;
    z-index: 4;
    background: url('./images/che.png') center center no-repeat;
    background-size: 80%;
    background-color: #ffd600;
    .cheNum{
      position: absolute;
      right: 0;
      width: 1.8rem;
      border-radius: 50%;
      line-height: 1.8rem;
      text-align: center;
      font-size: 1rem;
      color: #fff;
      background-color: #f40;

      //display: none;
    }
  }
</style>


