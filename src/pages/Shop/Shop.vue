<template>
  <div class="shop">
    <HeaderYellow/>
    <div class="main">
      <!-- 主体左边的列表 -->
      <div class="main-left-wrap">
        <ul>
          <li v-for="(item,index) in computedCategories" :key="item.index" 
          :class="{active:activeCategory === index}" @click="changeActiveCategory(index)">
          <span :class="{active:activeCategory === index}"></span>{{item.name}}</li>
        </ul>
      </div>
      <!-- 主体的右边 -->
      <div class="main-right-wrap">
        <div class="main-right-title-wrap">
          <ul class="main-right-title">
            <li @click="changeAllCategories" :class="{'active':allCategories}">{{activeCid}}&nbsp;<span>&nbsp;</span></li>
            <li :class="{'active':sortSh}" @click="changeSortSh">{{sortType}}&nbsp;<span>&nbsp;</span></li>
          </ul>
          <!-- 全部分类的内容 -->
          <ul class="main-right-title-text" v-show="allCategories">
            <li :class="{'active':activeCid === '全部分类'}" 
            @click="changeActiveCid('全部分类','all')">全部分类</li>
            <li v-for="(item, index) in computedCategories[activeCategory].cids" 
            :key="item.index" :class="{'active':activeCid === item.name}" 
            @click="changeActiveCid(item.name,index)">{{item.name}}</li>
          </ul>
          <!-- 综合排序的内容 -->
          <ul class="main-right-title-text" v-show="sortSh">
            <li v-for="(item, index) in sortList" :key="item.index" 
            :class="{'active':sortType === item}" @click="changeSortType(item)">{{item}}</li>
          </ul>
          <!-- 蒙版 -->
        <div class="mengban" v-show="allCategories || sortSh"></div>          
        </div>
        <!-- 商品展示区 -->
        <div class="products-wrap">
          <ul class="products-lists">
            <li class="products-list" 
            v-for="item in sortProducts" 
            :key="item.id">
              <router-link tag="div" class="products-list-img" :to="'/product-item/' + item.id">
                <img v-lazy="item.imgs.min">
              </router-link >
              <div class="products-list-div">
                <div class="products-list-title">
                <p>{{item.name}}</p>
                </div>
                <div class="products-list-content">
                  <p>{{item.unit}}ml</p>
                  <p>￥{{item.price}}</p>
                  <div class="btn-wrap">
                    <span @click="subCart(item)" :class="{'active': item.num > 0}">-</span>
                    <span class="products-list-num">{{item.num}}</span>
                    <span @click="addCart(item)" :class="{'active': item.num > 0}">+</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderYellow from '@/components/Header-yellow/Header-yellow'
