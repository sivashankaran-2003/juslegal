import db from "db"

export default async function getCategories() {
  return db.category.findMany(
    {
      select: {
        name: true,
      },
    }
  )
}
