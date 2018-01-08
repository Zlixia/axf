<template>
  <div class="cart">
      <HeaderGray headerTitle="购物车"/>
      <div class="main">
        <!-- 空购物车页面 -->
        <div class="cart-empty-wrap" v-show="(carts.length === 0)">
          <div class="cart-dingwei"></div>
          <p>亲，购物车空空的耶~</p>
          <router-link to="/" tag="span" class="guangguang">去逛逛</router-link>
        </div>
        <!-- 用户信息 -->
        <table class="user-news" v-show="(carts.length > 0)">
          <tr>
            <th>
              收<span class="text-hidden">h</span>货<span class="text-hidden">h</span>人
            </th>
            <td>周小周 女士</td>
            <router-link tag="td" to="/replan" rowspan="3" class="amend">修改</router-link>
          </tr>
          <tr>
            <th>电<span class="text-hidden">隐藏</span>话</th>
            <td>13545288888</td>
          </tr>
          <tr>
            <th>收货地址</th>
            <td>深圳市裕安居 F座</td>
          </tr>
        </table>
        <!-- 用户信息下面的内容 -->
        <div v-show="(carts.length > 0)" class="cart-group-wrap" width="100%">
          <!-- 闪送超市 -->
          <div class="cart-market-wrap">
            闪送超市
          </div>
          <span class="cart-addBtn">凑单专区</span>
          <p class="qisong">￥0起送，22:00前满￥30免运费，22:00后满￥50main运费</p>
          <!-- 收货时间 -->
          <p class="cart-recive-time">收货时间&nbsp;&nbsp;
            <span class="yuding">&nbsp;&nbsp;可预订</span>
            <select class="cart-receive-select">
              <span></span>              
              <optgroup label="今天">
                <option value="30分钟送达">30分钟送达</option>
                <option value="15:00-16:00">15:00-16:00</option>
                <option value="16:00-17:00">16:00-17:00</option>
                <option value="17:00-18:00">17:00-18:00</option>
                <option value="18:00-19:00">18:00-19:00</option>
              </optgroup>
              <optgroup label="明天">
                <option value="09:00-10:00">09:00-10:00</option>
                <option value="10:00-11:00">10:00-11:00</option>
                <option value="11:00-12:00">11:00-12:00</option>
                <option value="12:00-13:00">12:00-13:00</option>
              </optgroup>
              <optgroup label="后天">
                <option value="09:00-10:00">09:00-10:00</option>
                <option value="10:00-11:00">10:00-11:00</option>
                <option value="11:00-12:00">11:00-12:00</option>
                <option value="12:00-13:00">明天 12:00-13:00</option>
              </optgroup>
            </select>
          </p>
          <!-- 收货备注 -->
          <div class="cart-receive-remark">
            <span>收货备注&nbsp;&nbsp;</span>
            <input class="remark-input" type="text" maxlength="100" placeholder="可输入100字以内特殊要求内容">
          </div>
        </div>
        <!-- 购物车中的商品列表 -->
        <table class="group-item-wrap" v-show="(carts.length > 0)">
          <tr class="group-item" v-for="item in carts" :key="item.id" 
          v-if="item.num > 0">
            <td class="group-item-checkbox" :class="{'active': item.checked}" 
            @click="changeChecked(item)">&nbsp;</td>
            <router-link tag="td" :to="'/product-item/' + item.id" class="group-item-img">
              <img v-lazy="item.product_img">
            </router-link>
            <td class="group-item-detail">
              <div>{{item.product_name}}</div>
              <div class="product-specifics-wrap">
                <div class="product-specifics">
                  <span>￥{{item.product_price}}</span>
                </div>
                <div class="btn-wrap">
                  <span @click="subCart(item)">-</span>
                  <span class="products-list-num">{{item.num}}</span>
                  <span @click="addCart(item)">+</span>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 总价 -->
        <div class="total-wrap" v-show="(carts.length > 0)">
          <span class="all-total" :class="{'all-total-true': checkedAll,
           'all-total-false': !checkedAll}" @click="changeCheckedAll">全选</span>共&nbsp;:
          <span class="total-price">￥{{total}}</span>
          <span class="total-btn">选好了</span>
        </div>
      </div>
  </div>
