//Generated random colors from #096c86 , #fee4cb, #c8f7dc, #ffd3e2, #d5deff
const colors = ["#d5deff"]
// const colors = ["#fee4cb", "#c8f7dc", "#ffd3e2", "#d5deff"]

//allote the colors to the projects in the order of the projects
function nextColor(index: number) {
  return colors[index % colors.length]
}

export default nextColor
