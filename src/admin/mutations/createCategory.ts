import db from 'db'
import * as z from 'zod'
import { Ctx } from 'blitz'

const createCat = z.object({
    name: z.string().min(1).max(100),
})

type CreateCatInput = z.infer<typeof createCat>

export default async function createCategory(input: CreateCatInput, ctx: Ctx) {
    ctx.session.$authorize('ADMIN')
    const { name } = createCat.parse(input)
    const category = await db.category.create({
        data: {
            name: name,
        }
    })
    return category
}