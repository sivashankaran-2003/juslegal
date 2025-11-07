import { useQuery } from "@blitzjs/rpc";
import { memo } from "react"
import countTemplates from "../queries/countTemplates"

const NumberOfTemplates = ({ currentUser }) => {
  const [countTemplateQuery] = useQuery(countTemplates, {
    where: { visibility: {
        in: [currentUser?.role, "ALL"]
    }},
  },{suspense: false})
  return (
    <>
      <span className="status-number">{countTemplateQuery}</span>
    </>
  )
}

export default memo(NumberOfTemplates)
