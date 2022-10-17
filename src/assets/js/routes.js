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
    component: LogIn
}, {
    path: '/books',
    name: 'books',
    component: BooksView,
},
]