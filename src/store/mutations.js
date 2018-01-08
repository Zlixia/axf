import { Store } from "_vuex@3.0.1@vuex";

export default {
    SAVE_COMPUTED_CATEGORIES (state, data) {
      state.computedCategories = data
    },
    //注册
    LOGIN (state,data) {
      state.user = data
    },
    //本地购物车中没有这个商品时的处理
    ADD_CART (state, data) {
      state.carts.push(data)
    },
    //更新本地购物车中商品的num值 数量增加
    UPDATA_NUM (state,id) {
      for (let i = 0; i < state.carts.length; i++) {
        //判断商品在购物车表中的id 和传入的id
        if (state.carts[i].id === id) {
          state.carts[i].num++
          break
        }
      }
    },
    //更新本地购物车中的商品的num值， 数量减少
    SUB_CART (state, id) {
      for (let i = 0; i < state.carts.length; i++) {
        //判断商品在购物车表中的id 和传入的id
        if (state.carts[i].id === id) {
          state.carts[i].num--
          break
        }
      }
    },
    //在vuex中保存从数据库中获取的购物车数据
    SAVE_CARTS (state,data) {
      //将数据库中的购物车数据添加到本地购物车中
      state.carts = data
      //更新本地的原始数据中的num值
      let computedCategories = state.computedCategories
      for (let i = 0; i < computedCategories.length; i++) {
        //拿到所有分类所对应的商品数据
        let products = computedCategories[i].products
        //遍历所有分类对应的商品
        for (let j = 0; j < products.length; j++) {
          for (let z = 0; z < data.length; z++) {
            //判断所有分类对应的商品的id和数据库中购物车表中商品的id
            if (products[j].id === data[z].product_id) {
              products[j].num = data[z].num
              break
            }
          }
        }
      }
    },
    //重置carts页面中的num
    RESET_CARTS (state, product) {
      //更新本地的原始数据
      let computedCategories = state.computedCategories
      label:
      for (let i = 0; i < computedCategories.length; i++) {
        //拿到每个分类的所有商品数据
        let products = computedCategories[i].products
        for (let j = 0; j < products.length; j++){
          //判断本地购物车中的每个商品id 和 传入的商品的id
          if (products[j].id === product.product_id) {
            products[j].num = product.num
            break label
          }
        }
      }
    },
    //把本地购物车中的该商品删除
    DEL_CART (state, id) {
      for (let i = 0; i < state.carts.length; i++) {
        //判断商品在购物车表中的id 和传入的id
        if (state.carts[i].id === id) {
          state.carts.splice(i, 1)
          //state.carts[i].num = 0
          break
        }
      }
    },
    //更新商品的选中状态
    CHANGE_CHECKED (state, product) {
      //找到每个商品在购物车中的下标
      let index = state.carts.indexOf(product)
      state.carts[index].checked = !state.carts[index].checked  
    },
    //本地购物车中更改全部按钮的选中状态为false
    CHECKED_ALL_FALSE (state) {
      let carts = state.carts
      for (let i = 0; i < carts.length; i++) {
        carts[i].checked = false
      }
    },
    //本地购物车中更改全部按钮的选中状态为true
    CHECKED_ALL_TRUE (state) {
      let carts = state.carts
      for (let i = 0; i < carts.length; i++) [
        carts[i].checked = true
      ]
    }
  }