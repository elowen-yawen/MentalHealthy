<template>
    <el-dialog v-model="prop.dialogVisible" title="新增文章" width="500" @close="handleClose">
        <el-form>
            <el-form-item label="文章标题">
                <el-input v-model="formData.articlName" />
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select v-model="formData.category" placeholder="请选择分类">
                    <el-option v-for="p in prop.categories" :key="p" :value="p.label">{{ p.label }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要">
                <el-input v-model="formData.define" placeholder="请输入文章摘要（可选）" type="textarea" max="1000" rows="4" />
            </el-form-item>
            <el-form-item label="封面图片">
                <el-upload v-model="formData.uploadImg" class="upload-demo"
                    action="#" multiple
                    :before-upload="beforeUpload"
                    :http-request="handleHttpUpload"
                    accept="images/*">
                    <div class="cover-img" v-if="!imgUrl">点击上传图片</div>
                    <img :src="imgUrl" alt="" v-else>
                </el-upload>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { ref, reactive, computed ,updated} from 'vue';
import { ElMessage } from 'element-plus';
//关于elmessage的使用
const prop = defineProps(['dialogVisible', 'categories'])
const emit = defineEmits(['update:visiblity'])
const handleClose = () => {
    emit('update:visiblity', false)
}
const formData = reactive({})
const imgUrl=ref()
const beforeUpload=(file)=>{
    const isImage=file.type.startsWith('image/')
    const isLt5M=file/1024/1024<5
    if(!isImage){
        ElMessage.error("上传封面图片，请选择图片文件")
        return false
    }
    if(!isLt5M){
        ElMessage.error("上传的文件应少于5M")
        return false
    }
    return true
}
const handleHttpUpload=()=>{

}
</script>
<style>
.cover-img{
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