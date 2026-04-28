<template>
    <div class="dashboard-container" style="width: 100%;">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card v-if="aiData.systemOverview">
                    <div class="card-content">
                        <div class="avatar">
                            <el-image :src="img1" class="users"></el-image>
                        </div>
                        <div class="info">
                            <p style="color: grey;">用户总数</p>
                            <p>{{ aiData.systemOverview.totalUsers }}</p>
                            <p style="color: grey;">活跃用户：{{ aiData.systemOverview.activeUsers }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card v-if="aiData.systemOverview">
                    <div class="card-content">
                        <div class="avatar">
                            <el-image :src="img2" class="like"></el-image>
                        </div>
                        <div class="info">
                            <p style="color: grey;">情绪日志</p>
                            <p>{{ aiData.systemOverview.totalDiaries }}</p>
                            <p style="color: grey;">今日新增：{{ aiData.systemOverview.todayNewDiaries }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card v-if="aiData.systemOverview">
                    <div class="card-content">
                        <div class="avatar">
                            <el-image :src="img3" class="comments"></el-image>
                        </div>
                        <div class="info">
                            <p style="color: grey;">咨询对话</p>
                            <p>{{ aiData.systemOverview.totalSessions }}</p>
                            <p style="color: grey;">今日新增：{{ aiData.systemOverview.todayNewSessions }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card v-if="aiData.systemOverview">
                    <div class="card-content">
                        <div class="avatar">
                            <el-image :src="img4" class="smile"></el-image>
                        </div>
                        <div class="info">
                            <p style="color: grey;">平均情绪</p>
                            <p>{{ aiData.systemOverview.avgMoodScore }}/10</p>
                            <p style="color: grey;">情绪健康指数</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="12">
                <el-card style="width: 100%">
                    <template #header>
                        <div class="card-container">情绪趋势分析</div>
                    </template>
                    <div class="chart-content">
                        <div ref="emotionChart" style="width: 100%;
                        height: 100%;"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card style="width: 100%" v-if="aiData.consultationStats">
                    <template #header>
                        <div class="card-container">咨询会话统计</div>
                    </template>
                    <div class="chart-content">
                        <div class="consultation-stats">
                            <div class="stat-item">
                                <div class="stat-label">总会话数</div>
                                <div class="stat-value">{{ aiData.consultationStats.totalSessions }}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">平均时长(分)</div>
                                <div class="stat-value">{{ Math.round(aiData.consultationStats.avgDurationMinutes / 60)
                                    }}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">活跃用户</div>
                                <div class="stat-value">{{ aiData.systemOverview.activeUsers }}</div>
                            </div>
                        </div>
                        <div ref="consultationChartRef" style="width: 100%; height: 270px;"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { handleComplicateInfo } from '@/api/admin'
import * as echarts from 'echarts'
import { nextTick } from 'vue'
const img1 = new URL('@/assets/users.png', import.meta.url).href
const img2 = new URL('@/assets/like.png', import.meta.url).href
const img3 = new URL('@/assets/comments.png', import.meta.url).href
const img4 = new URL('@/assets/smile.png', import.meta.url).href
const aiData = ref({})
onMounted(async () => {
    const res = await handleComplicateInfo()
    console.log(res)
    aiData.value = res
    nextTick(() => {
        initCharts()
    })
    console.log(aiData.value)
})
const emotionChart = ref()
const initCharts = async () => {
    initEmotionChart()
    initconsultationChart()
}
const consultationChartRef = ref()
const initEmotionChart = () => {
    if (!emotionChart.value) return
    const myChart = echarts.init(emotionChart.value);
    const xData = aiData.value.emotionTrend.map(item => item.date)
    const yData1 = aiData.value.emotionTrend.map(item => item.avgMoodScore)
    const yData2 = aiData.value.emotionTrend.map(item => item.recordCount)
    console.log(111)
    console.log(xData)
    let option = {
        title: {
            text: '情绪趋势分析',
            top: '0px'
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: xData
        },
        grid: {
            top: '20px',
            left: '10px',
            bottom: '10px',
            right: '20px'
        },
        yAxis: {
            type: 'value'
        },
        legend: {
            data: ['平均情绪评分', '记录数量'],
            top: '30px'
        },
        series: [{
            name: '平均情绪评分',
            type: 'line',
            data: yData1,
            smooth: true
        }, {
            name: '记录数量',
            type: 'line',
            data: yData2,
            smooth: true
        }]
    }
    myChart.setOption(option);
}
const initconsultationChart = () => {
    // 1. 检查 DOM 和数据是否存在
    if (!consultationChartRef.value) return;
    if (!aiData.value.consultationStats || !aiData.value.consultationStats.dailyTrend) {
        console.warn('咨询趋势数据未就绪');
        return;
    }

    const myChart = echarts.init(consultationChartRef.value);

    // 2. 正确获取数组引用
    const trendData = aiData.value.consultationStats.dailyTrend;

    const option = {
        title: {
            text: '咨询活动统计',
            textStyle: { fontSize: 14, fontWeight: 600 },
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['会话数量', '参与用户数'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 70,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            // 修正映射路径
            data: trendData.map(item => item.date),
            axisLabel: { interval: 5 } // 如果日期太密，隔5个显示一个
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '会话数量',
                type: 'bar',
                // 修正映射路径，根据截图，属性名应为 sessionCount
                data: trendData.map(item => item.sessionCount),
                itemStyle: { color: '#74b9ff' }
            },
            {
                name: '参与用户数',
                type: 'bar',
                // 修正映射路径，根据截图，属性名应为 userCount
                data: trendData.map(item => item.userCount),
                itemStyle: { color: '#fdcb6e' }
            }
        ]
    };
    myChart.setOption(option);
}
</script>
<style lang="scss" scoped>
.dashboard-container {
    .card-content {
        display: flex;
        align-items: center;

        .avatar {
            margin-right: 12px;
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;

            .users {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

            }

            .like {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            }

            .comments {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            }

            .smile {
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            }
        }

        .info {
            .title {
                font-size: 14px;
                color: #7f8c8d;
                margin-bottom: 4px;
            }

            .value {
                font-size: 24px;
                font-weight: 700;
                color: #2c3e50;
                margin-bottom: 4px
            }

            .subtitle-title {
                font-size: 12px;
                color: #95a5a6;
            }
        }
    }

    .chart-content {
        padding: 20px;
        height: 300px;
        position: relative;

        canvas {
            width: 100% !important;
            height: 100% !important;
        }

        .consultation-stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;

            .stat-item {
                text-align: center;

                .stat-label {
                    font-size: 12px;
                    color: #7f8c8d;
                    margin-bottom: 4px;
                }

                .stat-value {
                    font-size: 18px;
                    font-weight: 600;
                    color: #2c3e50;
                }
            }
        }
    }
}

.dashboard-container p {
    font-size: 12px;
}
</style>