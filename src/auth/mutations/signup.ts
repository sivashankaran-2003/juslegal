import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Signup } from "src/auth/validations"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password, role }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  // check if the role is only either USER, LAWYER
  if (!["USER", "LAWYER"].includes(role)) {
    throw new Error("Role must be either USER or LAWYER")
  }
  //check if the email is already in the database
  const cuser = await db.user.findUnique({ where: { email } })
  if (cuser) {
    throw new Error("Email already in use")
  }
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: role, updatedRole: true },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })
  return user
})
