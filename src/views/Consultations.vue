<template>
    <div class="container">
        <div class="header" style="width:100%;display: flex;justify-content: space-between;margin-bottom: 20px;">
            <h2>咨询记录</h2>
        </div>
        <el-table ref="formRef" :data="tableData">
            <el-table-column prop="id" label="会话ID" width="100px">
                <template #default="scope">
                    <el-avatar>{{ scope.row.id }}</el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="lastMessageContent" label="情绪日志">
                <template #default="scope">{{ scope.row.lastMessageContent }}</template>
            </el-table-column>
            <el-table-column prop="messageCount" label="消息树" width="100px">
                <template #default="scope">{{ scope.row.messageCount }}</template>
            </el-table-column>
            <el-table-column prop="lastMessageTime" label="时间" width="100px">
                <template #default="scope">{{ scope.row.lastMessageTime }}</template>
            </el-table-column>
            <el-table-column prop="mood" label="操作" width="100px">
                <template #default="scope">
                    <el-button link type="primary" @click="handleDetail(scope.row)">详细</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :total="pages.total" :current-page="pages.currentPage"
                @current-change="handlePageChange" />
        </div>
        <div>
            <el-dialog v-model="dialogTableVisible" width="800" class="dialogSession">
                <div class="session-detail">
                    <div class="detail-header">
                        <p>
                            <span>用户名：</span>
                            <span>{{ sessionInfo.userNickname }}</span>
                        </p>
                        <p>
                            <span>开始时间：</span>
                            <span>{{ sessionInfo.startedAt }}</span>
                        </p>
                        <p>
                            <span>
                                消息数：
                            </span>
                            <span>
                                {{ sessionInfo.messageCount }}
                            </span>
                        </p>
                    </div>

                </div>
                <div class="message-container">
                    <div class="message-header">
                        <h4>对话记录：</h4>
                    </div>
                    <div class="message-list">
                        <div class="message-item" v-for="p in sessionInfo.sessionMessage" :class="{isBlue:p.senderTypeDesc=='用户',isGreen:p.senderTypeDesc!='用户'}">
                            <p><span style="font-weight: bold;">{{ p.senderTypeDesc}}</span><span style="color: grey;">{{ p.createdAt }}</span></p>
                            <div class="message-content">
                                {{ p.contentPreview }}
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { handleGetConsultation } from '@/api/admin';
import { handleGetSessionMessage } from '@/api/admin';
const tableData = ref([])
const pages = reactive({
    currentPage: 1,
    size: 10,
    total: 100
})
const dialogTableVisible = ref(false)
onMounted(async () => {
    await handleSearch()
})
const handleSearch = async () => {
    console.log('发送的参数：', pages) // 检查参数名后端认不认
    const res = await handleGetConsultation(pages)
    console.log('后端返回原始值：', res) // 检查这里有没有 records 字段

    if (res && res.records) {
        tableData.value = res.records
        pages.total = res.total
    } else {
        console.error('后端返回结构不对！实际拿到的是：', res)
    }
}
const handlePageChange = async (val) => {
    pages.currentPage = val
    await handleSearch()
}
const sessionInfo = reactive({})
const handleDetail = async (data) => {
    console.log(data)
    sessionInfo.userNickname = data.userNickname
    sessionInfo.startedAt = data.startedAt
    sessionInfo.messageCount = data.messageCount
    dialogTableVisible.value = true
    const res = await handleGetSessionMessage(data.id)
    sessionInfo.sessionMessage=res
    console.log(sessionInfo.sessionMessage)
}

</script>
<style scoped>
.container {
    text-align: center;
}

.detail-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.detail-header p {
    margin-bottom: 5px;
}

.message-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    margin-left: 30px;

}

.session-detail {
    margin-left: 30px;
}

.session-detail {
    background-color: rgb(212, 212, 212);
}

.session-detail p {
    padding-bottom: 10px;
    padding-left: 20px;
}

.session-detail p:nth-child(1) {
    padding-top: 20px;
}
.message-item p{
    display: flex;
    justify-content: space-between;
}
.message-item{
    margin-top: 20px;
    padding: 15px;
    border-radius: 2%;
}
.isBlue{
    background-color: rgb(182, 229, 248);
}
.isGreen{
    background-color: rgb(212, 239, 172);
}
.message-content{
    text-align: start;
}
</style>