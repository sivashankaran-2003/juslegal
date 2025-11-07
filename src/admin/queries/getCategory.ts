import db from 'db'
import * as z from 'zod'
import { Ctx } from 'blitz'

const Category  = z.object({
    id: z.string(),
})

export default async function getCategory(input, ctx:Ctx) {
    ctx.session.$authorize()
    const { id } = Category.parse(input)
    const templates = await db.template.findMany({
        where: {
            //@ts-ignore
            categoryIds: {
                has: id
            }
        },
    })
    return templates
}