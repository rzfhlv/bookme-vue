import { defineStore } from 'pinia'

export const useAlertStore = defineStore({
  id: 'alert',
  state: () => ({
    alert: null
  }),
  actions: {
    success(message) {
      this.alert = { message, type: 'alert-success' }
    },
    error(message) {
      this.alert = { message, type: 'alert-error' }
    },
    clear() {
      this.alert = null
    }
  },
});
