import { defineStore } from "pinia";
import { ref } from "vue";
export const adminStore=defineStore('adminStore',()=>{
    const isCollapse=ref(false)
    const changeCollapse=()=>{
        isCollapse.value=!isCollapse.value
        console.log(11)
    }
    return {
        isCollapse,
        changeCollapse
    }
})