const isAuthenticatedGuard = async (to, from, next) => {
  console.log({ to, from, next })
  // ¿Podemos acceder?
  const authorized = await canAccess()
  // Si podemos, next, si no a error
  authorized ? next() : next({ name: 'Error' })
}

const canAccess = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const random = Math.random() * 100
      if (random > 50) {
        console.log('Autenticado')
        resolve(true)
      } else {
        console.log('Bloqueado por el beforeEach Guard')
        resolve(false)
      }
    }, 1000)
  })
}

export default isAuthenticatedGuard
