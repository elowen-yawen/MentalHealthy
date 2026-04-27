<template>
    <div class="container">
        <TopForm title="情绪日志" :formItem="formItem" @search="handleReceive" />
        <div class="table-container">
            <el-table ref="tableRef" :data="tableData">
                <el-table-column prop="userId" label="ID" width="80" fixed="left">
                </el-table-column>
                <el-table-column prop="id" label="会话ID" width="80">
                    <template #default="scope">
                        <el-avatar>{{ scope.row.id }}</el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="diaryDate" label="记录日期" width="100" />
                <el-table-column label="情绪评分">
                    <template #default="scope">
                        <el-rate :model-value="scope.row.moodScore" :max="10" disabled />
                    </template>
                </el-table-column>
                <el-table-column label="生活指标" width="100">
                    <template #default="scope">
                        <div>
                            <p>睡眠:{{ scope.row.sleepQuality }}/5</p>
                            <p>压力:{{ scope.row.stressLevel }}/5</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="emotionTriggers" label="情绪触发因素" width="110" />
                <el-table-column prop="diaryContent" label="日记内容" width="100" />
                <el-table-column label="操作" width="150" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" link @click="handleShowDetail(scope.row)">详细</el-button>
                        <el-button type="danger" link @click="handleRemove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="dialogContainer">
            <el-dialog v-model="dialogVisible" title="情绪日志详细" width="800" :before-close="handleClose"
                class="needMargin">
                <div class="userInfo">
                    <el-descriptions class="margin-top" title="用户信息" :column="2" :size="size" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    用户姓名
                                </div>
                            </template>
                            {{ currentInfo.username }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    昵称
                                </div>
                            </template>
                            {{ currentInfo.nickname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    用户ID
                                </div>
                            </template>
                            {{ currentInfo.userId }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    记录日期
                                </div>
                            </template>
                            {{ currentInfo.updatedAt }}
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="moodStatu">
                    <el-descriptions class="margin-top" title="情绪状态" :column="2" :size="size" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    情绪评分
                                </div>
                            </template>
                            <el-rate :model-value="currentInfo.moodScore" :max="10" disabled /><span
                                style="margin-left: 5px;">{{ currentInfo.moodScore }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    睡眠质量
                                </div>
                            </template>
                            {{ currentInfo.sleepQuality }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    压力水平
                                </div>
                            </template>
                            {{ currentInfo.stressLevel }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    记录日期
                                </div>
                            </template>
                            {{ currentInfo.updatedAt }}
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="trigger">
                    <el-descriptions class="margin-top" title="日记内容" :column="1" :size="size" border :label-width="200">
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    情绪触发因素
                                </div>
                            </template>
                            {{ currentInfo.emotionTriggers }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    日记内容
                                </div>
                            </template>
                            {{ currentInfo.diaryContent }}
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="aiAnalysis">
                    <el-descriptions class="margin-top" title="日记内容" :column="2" :size="size" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    主要情绪
                                </div>
                            </template>
                            <el-tag type="primary">{{ currentInfo.dominantEmotion }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    情绪强度
                                </div>
                            </template>
                            <el-progress :percentage="currentInfo.moodScore" :format="format" />
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    风险等级
                                </div>
                            </template>
                            <el-tag type="success">{{ currentInfo.riskLevel || "安全" }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    情绪性质
                                </div>
                            </template>
                            <el-tag type="primary">{{ currentInfo.aiAnalysisStatus }}</el-tag>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="mix">
                    <el-descriptions title="综合情绪分析" direction="vertical" :column="1" :size="size" border>
                        <el-descriptions-item label="专业建议">暂无 </el-descriptions-item>
                        <el-descriptions-item label="风险描述">较为危险</el-descriptions-item>
                        <el-descriptions-item label="改善建议">增强锻炼</el-descriptions-item>
                    </el-descriptions>
                </div>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogVisible = false">关闭</el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<script setup>
import TopForm from '@/components/TopForm.vue';
import { ref, reactive, computed, onMounted } from 'vue';
import { handleEmotionPage } from '@/api/admin';
import { handleRemoveEmotion } from '@/api/admin';
import { ElMessageBox, ElMessage } from 'element-plus';
const dialogVisible = ref(false)

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
const tableData = ref([])
const currentInfo = reactive({})
const handleSearch = async () => {
    const param = {
        ...pages,
        ...searchData
    }
    const res = await handleEmotionPage(param)
    tableData.value = res.records
    console.log(res.records)
}
const pages = reactive({
    current: 1,
    size: 10,
})
const searchData = reactive({})
onMounted(async () => {
    await handleSearch()
})
const handleShowDetail = (data) => {
    dialogVisible.value = true
    currentInfo.id = data.id
    currentInfo.username = data.username
    currentInfo.nickname = data.nickname
    currentInfo.userId = data.userId
    currentInfo.updatedAt = data.updatedAt
    currentInfo.moodScore = data.moodScore
    currentInfo.dominantEmotion = data.dominantEmotion
    currentInfo.sleepQuality = data.sleepQuality + '/5'
    currentInfo.stressLevel = data.stressLevel + '/5'
    currentInfo.emotionTriggers = data.emotionTriggers
    currentInfo.diaryContent = data.diaryContent
    currentInfo.dominantEmotion = data.dominantEmotion
    currentInfo.aiAnalysisStatus = data.aiAnalysisStatus
    console.log(data)
}
const handleRemove = (data) => {
    ElMessageBox.confirm(
        '确定要删除这条情绪记录吗',
        '警告',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    ).then(async () => {
        console.log(currentInfo.id + "1111")
        await handleRemoveEmotion(data.id)
        ElMessage({
            showClose: true,
            message: '删除成功！',
            type: 'success',
        })
    })
}
const handleReceive = (receiveData) => {
    //这里的代码有问题，提交了之后就没有筛选效果
    searchData.userId = receiveData.userID
    if (receiveData.moodScoreRange) {
        const tempt = receiveData.moodScoreRange.split("-")
        searchData.minMoodScore = tempt[0]
        searchData.maxMoodScore = tempt[1]
    }
    handleSearch()
}
</script>
<style scoped>
.table-container {
    margin-top: 30px;
}

.needMargin div {
    margin-bottom: 10px;
}
</style>