export default {
  components: {
    HeaderYellow
  },
  data () {
    return {
      //激活的大分类,这里存储的是大分类的下标
      activeCategory: 0,
      //激活的标题
      activeCid: '全部分类',
      // 激活的子分类的下标,默认为all为全部分类
      activeCidIndex: 'all',
      //控制全部分类的标题显示或隐藏
      allCategories: false,
      //排序的类型
      sortList: ['综合排序','价格最高','价格最低'],
      //默认排序的是 综合排序
      sortType: '综合排序',
      //控制排序列表的显示或隐藏，默认隐藏
      sortSh: false,
      //减和数量的显示和隐藏,默认隐藏
      actionBol: true
    }
  },
  computed: {
    //获取分类和商品的所有的数据
    computedCategories () {
      return this.$store.state.computedCategories
    },
    //激活获取分类的商品数据
    activeCategoryProducts () {
      return this.$store.state.computedCategories[this.activeCategory].products
    },
    //根据激活的子分类的下标返回对应的商品数据
    activeCidProducts () {
      if(this.activeCidIndex === 'all'){
        return this.activeCategoryProducts
      }else {
        // //先把子分类的下标存储
        // let index = this.activeCidIndex
        return this.activeCategoryProducts.filter(item => item.cidsId === this.activeCidIndex)
      }
    },
    //对显示的商品列表进行排序
    sortProducts () {
      if (this.sortType == '综合排序') {
        return this.activeCidProducts
      }else if (this.sortType === '价格最低') {
        return this.activeCidProducts.sort((a,b) => a.price - b.price)
      }else if (this.sortType === '价格最高') {
        return this.activeCidProducts.sort((a,b) => b.price - a.price)
      }
    },
    //拿到用户信息
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    //把选中的商品的数量在购物车中减少
    subCart (product) {
      if (this.user.id) {
        if (product.num > 0) {
          this.$store.dispatch('subCart',product)
            .then(res => {
              this.$msg("提示", res.msg)
              product.num--
            })
        }
      } else {
        //没登录
        this.$msg("提示","未登录，请登录")
          .then(action => {
            this.$router.push('/login')
          })
      }
    },
    //把选中的商品添加到购物车中
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
    },
    //改变激活的分类
    changeActiveCategory (index) {
      this.activeCategory = index
      this.activeCid = '全部分类'
      this.activeCidIndex = 'all'
    },
    //改变激活的全部分类标题
    changeActiveCid (name,index) {
      this.activeCid = name
      this.activeCidIndex = index
      this.allCategories = false
    },
    //全部分类的显示和隐藏
    changeAllCategories () {
      this.allCategories = !this.allCategories
      this.sortSh = false
    },
    //激活排序的类型
    changeSortType (item) {
      this.sortType = item
      this.sortSh = false
    },
    //控制排序列表的显示或隐藏
    changeSortSh () {
      this.sortSh = !this.sortSh
      this.allCategories = false
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../styles/index.less');
img[lazy=loading] {
  background: url(../../styles/images/loading.gif) center center no-repeat;
  background-size: 2rem;
}
.main-left-wrap{
  float: left;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  font-size: 1.2rem;
  ul{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0; 

    background-color: #f8f8f8;
    overflow-y: scroll;
    li{
      width: 7.5rem;
      height: 4.1rem;
      line-height: 4rem;
      box-sizing: border-box;
      border-bottom: 1px solid lightgray;
      text-align: center;
      color: #6d6d6d;
      position: relative;
      span{
        display:block;
        height: 3.4rem;
        width: 0.5rem;
        position: absolute;
        top:0.2rem;
      }
    }
  }
}
.main-left-wrap > ul > li.active span{
  border-left: 0.5rem solid @color-background;
}
.main-right-wrap{
  float: right;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 7.5rem;
  right: 0;
  background-color: #fff;
  font-size: 1.2rem;
  box-sizing: border-box;
}
.main-right-title-wrap{
  float: right;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #6d6d6d;

  .main-right-title{
    position: fixed;
    top: 4.5rem;
    z-index: 5;
    opacity: 0.95;
    width: 100%;
    height: 4.1rem;
    line-height: 4.1rem;
    box-sizing: border-box;
    border-bottom: 1px solid lightgray;
    background-color: #fff;
    
    li{
      float: left;
      width: 38%;
      text-align: center;
      box-sizing: border-box;
      span{
        display: inline-block;
        width: 1.2rem;
        height: 4rem;
        background: url('images/icon-down.png') center center no-repeat;
        background-size: 1rem;
        transition: all 0.5s ease;
        transform: rotate(0deg)
      }
    }
    li.active span{
        transform: rotate(-180deg)      
    }
    li:nth-child(2){
      margin-left: -1.7rem;
    }
    li:nth-child(2)::before{
      content: '|';
      color: #ddd;
      padding-right: 3rem;
    }
  }
}
.main-right-title-text{
  position: absolute;
  top: 4.1rem;
  left: 0;
  right: 0;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  overflow: hidden;
  background-color: #fff;
  z-index: 5;
  li{
    float: left;
    border: solid 1px #e0e0e0;
    padding: .4rem .8rem;
    margin-left: .8rem;
    margin-top: .8rem;
    border-radius: .5rem;
    &.active{
      border-color: @color-background;
      background-color: #FFF9D9;
    }
  }
}
.mengban{
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 0;
  background-color: #000000;
  opacity: 0.2;
  z-index: 2;
}
.products-wrap{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom:0;
  padding-top: 4.1rem;
  overflow-y: scroll;
    .products-list{
      position: relative;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid lightgray;
      padding: 0.5rem;
      line-height: 2rem;
      background-color: #fff;
      overflow: hidden;

      .products-list-img{
        width: 38%;
        float: left;
        img{
          width: 100%;
        }
      }
    }
}
.products-list .products-list-div{
  padding-top: 0.5rem;
  width: 60%;
  float: left;
  margin-left: 0.4rem;
  .products-list-title{
    margin-bottom: 2.5rem;
  }
  .products-list-content{
    p:nth-child(1){
      color:#6d6d6d;
    }
    p:nth-child(2){
      color: @color-text;
    }
  }
}
.btn-wrap{
  position: absolute;
  right: 0;
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
    position: relative;
    top: -4px;
    font-size: 1.4rem;
  }
  // span.action{
  //   visibility: hidden;
  // }
}
p{
.no-wrap()
}
</style>


