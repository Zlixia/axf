<template>
  <div class="header-gray">
      <span v-if="back=='true'" @click="goBack()" class="header-icon header-left"></span>
      <div class="header-content">
        {{headerTitle}}  
      </div>
  </div>
</template>
<script>
export default {
  props: ['headerTitle','back'],
  methods: {
    goBack () {
      //有坑
        this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
  .header-gray{
    position: fixed;
    top: 0;
    width: 100%;
    height: 4.5rem;
    z-index: 3;
    background-color: #F9FAFD;
  }
  .header-content{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6rem;
    right: 6rem;
    line-height: 4.5rem;
    text-align: center;
    font-weight: 700;  
    font-size: 1.4rem;
  }
  .header-icon{
    position: absolute;
    top: 0;
    width: 6rem;
    height: 4.4rem;
    background-repeat: no-repeat;
    -webkit-background-size: auto 2.5rem;
    background-size: auto 2.5rem;
    background-position: left center;
  }
  .header-left{
    background-image: url("./images/header-icon.png");
    left: .6rem;
  }
</style>