</template>
<script>
import HeaderGray from '@/components/Header-gray/Header-gray'
export default {
  components: {
    HeaderGray
  },
  computed: {
    //用户信息
    user () {
      return this.$store.state.user
    },
    //购物车
    carts () {
      return this.$store.state.carts
    },
    //总价
    total () {
      return this.$store.getters.total
      console.log(this.$store.getters.total)
    },
    //返回全选按钮的bol值
    checkedAll () {
      //假设是勾选的状态
      let checkedAll = true
      for (let i = 0; i < this.carts.length; i++) {
        //判断这个购物车中checked属性是否为选中
        if (!this.carts[i].checked) {
          //该商品没有被勾选上
          checkedAll = false
          break
        }
      }
      return checkedAll
    }
  },
  created () {
    //判断该用是否登录注册
    if (!this.user.id) {
      this.$msg("提示","未登录，请登录")
        .then(action => {
          this.$router.push('/login')
        })
    }
  },
  methods: {
    //更改购物车中全选按钮的勾选状态
    changeCheckedAll () {
      //通过判断checkedAll的值来判断是否勾选
      if (this.checkedAll) {
        //全部取消
        this.$store.dispatch('checkedAllFalse')
          .then(res => {
            this.$msg("提示", res.msg)
          })
      } else {
        //全部勾选
        this.$store.dispatch('checkedAllTrue')
          .then(res => {
            this.$msg("提示", res.msg)
          })
      }
    },
    //更改购物车中商品的勾选状态
    changeChecked (product) {
      this.$store.dispatch('changeChecked', product)
        .then(res => {
          this.$msg("提示",res.msg)
        })
    },
    //将商品添加到购物车中
    addCart (product) {
      product.cartBol = true
      this.$store.dispatch('addCart', product)
        .then(res => {
          this.$msg("提示", res.msg)
          //数据更新或者添加成功后，让num++
          //product.num++
          //然后保存在(vuex)本地购物车中
          //this.$store.commit('SAVE_CARTS', this.carts)
          this.$store.commit('RESET_CARTS', product)
        })
    },
    //将该商品在购物车中的数量减少
    subCart (product) {
      product.cartBol = true
      this.$store.dispatch('subCart', product)
        .then(res => {
          this.$msg("提示", res.msg)
          //数据更新或者添加成功后，让num++
          //product.num--
          //然后保存在(vuex)本地购物车中
          //this.$store.commit('SAVE_CARTS', this.carts)
          this.$store.commit('RESET_CARTS', product)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../styles/index.less');

.text-hidden{
  visibility: hidden;
}
.cart-empty-wrap{
  text-align: center;
  padding-top: 20%;
  font-size: 1.4rem;
  color: #999;
  //display: none;
  .cart-dingwei{
    width: 8rem;
    height: 8rem;
    border-radius: 4rem;
    background: url('../../styles/images/dingwei.png') center center no-repeat;
    background-size: contain;
    margin: 0 auto;
  }
  p{
    padding: 1.2rem 0;
    margin-bottom: 1.2rem;
  }
  .guangguang{
    border: 1px solid lightgray;
    border-radius: 0.3rem;
    padding: 0.4rem 3rem;
  }
}
table.user-news {
  width: 100%;
  font-size: 1.4rem;
  background-image: url('images/cart-bg.png'),url('images/cart-bg.png');
  background-position: left top,left bottom;
  background-size: auto 0.3rem;
  background-color: #ffffff;
  background-repeat: repeat-x;
  margin-bottom: 1rem;
  
  th{
    padding: .7rem 1rem .7rem 1rem;
    text-align: left;
  }
  td{
    padding: 0.7rem 0;
  }
  .amend {
    width: 17%;
    background: url('images/cart-more.png') right center no-repeat;
    background-size: 2rem;
  }
}
.cart-group-wrap{
  background-color: #fff;
  position: relative;
  .cart-market-wrap{
    font-size: 1.2rem;
    height: 3.5rem;
    line-height: 3rem;
    padding-left: 1.4rem;
    color: #999999;
    &::before {
      content: '';
      display: inline-block;
      width: 0.4rem;
      height: 1.2rem;
      background-color: #ffd600; 
      margin-right: 0.3rem;
      border-radius: 0.2rem;
      vertical-align: -0.2rem;
    }
  }
  p.qisong{
      color:#999;
      padding-left: 1.3rem;
      height: 2.2rem;
      line-height: 2rem;
      .no-wrap();
  }
  .cart-addBtn{
    position: absolute;
    right: 1.4rem;
    top: 0.5rem;
    font-size: 1.2rem;
    width: 7rem;
    height: 2.4rem;
    line-height: 2.4rem;
    border-radius: 1.2rem;
    border:1px solid #f40;
    color: #f40;
    text-align: center;
  }
  p.cart-recive-time{
    position: relative;
    border: 1px solid white;
    box-sizing: border-box;
    border-top-color: lightgray;
    border-bottom-color: lightgray;
    height: 5rem;
    line-height: 4.8rem;
    font-size: 1.4rem;
    padding: 0 1.3rem; 
    background: url('images/cart-more.png') right center no-repeat;
    background-size: 2rem;
    overflow: hidden;
    .yuding{
      float: right;
      padding-right: 1.4rem;
    }
    .cart-receive-select{
      position: absolute;
      top: 0;
      bottom: 0;
      border: 0;
      font-size: 1.4rem;
      outline: none;
      background-color: transparent;
      color: #f40;
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
      optgroup{
        color: #000000;
      }
    }
  }
  div.cart-receive-remark{
    height: 5rem;
    line-height: 5rem;
    font-size: 1.4rem;
    padding-left: 1.3rem;
    padding-right: 1.8rem;
    .remark-input{
      height: 3.2rem;
      line-height: 3.2rem;
      border:0;
      outline: none;
      font-size: 1.4rem;
      padding-left: 1rem;
      border: 1px solid lightgray;
      border-radius: 0.6rem;
      width: 72%
    }
  }
}
// 商品列表
table.group-item-wrap{
  width:100%;
  background-color: #fff;
  .group-item{
    width: 100%;
    border-bottom: 1px solid lightgray;
    border-top: 1px solid lightgray;
    .group-item-checkbox{
      background: url("./images/checkbox.png") center center no-repeat;
      -webkit-background-size: 1.8rem 1.8rem;
      background-size: 1.8rem 1.8rem;
      width: 5rem;
    }
    .group-item-checkbox.active{
      background-image: url("./images/checkbox-selectd.png");
    }
    .group-item-img{
      width: 5rem;
      img{
        width: 100%;
      }
    }
    .product-operates{
      text-align: right;
    }
    .group-item-detail{
      font-size: 1.3rem;
    }
    .group-item-detail>div{
      height: 4rem;
      line-height: 4rem;
      padding-left: 1rem;
    }
  }
}
.product-specifics-wrap{
  position: relative;
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
    border: 1px solid #f40;
    color: #f40;
    border-radius: 50%;
    font-size: 2.4rem;
  }
  span:nth-child(2){
    display: inline-block;
    width: 2rem;
    height: 3rem;
    line-height: 2.5rem;
    text-align: center;
  }
}
.total-wrap{
  width: 100%;
  background-color: #fff;
  height: 5rem;
  line-height: 5rem; 
  font-size: 1.4rem;
  margin-bottom: 1rem;
  position: relative;
  .all-total{
    display: inline-block;
    min-width: 5rem;
    padding-left: 2.5rem;
    margin-left: 1.4rem;
    background-position: left center;
    background-repeat: no-repeat;
    background-size: 1.8rem 1.8rem;
  }
  .all-total-false{
    background-image: url('images/checkbox.png')
  }
  .all-total-true{
    background-image: url('images/checkbox-selectd.png')
  }
  .total-price{
    color: #f40;
  }
  .total-btn{
    display: inline-block;
    background-color: #ffd600;
    width: 10rem;
    text-align: center;
    position: absolute;
    right: 0;
  }
}
</style>



