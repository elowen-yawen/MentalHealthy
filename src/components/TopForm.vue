<template>
    <div class="container">
        <h2>{{ props.title }}</h2>
        <slot name="buttons"></slot>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props=defineProps(['title'])
</script>
<style scoped>
    
</style>