<template>
    <div class="container">
        <div class="header" style="width:100%;display: flex;justify-content: space-between;margin-bottom: 20px;">
            <h2>{{ props.title }}</h2>
            <slot name="buttons"></slot>
        </div>

        <el-form :model="formData" label-width="auto" style="max-width: 600px" ref="ruleFormRef">
            <el-row :gutter="24">
                <el-col :span="p.span" v-for="p in formItemAttr" :key="p.title">
                    <el-form-item :label="p.title" :prop="p.prop">
                        <component :is="p.comp" :placeholder="p.placeholder" v-model="formData[p.prop]" style="width: 100%">
                            <template v-if="p.comp == 'elSelect'">
                                <!-- v-show是通过修改display的属性值来进行的，但是template并不会生成真实的dom,
                         所以两者相互结合无效 -->
                                <el-option v-for="i in p.options" :key="i.value" :label="i.label" :value="i.value" />
                            </template>
                        </component>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-button type="primary" @click="handleSearch">提交</el-button>
                    <el-button @click="handleReset(ruleFormRef)">重置</el-button>
                </el-col>
            </el-row>

        </el-form>
    </div>
</template>
<script setup>
import { computed, defineProps, reactive, ref } from 'vue';
const props = defineProps({
    title: String,
    formItem: {
        type: Array,
        default: () => []
    }
});
const ruleFormRef = ref()
const emit = defineEmits(['search'])
const formData = reactive({})
const formItemAttr = computed(() => {
    if (!props.formItem) {
        return [];
    }
    console.log(props.formItem)
    props.formItem.forEach(item => {
        item.span = { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }
    });
    return props.formItem
})
const handleSearch = () => {
    console.log(formData)
    emit('search', formData)
}
const handleReset = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    handleSearch(formEl)
}
</script>
<style scoped></style>