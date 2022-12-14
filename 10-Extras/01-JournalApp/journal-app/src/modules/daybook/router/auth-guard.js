import UserStore from '@/stores/users'

const isAuthenticatedGuard = async (to, from, next) => {
  const userStore = UserStore()
  userStore.isLoggedIn ? next() : next({ name: 'daybook-no-entry' })
}

export default isAuthenticatedGuard
