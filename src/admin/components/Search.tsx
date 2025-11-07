import { useQuery } from "@blitzjs/rpc";
import { Text, Group, Select } from "@mantine/core"
import { forwardRef, memo } from "react"
import { useRouter } from "next/router"
import getTemplates from "../queries/getTemplates"

function Search({ currentUser }) {
  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    label: string
    description: string
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  )
  // const currentUser = useCurrentUser()
  const [Templates] = useQuery(getTemplates, {
    where: { visibility: currentUser?.role != "ADMIN" ? {
        in: [currentUser?.role, "ALL"]
    }: undefined },
    select: {
      name: true,
      description: true,
      id: true,
    },
  },{suspense: false})
  //Take only the name and description from the Templates array and save it in the data aray
  const data = Templates?.map((template) => {
    return {
      label: template.name,
      description: template.description,
      value: template.name,
      id: template.id,
    }
  })
  const router = useRouter()
  return (
    <>
      <Select
        label="Search"
        radius="xl"
        placeholder="Seach For Templates"
        itemComponent={SelectItem}
        data={data || []}
        searchable
        onSearchChange={(value) => {
          const template = data?.find((template) => template.value === value)
          if (template) {
            router.push("/admin/render/[id]", `/admin/render/${template.id}`)
          }
        }}
        maxDropdownHeight={400}
        nothingFound="Nobody here"
        transition="scale-y"
        transitionDuration={500}
        transitionTimingFunction="ease"
        filter={(value, item) =>
          item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(value.toLowerCase().trim())
        }
      />
    </>
  )
}

export default memo(Search)
