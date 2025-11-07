import { useMantineColorScheme } from "@mantine/core"
export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  return (
    <button
      className="mode-switch"
      title="Switch Theme"
      onClick={() => {
        // add class dark to the html tag
        document.documentElement.classList.toggle("dark")
        toggleColorScheme()
      }}
    >
      <svg
        className="moon"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <defs></defs>
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
      </svg>
    </button>
  )
}
