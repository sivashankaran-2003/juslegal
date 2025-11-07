import db from "db"
import * as z from "zod"
import { Ctx } from "blitz"

const updateUser = z.object({
    role: z.string(),
    id: z.string(),
})

export default function updateUserRole(input,ctx:Ctx){
    ctx.session.$authorize()
    const {id,role} = updateUser.parse(input)
    if(!["USER","LAWYER"].includes(role)){
        throw new Error("Role must be either USER or LAWYER")
    }
    return db.user.update({
        where: {id},
        data: {
            role,
            updatedRole: true
        }
    })
}

