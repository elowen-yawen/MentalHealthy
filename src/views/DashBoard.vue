<template>
    <div class="container" style="width: 100%;">
        <div class="form" style="width: 100%;">
            <TopForm title="数据分析" :formItem="formItem" @search="handleSearch">
            </TopForm>
        </div>
    </div>
</template>
<script setup>
import TopForm from '@/components/TopForm.vue';
const formItem=[{
    comp:'elInput',
    placeholder:'请输入文章标题',
    title:'文章标题',
    prop:"articalName"
},{
    comp:'elSelect',
    placeholder:'请输入分类',
    title:'分类',
    options:['情感','电台','伤感小说'],
    prop:"category"
}]
const handleSearch=(formData)=>{
    console.log("父接收到数据")
    console.log(formData)
}
</script>
<style scoped>
.form{
    display: flex;
}
</style>