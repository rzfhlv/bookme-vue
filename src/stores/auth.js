import { defineStore } from 'pinia'

import { router } from '@/router'
import { useAlertStore } from './alert'

import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_APP_URL}`

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async register(name, email, password) {
      try {
        await axios.post(baseUrl + '/register', {
          name: name,
          email: email,
          password: password
        })
        .then((response) => {
          console.log(response)
          this.user = response.data.data.user
          localStorage.setItem('user', JSON.stringify(this.user))
          localStorage.setItem('token', response.data.data.access_token)
        })

        router.push(this.returnUrl || '/')
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error)
      }
    },
    async login(email, password) {
      try {
        await axios.post(baseUrl + '/login', {
          email: email,
          password: password
        })
        .then((response) => {
          console.log(response)
          this.user = response.data.data.user
          localStorage.setItem('user', JSON.stringify(response.data.data.user))
          localStorage.setItem('token', response.data.data.access_token)
        })
      
        router.push(this.returnUrl || '/')
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error)
      }
    },
    async logout() {
      try {
        console.log('ada')
        await axios.post(baseUrl + '/logout', null, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          console.log(response)
          this.user = null
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        })

        router.push('/account/signin')
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error)
      }
    }
  }
})
