<template>
    <div class="main-App">
        <router-view ></router-view>
    </div>
</template>

<script>
import moment from "moment"
console.log("FOO",FOO)
console.log("process.env.FOA",process.env.FOA)
export default {
    mounted(){
        console.log("mounted");
    }
}
</script>
<style lang="less" scoped>
.main-App{
    min-height: 100%;
    height: 100%;
}
</style>