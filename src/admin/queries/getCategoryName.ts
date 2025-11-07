import db from 'db'
import * as z from 'zod'
import { Ctx } from 'blitz'

const Category  = z.object({
    id: z.array(z.string())
})

export default async function getCategoryName(input, ctx:Ctx) {
    ctx.session.$authorize()

    const { id } = Category.parse(input)
    const category = await db.category.findMany({
        where: {
            id: {
                in: id
            }
        },
        select: {
            name: true,
        }
    })
    console.log(category);
    return category
}