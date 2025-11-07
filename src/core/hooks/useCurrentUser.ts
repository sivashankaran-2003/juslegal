import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null,{suspense: false})
  return user
}
