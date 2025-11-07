import db from 'db'
import * as z from "zod"
import { Ctx } from 'blitz'
//get the template with the given id and delete it

const GetProject = z.object({
    id: z.any(),
})

type GetProjectInput = z.infer<typeof GetProject>

export default async function deleteTemplate(input: GetProjectInput, ctx:Ctx) {
    ctx.session.$authorize('ADMIN')

    const data = GetProject.parse(input)

    const template = await db.template.findUnique({
        where: {
            id: data.id
        },
    })

    if (!template) throw new Error('Template not found')

    //console.log("template", template)

    //delete all the pdfs with the given template id
    await db.pDF.deleteMany({
        where: {
            templateId: template.id
        }
    })
    
    await db.subtemplate.deleteMany({
        where: {
            templateId: template.id
        }
    })

    await db.template.delete({
        where: {
            id: template.id
        },
    })

    return template
}

