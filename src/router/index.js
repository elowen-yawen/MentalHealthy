import { createRouter, createWebHistory } from "vue-router";
import BackendLayout from "@/components/BackendLayout.vue";
const back = [
    {
        path: '/back',
        component: BackendLayout,
        redirect: '/back/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/DashBoard.vue'),
                meta: {
                    title: '数据分析',
                    icon: 'PieChart'
                }
            }, {
                path: 'knowledge',
                component: () => import('@/views/Knowledge.vue'),
                meta: {
                    title: '知识文章',
                    icon: 'ChatLineSquare'
                }
            },
            {
                path: 'consultations',
                component: () => import('@/views/Consultations.vue'),
                meta: {
                    title: '咨询记录',
                    icon: 'Message'
                }
            },
            {
                path: 'emotional',
                component: () => import('@/views/Emotional.vue'),
                meta: {
                    title: '情绪日志',
                    icon: 'User'
                }
            }
        ]
    }, {
        path: '/auth',
        component: () => import('@/components/AuthLayout.vue'),
        children: [{
            path: 'login',
            component: () => import('@/views/Login.vue')
        }, {
            path: 'register',
            component: () => import('@/views/Register.vue')
        }]
    }
]
const front=[
    {
        path:'/',
        component:()=>import('@/components/FrontendLayout.vue'),
        children:[
            {
                path:'home',
                component:()=>import('@/views/Home.vue')
            },
            {
                path:'consulation',
                component:()=>import('@/views/UserConsulation.vue')
            },
            {
                path:'/emotion-diary',
                component:()=>import('@/views/UserEmotionDiary.vue')
            },
            {
                path:'knowledge',
                component:()=>import('@/views/UserKnowledge.vue')
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: [...back,...front]
})

//前置守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (token) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo.userType == 2) {
            if (to.path.startsWith('/back')) {
                next()
            } else {
                next('/back/dashboard')
            }
        } else if (userInfo.userType == 1) {
            if(to.path.startsWith('/back')||to.path.startsWith('/auth')){
                next('/')
            }else{
                next()
            }
        }
    } else {
        if (to.path.startsWith('/back')) {
            next('/auth/login')
        }else{
            next()
        }
    }
})
export default router