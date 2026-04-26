<template>
    <el-dialog v-model="prop.dialogVisible" :title="isEditor ? '编辑文章' : '新增文章'" width="800" @close="handleClose">
        <el-form ref="formRef" :rules="rules" :model="formData">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item label="所属分类" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择分类">
                    <el-option v-for="p in prop.categories" :key="p" :value="Number(p.value)"
                        :label="p.label"></el-option>
                </el-select>
                <!-- //value是内层的数值，但是label是显示在外面的标签 -->
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
                <el-input v-model="formData.summary" placeholder="请输入文章摘要（可选）" type="textarea" max="1000" rows="4" />
            </el-form-item>
            <el-form-item label=" 标签 " prop="tags">
                <el-select v-model="formData.tags" placeholder="请选择标签" multiple filterable allow-create
                    style="padding-left: 25px;">
                    <el-option v-for="p in commonTags" :key="p" :value="p" :label="p">{{ p }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面图片" prop="coverImage">
                <div style="display: flex; flex-direction: column; align-items: flex-start;">

                    <el-upload v-model="formData.coverImage" class="upload-demo" action="#"
                        :before-upload="beforeUpload" :http-request="handleHttpUpload" :show-file-list="false"
                        accept="image/*">
                        <div class="cover-img" v-if="!imgUrl">点击上传图片</div>
                        <img :src="imgUrl" alt="" v-else style="width: 200px; height: 120px; display: block;">
                    </el-upload>

                    <div v-if="imgUrl" style="margin-top: 10px;">
                        <el-button type="danger" @click="handleRemoveImage">
                            点击移除列表
                        </el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <RichTextEditor v-model="formData.content" placeholder="请输入文章内容" maxCharCount="5000"
                    @created="handleCreated" @change="handleChange" />
            </el-form-item>
            <div class="preview" v-if="overview">
                <h4>预览效果</h4>
                <div v-html="formData.content"></div>
            </div>
            <div class="footer">
                <el-button @click="overview = !overview">预览效果</el-button>
                <el-button type="warning" @click="handleClose">取消</el-button>
                <el-button type="danger" @click="handleSubmit">{{ isEditor ? '编辑' : '创建' }}</el-button>
            </div>
        </el-form>

    </el-dialog>
</template>
<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { handleImageHttpRequest } from '@/api/admin';
import { fileFinalPath } from '@/config';
import RichTextEditor from './RichTextEditor.vue';
import { handleNewArticle } from '@/api/admin';
const prop = defineProps(['dialogVisible', 'categories', 'editData'])
const emit = defineEmits(['update:visiblity'])
const commonTags = [
    '情绪管理', '焦虑', '抑郁', '压力', '睡眠',
    '冥想', '正念', '放松', '心理健康', '自我成长',
    '人际关系', '工作压力', '学习方法', '生活技巧'
]
const handleClose = () => {
    if (formRef.value) {
        formRef.value.resetFields()
    }

    Object.keys(formData).forEach(item => {
        delete formData[item]
    })
    imgUrl.value = ''

    emit('update:visiblity', false)
}
const formData = reactive({})
watch(() => prop.editData, (newVal) => {
    if (newVal) {
        formData.title = newVal.title
        formData.categoryId = newVal.categoryId
        formData.summary = newVal.summary
        formData.tags = newVal.tags.split(",")
        formData.coverImage = newVal.coverImage
        imgUrl.value = newVal.coverImage
        formData.content = newVal.content
    }
})
const imgUrl = ref()
const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    const isLt5M = file / 1024 / 1024 < 5
    if (!isImage) {
        ElMessage.error("上传封面图片，请选择图片文件")
        return false
    }
    // if(!isLt5M){
    //     ElMessage.error("上传的文件应少于5M")
    //     return false
    // }
    return true
}
const handleHttpUpload = async ({ file }) => {
    const businessInfo = {}
    businessInfo.businessId = crypto.randomUUID()
    const res = await handleImageHttpRequest(file, businessInfo)
    imgUrl.value = fileFinalPath + res.filePath
    formData.coverImage = imgUrl.value
}
const handleRemoveImage = () => {
    imgUrl.value = ''
    formData.coverImage = ''
}
const handleCreated = () => {
    console.log("创造完成了")
}
const handleChange = (value) => {
    formData.content = value.html
}
const overview = ref(false)
const formRef = ref()
const rules = reactive({
    title: {
        required: true,
        message: "输入不能为空",
        trigger: 'blur'
    },
    categoryId: {
        required: true,
        message: "输入不能为空",
        trigger: 'blur'
    },
    summary: {
        required: false
    },
    tags: {
        type: 'array',
        required: true,
        message: "至少选择一个标签",
        trigger: 'change'
    },
    coverImage: {
        required: true,
        message: "至少选择一个封面",
        trigger: "change"
    },
    content: [{
        required: true,
        trigger: "change"
    }, {
        min: 5,
        max: 50000,
        message: "请输入5-5000个以上的字符"
    }]
})
const handleSubmit = async () => {
    await formRef.value.validate(async (valid, fields) => {
        if (valid) {
            // 1. 深拷贝或组装一个新的提交对象，不去污染页面上正在绑定的 formData
            const submitData = {
                ...formData,
                tags: formData.tags.join(","), // 这里转成字符串
                id: crypto.randomUUID() // 截图要求是 string，用 UUID 最标准
            }

            console.log('最终发给后端的参数：', submitData)

            try {
                // 2. 发送新组装好的数据
                const res = await handleNewArticle(submitData)
                console.log('创建成功结果：', res)
                ElMessage.success("文章创建成功！")
                handleClose() // 成功后关闭弹窗
            } catch (error) {
                console.error("请求失败：", error)
                // 如果跳登录了，说明依然报错，请看浏览器 F12 的 Network 面板
            }

        } else {
            console.log('表单校验失败', fields)
        }
    })
}
const isEditor = computed(() => {
    return !!(prop.editData != null)
})
</script>
<style>
.cover-img {
    width: 200px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #8b9491;
    background: #f6f8fa;
}

.footer {
    display: flex;
    justify-content: flex-end;
}
</style>
