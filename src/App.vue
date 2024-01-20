<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { Nav, Alert } from '@/components'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <Nav />
    <Alert />
    <main role="main" class="container">
      <RouterView />
    </main>
  </div>
</template>
