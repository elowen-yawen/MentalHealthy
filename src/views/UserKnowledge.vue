<template>
    <div class="knowledge-container">
        <div class="header-section">
            <div class="header-content">
                <el-image :src="imge" style="width: 60px;
                height: 60px;"></el-image>
                <h1>知识库</h1>
            </div>
        </div>
        <div class="content">
            <div class="recommend-section">
                <div class="section-title">推荐阅读</div>
                <div class="recommend-list">
                    <div class="recommend-item" v-for="item in recommedList" :key="item.id"
                        @click="gotoArticle(item.id)">
                        <div class="flex-box">
                            <h4>{{ item.title }}</h4>
                            <p class="read-count">
                                <el-icon>
                                    <Histogram />
                                </el-icon>
                                <span>阅读量：{{ item.readCount }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="article-list">
                <div class="article-item" v-for="item in articleList" :key="item.id" @click="gotoArticle(item.id)">
                    <el-image :src="getImage(item.coverImage)" style="width: 240px;
                    height: 150px;"></el-image>
                    <div class="info">
                        <div class="title">
                            <h3>{{ item.title }}</h3>
                            <el-tag Plain type="primary">{{ item.categoryName }}</el-tag>
                        </div>
                        <div style="margin-top: 10px;">
                            <div class="flex-box" style="display: flex;flex-direction: row;margin-top: 10px;">
                                <p><el-icon>
                                        <Avatar />
                                    </el-icon>
                                    <span>
                                        {{ item.authorName }}
                                    </span>
                                </p>
                            </div>
                            <div class="flex-box" style="display: flex;flex-direction: row;margin-top: 10px;">
                                <p><el-icon>
                                        <List />
                                    </el-icon>
                                    <span>
                                        {{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}
                                    </span>
                                </p>
                            </div>
                            <div class="flex-box" style="display: flex;flex-direction: row;margin-top: 10px;">
                                <p><el-icon>
                                        <Platform />
                                    </el-icon>
                                    <span>
                                        观看人数{{ item.readCount }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="pagination-wrapper">
            <el-pagination style="margin-top: 25px;" :page-size="pagination.size" :current-page="pagination.currentPage" layout="prev,pager,next"
                :total="pagination.total" @current-change="handleChange">

            </el-pagination>
        </div>
    </div>
</template>
<script setup>
import { getKnowledgeData } from '@/api/admin';
import { Avatar, Histogram, Platform } from '@element-plus/icons-vue';
import { dayjs } from 'element-plus';
import { ref, computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
const imge = new URL('@/assets/book.png', import.meta.url).href
const router=useRouter()
const recommedList = ref([])
const pagination = reactive({
    currentPage: 1,
    size: 10,
    total: 0
})
const articleList = ref([])
const getPageList = () => {
    const params = {
        sortField: 'publishedAt',
        sortDirection: 'desc',
        ...pagination
    }
    getKnowledgeData(params).then(res => {
        articleList.value = res.records
        pagination.total = res.total
    })
}
onMounted(() => {
    const params = {
        sortField: 'readCount',
        sortDirection: 'desc',
        currentPage: 1,
        size: 5
    }
    getPageList()
    getKnowledgeData(params).then(res => {
        recommedList.value = res.records
    })
})
const getImage = (url) => {
    return url ? 'http://159.75.169.224:1235' + url : 'https://file.itndedu.com/psychology_ai.png'
}
const handleChange = (val) => {
    pagination.currentPage = val
    getPageList()
}
const gotoArticle = (id) => {
    router.push(`/knowledge/article/${id}`)
}
</script>
<style lang="scss">
.knowledge-container {
    background: linear-gradient(135deg, #fafbfc 0%, #f7f9fc 50%, #f2f6fa 100%);

    .flex-box {
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        span {
            margin-left: 10px;
        }
    }

    .header-section {
        background: linear-gradient(135deg, #f59e0b 0%, #8b5cf6 100%);
        color: white;
        padding: 48px;

        .header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }

    .content {
        display: flex;
        gap: 20px;
        margin: 0 auto;
        width: 1200px;
        padding: 20px;

        .recommend-section {
            width: 280px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            padding: 15px;
            height: 400px;

            .section-title {
                font-size: 12;
                font-weight: 600;
                color: #374151;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .recommend-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .recommend-item {
                    border-left: 4px solid #f59e0b;
                    padding-left: 10px;
                    cursor: pointer;

                    .read-count {
                        margin-top: 15px;
                        font-size: 12px;
                        color: #6b7280;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                }
            }
        }

        .article-list {
            flex: 1;

            .article-item {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                padding: 15px;
                margin-bottom: 20px;
                display: flex;

                .info {
                    margin-left: 20px;

                    .title {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                }
            }
        }
    }

    .pagination-wrapper {
        display: flex;
        justify-content: center;
        padding-bottom: 30px;
    }
}
</style>