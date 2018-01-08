<template>
  <div class="site">
    <HeaderGray headerTitle="选择地址" back="true"/>
    <div class="main">
      <div class="site-current"><span>定位到当前位置</span></div>
      <!-- 地址栏为空的时候 -->
      <div class="site-dingwei-wrap">
        <div class="site-dingwei"></div>
        <p class="address">您还没有地址哦~</p>
      </div>
      <!-- 新增的地址在地址栏中的显示 -->
      <ul class="address-lists">
        <li class="address-list">
          <div class="address-text active">
            <p>周小周&nbsp;&nbsp;&nbsp;13545288552</p>
            <p>裕安二路 德冠廷公寓</p>
          </div>
          <router-link tag="div" to="/replan" class="edit"></router-link>
        </li>
        <li class="address-list">
          <div class="address-text">
            <p>周小周&nbsp;&nbsp;&nbsp;13545288552</p>
            <p>裕安二路 德冠廷公寓</p>
          </div>
          <div class="edit"></div>
        </li>
      </ul>
    </div>
    <!-- 新增地址 -->
    <div class="newAddress-btn">
      <router-link tag="p" to="/addSite">+&nbsp;新增地址</router-link>
    </div>
  </div>
</template>
<script>
import HeaderGray from '@/components/Header-gray/Header-gray'
export default {
  components: {
    HeaderGray
  }
}
</script>
<style lang="less" scoped>
.site-current {
  background-color: #ffffff;
  font-size: 1.4rem;
  height: 4.5rem;
  line-height: 4.5rem;
  text-align: center;
  span{
    display: inline-block;
    padding-left: 2.5rem;
    background: url('./images/current_bg.png') left center no-repeat;
    background-size: 2rem;
  }
}
.site-dingwei-wrap {
  padding-top: 24%;
  text-align: center;

  display: none;
  .site-dingwei {
    width: 8rem;
    height: 8rem;
    border-radius: 4rem;
    background: url('../../styles/images/dingwei.png') center center no-repeat;
    background-size: contain;
    margin: 0 auto;
  }
  .address {
    font-size: 1.4rem;
    color:#999999;
    padding-top: 1.2rem;
  }
}
.newAddress-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  padding-bottom: 0.4rem;
  background-color: #fff;
  p{
    font-size: 1.4rem;
    height: 3.7rem;
    line-height: 3.7rem;
    margin: 0.9rem 20%;
    background-color: #ffd600;
    border-radius: 0.5rem;
    text-align: center;
  }
}
ul.address-lists {
  z-index: 10;
  position: absolute;
  top: 4.4rem;
  width: 100%;
  margin: 1rem 0;
  background-color: #fff;
  .address-list {
    height: 8rem;
    font-size: 1.4rem;
    border-bottom: 1px solid lightgray; 
    position: relative;
    .address-text {
      position: absolute;
      top: 0.5rem;
      bottom: 0.5rem;
      left: 0;
      right: 8rem;
      line-height: 2.8rem;
      padding-top: 0.7rem;
      padding-left: 1rem;
      border-left: 0.5rem solid transparent;
      p:nth-child(2) {
        color:#999999;
      }
    }
    .address-text.active {
      border-left: 0.5rem solid #ffd600;
    }
    .edit {
      position: absolute;
      width: 8rem;
      height: 5.2rem;
      top: 1.5rem;
      right: 0;
      background: url('./images/edit.png') center center no-repeat;
      background-size: 2.2rem;
      border-left: 1px solid lightgray;
    }
  }
}
</style>


