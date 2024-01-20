<script setup>
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

import { useAlertStore, useAuthStore } from '@/stores'

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email(),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 character')
});

async function onSubmit(values) {
  const alertStore = useAlertStore()
  const authStore = useAuthStore()

  try {
    const { name, email, password } = values
    await authStore.register(name, email, password)
    alertStore.success('Registration successful')
  } catch (error) {
    alertStore.error(error)
  }
}
</script>

<template>
  <Form class="form-signin" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
    <img class="mb-4" src="@/assets/images/bootstrap-solid.svg" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
    <label for="inputName" class="sr-only">Name</label>
    <Field type="text" id="inputName" name="name" class="form-control" placeholder="Name" :class="{ 'is-invalid': errors.name }" />
    <label for="inputEmail" class="sr-only">Email address</label>
    <Field type="email" id="inputEmail" name="email" class="form-control" placeholder="Email" :class="{ 'is-invalid': errors.email }" />
    <label for="inputPassword" class="sr-only">Password</label>
    <Field type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" :class="{ 'is-invalid': errors.password }" />
    <button class="btn btn-lg btn-primary btn-block" :disabled="isSubmitting">
      <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
      Sign up
    </button>
    <router-link to="signin" class="btn btn-link">Sign in</router-link>
    <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
  </Form>
</template>

<style scoped>
@import '@/assets/css/signin.css';
</style>
