<template>
    <div class="container">
        <TopForm title="知识文章" :formItem="formItem" @search="handleSearch">
            <template #buttons>
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </template>
        </TopForm>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column label="文章标题" fixed="left">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon>
                            <timer />
                        </el-icon>
                        <span style="margin-left: 10px">{{ scope.row.title }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="分类" width="160">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon>
                            <timer />
                        </el-icon>
                        <span style="margin-left: 10px">{{ scope.row.categoryName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="authorName" label="作者" width="150" />
            <el-table-column prop="favoriteCount" label="阅读量" width="80" />
            <el-table-column prop="createdAt" label="发布时间" width="180" />
            <el-table-column label="分类" width="180" fixed="right">

                <template #default="scope">
                    <el-button type="primary" link @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button type="warning" link v-if="scope.row.status == 0" @click="handleDownline(scope.row)">
                        下线
                    </el-button>
                    <el-button type="success" link v-if="scope.row.status == 1" @click="handlePublish(scope.row)">
                        发布
                    </el-button>
                    <el-button type="danger" link @click="handleRemove(scope.row)">
                        删除
                    </el-button>
                </template>


            </el-table-column>
        </el-table>
        <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :total="pages.total" :size="pages.size"
                :currentPage="pages.currentPage" @current-change="handleCurrentChange" />
            <ArticleDialog :dialogVisible="dialogVisible" @update:visiblity="handleVisibility" :categories="categories"
                :editData="editData" @success="handleSuccess" />

        </div>
    </div>
</template>
<script setup>
import TopForm from '@/components/TopForm.vue';
import { categoryTree, articlePage } from '@/api/admin';
import { onMounted, ref, reactive, computed } from 'vue';
import ArticleDialog from '@/components/ArticleDialog.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { handleUpdateArticle } from '@/api/admin';
import { handleDeleteArticle } from '@/api/admin';
const tableData = ref([])
const dialogVisible = ref(false)
const handleVisibility = (vs) => {
    dialogVisible.value = vs
}
const handleCurrentChange = (val) => {
    pages.currentPage = val
    handleSearch()
}
const handleDownline = (row) => {
    ElMessageBox.confirm(
        '确定要将这篇文章下线吗',
        '注意',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    ).then(async () => {
        row.status = 1
        await handleUpdateArticle(row.id, row)
        await handleSearch()
        ElMessage({
            type: 'success',
            message: '文章已下线',
        })
    })
}
const handlePublish = (row) => {
    ElMessageBox.confirm(
        '确定要将这篇文章发布吗',
        '注意',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    ).then(async () => {
        row.status = 0
        await handleUpdateArticle(row.id, row)
        await handleSearch()
        ElMessage({
            type: 'success',
            message: '文章已发布',
        })
    })
}
const handleRemove = (row) => {
    ElMessageBox.confirm(
        '确定要删除这篇文章吗',
        '警告',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    ).then(async () => {
        await handleDeleteArticle(row.id)
        await handleSearch()
        ElMessage({
            type: 'success',
            message: '文章已删除',
        })
    })
}
const formItem = [{
    comp: 'elInput',
    placeholder: '请输入文章标题',
    title: '文章标题',
    prop: "articalName"
}, {
    comp: 'elSelect',
    placeholder: '请输入分类',
    title: '分类',
    prop: "category"
}, {
    comp: 'elSelect',
    placeholder: '选择状态',
    title: '状态',
    prop: "status",
    options: [{
        value: 0,
        label: "全部"
    },
    {
        value: 1,
        label: "草稿"
    },
    {
        value: 2,
        label: "已发布"
    }
        , {
        value: 3,
        label: "已下载"
    }]
}]
const pages = reactive({
    currentPage: 1,
    size: 10,
    total: 10
})
const handleSearch = async (e) => {
    const params = {
        ...e,
        ...pages
    }
    const res = await articlePage(params)
    console.log(111)
    console.log(res)
    tableData.value = res.records
    pages.total = res.total
}
const categories = ref([])
const categoryMap = reactive({})
onMounted(async () => {
    const res = await categoryTree()
    console.log(res)
    categories.value = res.map(item => {
        categoryMap[item.id] = item.categoryName
        return {
            label: item.categoryName,
            value: item.id
        }
    })
    handleSearch()
    formItem[1].options = categories.value
    console.log(categories)
    console.log(categoryMap)
})
const editData = ref(null)
const handleEdit = (e) => {
    editData.value = e
    dialogVisible.value = true
}
const handleAdd = () => {
    dialogVisible.value = true
    editData.value = null
}
const handleSuccess = (s) => {
    if (s == 'success') {
        handleSearch()
    }
}
</script>
<style scoped>
.table {
    margin-top: 30px;
}

.example-pagination-block+.example-pagination-block {
    margin-top: 10px;
}

.dialog {
    background-color: red;
}
</style>