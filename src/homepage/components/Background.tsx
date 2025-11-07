import { useScrollIntoView } from "@mantine/hooks"
import About from "./About"
import style from "./Background.module.css"

export default function Background() {
  return (
    <div className={style.container}>
      <div className="hidden md:block shape w-[90%] ">
        {/* Loop from 1 to 50 */}
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className={`shapeContainer--${i + 1} shape-animation`}>
            <div className="randomShape"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
