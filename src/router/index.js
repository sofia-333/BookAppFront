import store from "@/store";
import VueRouter from "vue-router";
import SignUp from "@/components/auth/SignUp";
import LogIn from "@/components/auth/LogIn";
import BooksView from "@/components/books/BooksView";

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
},
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    if (!store.state.auth.token && to.path !== '/login'&& to.path !== '/signup') {
        next('/login')
    }
    else {
        next()
    }
});

export default router;