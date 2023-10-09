<template>
<div>
    <img src="~@/assets/images/cyq.jpg" alt="">
    <!-- <img :src="pic" alt=""> -->
</div>
</template>

<script>
import moment from "moment"
import pic from "@/assets/images/cyq.jpg"
console.log("pic",pic);

export default {
    data(){
        return {
            pic
        }
    }
}
</script>

<style>

</style>