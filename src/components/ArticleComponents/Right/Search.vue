<template>
  <div id="search" class="shadow">
      <input type="text">
      <button >search</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.shadow {background-color: #FFFFFF;box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);}
#search{
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    input{
        width: 76%;
        height: 36px;
        border: 1px solid #ccc;
        border-right: none;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        padding: 6px 0;
        text-indent: 5px;
        outline: none;
    }
    button{
        cursor: pointer;
        width: 24%;
        border: 1px solid #ccc;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background: deepskyblue;
        color: white;
        // height: 32px;
        font-size: 14px;
        outline: none;
    }
}
</style>