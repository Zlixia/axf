<template>
  <div id="app">
    <TabBar v-show="tabBarShow"/>
    <!-- 缓存组件,created只触发一次啦 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import TabBar from '@/components/TabBar/TabBar'
import api from '@/api'
export default {
  name: 'app',
  components: {
    TabBar
  },
  created () {
    let that = this
    // 异步转到同步，需要依赖babel-polyfill
    async function getData() {
      //获取大分类
      let res = await that.$http.get(api.host + '/categories')
      that.categories = res.data
      console.log(res.data)
      //获取所有的商品数据
      let result = await that.$http.get(api.host + '/products')
      that.products = result.data
      //对数据结构重新组织
      that.computedCategories() 
    }
    getData()
  },
  //计算属性
  computed: {
    //需要知道tabBarShow的状态
    tabBarShow () {
      return this.$store.state.tabBarShow
    }
  },
  methods: {
    computedCategories () {
      let products = this.products
      let categories = this.categories
      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          //找到商品相对应的分类
          if (categories[j].id === products[i].categoryId) {
            categories[j].products.push(products[i])
          }
        }
      }
      this.$store.commit('SAVE_COMPUTED_CATEGORIES', categories)
    }
  }
}
</script>

