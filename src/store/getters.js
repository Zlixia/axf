export default {
  total (state) {
    let result = 0
    //拿到state本地的购物车数据
    let carts = state.carts
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].checked) {
        result += (carts[i].product_price * carts[i].num)
      }
    }
    return result.toFixed(2)
  }
}