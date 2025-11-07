import { Avatar } from '@mantine/core';

const UserInfo = ({ currentUser }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          color="cyan"
          radius="xl"
        >
          {/* {currentUser?.email} */}
          {/* get first letter of email */}
          {currentUser?.email[0]}
          </Avatar>
        <p style={{ padding: "2px" }}>
          {currentUser?.email} [{currentUser?.role}]
        </p>
      </div>
    </>
  )
}

export default UserInfo
