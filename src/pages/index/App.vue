<template>
    <div class="main-App">
        <router-view ></router-view>
    </div>
</template>

<script>
import moment from "moment"
export default {
    mounted(){
        console.log("mounted",this);
    }
}
</script>
<style lang="less" scoped>
.main-App{
    min-height: 100%;
    height: 100%;
}
</style>