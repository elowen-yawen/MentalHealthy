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
                    <el-button type="warning" link>
                        发布
                    </el-button>
                    <el-button type="danger" link>
                        删除
                    </el-button>
                </template>


            </el-table-column>
        </el-table>
        <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :total="pages.total" :size="pages.size" />
            <ArticleDialog :dialogVisible="dialogVisible" @update:visiblity="handleVisibility"
                :categories="categories" :editData="editData"/>

        </div>
    </div>
</template>
<script setup>
import TopForm from '@/components/TopForm.vue';
import { categoryTree, articlePage } from '@/api/admin';
import { onMounted, ref, reactive, computed } from 'vue';
import ArticleDialog from '@/components/ArticleDialog.vue';
const tableData = ref([])
const dialogVisible = ref(false)
const handleVisibility = (vs) => {
    dialogVisible.value = vs
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
    currentPage: 5,
    size: 1,
    total: 10
})
const handleSearch = async (e) => {
    console.log(e)
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
const editData=ref(null)
const handleEdit = (e) => {
    editData.value=e
    dialogVisible.value=true
}
const handleAdd=()=>{
    dialogVisible.value = true
    editData.value=null
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