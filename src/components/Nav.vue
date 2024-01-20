<script setup>
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<template>
  <nav v-show="authStore.user" class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">Book Me</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <button @click="authStore.logout()" class="btn btn-secondary my-2 my-sm-0" type="button">
          Logout
        </button>
      </form>
    </div>
  </nav>
</template>
