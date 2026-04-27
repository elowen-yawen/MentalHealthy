<template>
    <div class="container">
        <TopForm title="情绪日志" :formItem="formItem" />
        <div class="table-container">
            <el-table ref="tableRef" :data="tableData">
                <el-table-column prop="userId" label="ID" width="10" />
                <el-table-column prop="id" label="会话ID" width="130">
                    <el-avatar>{{ userID }}</el-avatar>
                </el-table-column>
                <el-table-column prop="diaryDate" label="记录日期" width="180" />
                <el-table-column prop="moodScore" label="情绪评分">
                    <el-rate v-model="value" size="10" />
                </el-table-column>
                <!-- <el-table-column prop="lifeValue" label="生活指标" width="180" /> -->
                <el-table-column prop="emotionTriggers" label="情绪触发因素" width="180" />
                <el-table-column prop="diaryContent" label="日记内容" width="180" />
                <el-table-column label="操作" width="180">
                    <el-button type="primary" link>详细</el-button>
                    <el-button type="danger" link>删除</el-button>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script setup>
import TopForm from '@/components/TopForm.vue';
import { ref, reactive, computed, onMounted } from 'vue';
import { handleEmotionPage } from '@/api/admin';
const formItem = [{
    comp: 'elInput',
    placeholder: '请输入用户ID',
    title: '用户ID',
    prop: "userID"
}, {
    comp: 'elSelect',
    placeholder: '请选择评分范围',
    title: '情绪评分',
    prop: 'moodScoreRange',
    options: [
        {
            label: '0-40',
            value: '0-40'
        },
        {
            label: '41-60',
            value: '41-60'
        },
        {
            label: '61-80',
            value: '61-80'
        },
        {
            label: '81-100',
            value: '81-100'
        }
    ]
}]
const tableRef = ref()
const tableData = ([])
const handleSearch=async(data="")=>{
    const res=await handleEmotionPage(data)
    tableData.value=res.records
    console.log(res.records)
}
onMounted(async()=>{
    await handleSearch()
})
</script>
<style scoped></style>
<!--  -->