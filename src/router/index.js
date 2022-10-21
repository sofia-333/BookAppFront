import VueRouter from "vue-router";
import SignUp from "@/components/auth/SignUp";
import LogIn from "@/components/auth/LogIn";
import BooksView from "@/components/books/BooksView";
import ForgotPassword from "@/components/auth/ForgotPassword";

export const routes = [{
    path: '/',
    redirect: '/books',
}, {
    path: '/signup',
    name: 'signup',
    component: SignUp
}, {
    path: '/login',
    name: 'login',
    component: LogIn,
}, {
    path: '/books',
    name: 'books',
    component: BooksView,
}, {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: ForgotPassword,
},
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if (!localStorage.token && to.path !== '/login' && to.path !== '/signup' && to.name !== 'forgotPassword') {
        next('/login')
    } else {
        next()
    }
});

export default router;