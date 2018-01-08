<template>
  <ul>
    <router-link to="/" tag="li" class="home">
      <span></span> 
      首页
    </router-link>
    <router-link to="/shop" tag="li" class="current">
      <span></span>
      闪送超市
    </router-link>
    <router-link to="/cart" tag="li" class="cart">
      <span></span>
      购物车
    </router-link>
    <router-link to="/mine" tag="li" class="mine">
      <span></span>
      我的
    </router-link>
  </ul>
</template>
<style lang="less" scoped>
  @import url('../../styles/var.less');
  ul{
    position: fixed;
    z-index: 1000;
    bottom: 0;
    width: 100%;
    height: 5rem;
    background-color:#f6f6f6;
    display: flex;
    li{
      flex: 1;
      text-align: center;
      font-size: 1.2rem;
      color: #777;
      position: relative;

      span{
        display: block;
        width: 100%;
        height: 3rem;
        background: no-repeat center .6rem;
        background-size: auto 2rem;
      }
    }
  }
  ul>li.home>span{
  background-image: url("./images/home.png");
}
ul>li.current>span{
  background-image: url("./images/current.png");
}
ul>li.cart>span{
  background-image: url("./images/cart.png");
}
ul>li.mine>span{
  background-image: url("./images/mine.png");
}
@-webkit-keyframes navs{
  0%{
    -webkit-background-size: auto .6rem;
    background-size: auto .6rem;
  }
  20%{
    -webkit-background-size: auto 2.2rem;
    background-size: auto 2.2rem;
  }
  40%{
    -webkit-background-size: auto 1.8rem;
    background-size: auto 1.8rem;
  }
  60%{
    -webkit-background-size: auto 2.06rem;
    background-size: auto 2.06rem;
  }
  80%{
    -webkit-background-size: auto 1.94rem;
    background-size: auto 1.94rem;
  }
  100%{
    -webkit-background-size: auto 2rem;
    background-size: auto 2rem;
  }
}
@keyframes navs{
  0%{
    -webkit-background-size: auto .6rem;
    background-size: auto .6rem;
  }
  20%{
    -webkit-background-size: auto 2.2rem;
    background-size: auto 2.2rem;
  }
  40%{
    -webkit-background-size: auto 1.8rem;
    background-size: auto 1.8rem;
  }
  60%{
    -webkit-background-size: auto 2.06rem;
    background-size: auto 2.06rem;
  }
  80%{
    -webkit-background-size: auto 1.94rem;
    background-size: auto 1.94rem;
  }
  100%{
    -webkit-background-size: auto 2rem;
    background-size: auto 2rem;
  }
}
ul>li.home.router-link-exact-active>span{
  background-image: url("./images/home-active.png");
}
ul>li.current.router-link-exact-active>span{
  background-image: url("./images/current-active.png");
}
ul>li.cart.router-link-exact-active>span{
  background-image: url("./images/cart-active.png");
}
ul>li.mine.router-link-exact-active>span{
  background-image: url("./images/mine-active.png");
}
ul>li.router-link-exact-active>span{
  animation: navs 1s;
}
</style>


