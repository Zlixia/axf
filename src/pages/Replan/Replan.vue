<template>
  <div class="addSite">
    <HeaderGray headerTitle="修改地址" back="true"/>
    <span class="save-addSite">保存</span>
    <div class="main">
      <table>
        <tr class="item_list">
          <th>联系人</th>
          <td><input type="text" placeholder="收货人姓名"></td>
        </tr>
        <tr class="item_list">
          <th>&nbsp;&nbsp;&nbsp;</th>
          <td>
            <span class="man active">先生</span>
            <span class="man">女士</span>
          </td>
        </tr>
        <tr class="item_list">
          <th>手机号码</th>
          <td><input type="text" placeholder="鲜蜂侠联系您的电话"></td>
        </tr>
        <tr class="item_list">
          <th>所在城市</th>
          <td>
            <select>
              <option value="">请选择城市</option>
              <option value="广州市">广州市</option>
            </select>
          </td>
        </tr>
        <tr class="item_list">
          <th>所在地区</th>
          <td class="diqu"><input type="text" placeholder="请选择您的住宅小区、大厦或学校"></td>
        </tr>
        <tr class="item_list">
          <th>详细地址</th>
          <td><input type="text" placeholder="请输入楼号门牌号等详细信息"></td>
        </tr>
      </table>
      <!-- 删除地址 -->
      <div class="delete-wrap">删除地址</div>
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
.main {
  bottom: 0;
}
.save-addSite {
  z-index: 10;
  color: #999999;
  font-size: 1.4rem;
  display: inline-block;
  width: 6rem;
  height: 4.4rem;
  line-height: 4.4rem;
  text-align: center;
  position: absolute; 
  right: 0;
}
table {
  width: 100%;
  font-size: 1.4rem;
  background-color: #fff;
}
.item_list {
  width: 100%;
  border-top: 1px solid #e0e0e0;
  th {
    width: 7rem;
    padding: 1.1rem 0 1.1rem 1.5rem;
    text-align: left;
    font-weight: 400; 
  }
  td {
    input {
      outline: none;
      border: 0;
      font-size: 1.4rem;
      width: 90%;
    }
    select {
      width: 100%;
      font-size: 1.4rem;
      outline: none;
      border: 0;
      appearance: none;
      background: url('./images/cart-more.png') right center no-repeat;
      background-size: 2rem;
    }
  }
  td.diqu {
    background: url('./images/cart-more.png') right center no-repeat;
    background-size: 2rem;
  }
}
.man {
  display: inline-block;
  padding-left: 2rem;
  margin-right: 1rem;
  background: url('./images/checkbox.png') 0rem center no-repeat;
  background-size: 1.4rem;
}
.man.active {
  background-image: url('./images/checkbox-selectd.png')
}
.delete-wrap {
  width: 100%;
  background-color: #fff;
  font-size: 1.4rem;
  height: 4.5rem;
  line-height: 4.5rem;
  text-align: center;
  margin: 1rem 0;
}
</style>