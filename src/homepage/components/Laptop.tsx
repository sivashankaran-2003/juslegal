import style from "./Laptop.module.css"
export default function Laptop() {
  return (
    <div className={style.container}>
      <div className={style.laptop}>
        <div className={style.upper}></div>
        <div className={style.lower}></div>
      </div>
    </div>
  )
}
