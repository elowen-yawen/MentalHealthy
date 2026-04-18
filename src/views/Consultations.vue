<template>
    <div class="container">
        <TopForm title="咨询记录" :formItem="formItem" @search="handleSearch">
                <template #buttons>
                    <el-button type="primary">
                        新增
                    </el-button>
                </template>
            </TopForm>
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

</style>