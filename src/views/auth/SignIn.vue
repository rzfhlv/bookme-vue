<script setup>
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

import { useAlertStore, useAuthStore } from '@/stores'

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required').email(),
  password: Yup.string().required('Password is required')
});

async function onSubmit(values) {
  const alertStore = useAlertStore()
  const authStore = useAuthStore()

  try {
    const { email, password } = values
    await authStore.login(email, password)  
  } catch (error) {
    alertStore.error(error)
  }
}
</script>

<template>
  <Form class="form-signin" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
    <img class="mb-4" src="@/assets/images/bootstrap-solid.svg" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <Field type="email" id="inputEmail" name="email" class="form-control" placeholder="Email" :class="{ 'is-invalid': errors.email }" />
    <label for="inputPassword" class="sr-only">Password</label>
    <Field type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" :class="{ 'is-invalid': errors.password }" />
    <button class="btn btn-lg btn-primary btn-block" :disabled="isSubmitting">
      <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
      Sign in
    </button>
    <router-link to="signup" class="btn btn-link">Sign up</router-link>
    <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
  </Form>
</template>

<style scoped>
@import '@/assets/css/signin.css';
</style>