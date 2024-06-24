import { Router } from 'express'
import { readdirSync } from 'fs'

const router = Router()

readdirSync('./src/routes').forEach(async (file) => {
  const fileName = file.split('.')[0]
  const filePath = `../routes/${fileName}`
  const routeFile = await import(filePath)

  router.use(routeFile.default)
})

export default router
