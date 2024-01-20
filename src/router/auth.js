import { Layout, SignIn, SignUp } from "@/views/auth"

export default {
  path: '/account',
  component: Layout,
  children: [
    { path: 'signin', component: SignIn },
    { path: 'signup', component: SignUp }
  ]
}
