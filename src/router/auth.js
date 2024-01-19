import { Layout, Login, Register } from "@/views/auth"

export default {
  path: '/account',
  component: Layout,
  children: [
    { path: 'login', component: Login },
    { path: 'register', component: Register }
  ]
}
