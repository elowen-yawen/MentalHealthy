<template>
    <el-dialog v-model="prop.dialogVisible" title="新增文章" width="800" @close="handleClose">
        <el-form>
            <el-form-item label="文章标题">
                <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select v-model="formData.categoryId" placeholder="请选择分类">
                    <el-option v-for="p in prop.categories" :key="p" :value="p.label">{{ p.label }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要">
                <el-input v-model="formData.summary" placeholder="请输入文章摘要（可选）" type="textarea" max="1000" rows="4" />
            </el-form-item>
            <el-form-item label=" 标签 ">
                <el-select v-model="formData.tags" placeholder="请选择标签" multiple filterable allow-create
                    style="padding-left: 25px;">
                    <el-option v-for="p in commonTags" :key="p" :value="p" :label="p">{{ p }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面图片">
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
            <el-form-item label=" 标签 ">
                <RichTextEditor v-model="formData.content" placeholder="请输入文章内容" maxCharCount="5000"/>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<!-- const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容...'
  },
  maxCharCount: {
    type: Number,
    default: 2000
  },
  showWordCount: {
    type: Boolean,
    default: true
  },
  showSecurityTip: {
    type: Boolean,
    default: true
  },
  toolbarKeys: {
    type: Array,
    default: () => [
      'bold', 'italic', 'underline', 'color', 'bgColor', '|',
      'fontSize', 'fontFamily', '|',
      'header1', 'header2', 'header3', '|',
      'bulletedList', 'numberedList', 'blockquote', '|',
      'insertLink', '|',
      'undo', 'redo'
    ]
  },
  minHeight: {
    type: String,
    default: '300px'
  }
}) -->
<script setup>
import { ref, reactive, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { handleImageHttpRequest } from '@/api/admin';
import { fileFinalPath } from '@/config';
import RichTextEditor from './RichTextEditor.vue';
const prop = defineProps(['dialogVisible', 'categories'])
const emit = defineEmits(['update:visiblity'])
const commonTags = [
    '情绪管理', '焦虑', '抑郁', '压力', '睡眠',
    '冥想', '正念', '放松', '心理健康', '自我成长',
    '人际关系', '工作压力', '学习方法', '生活技巧'
]
const handleClose = () => {
    emit('update:visiblity', false)
}
const formData = reactive({})
const imgUrl = ref()
const beforeUpload = (file) => {
    console.log(file)
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
    console.log(res);
    imgUrl.value = fileFinalPath + res.filePath
}
const handleRemoveImage = () => {
    imgUrl.value = ''

}
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
</style>
