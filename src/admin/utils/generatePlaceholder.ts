// //@ts-nocheck

// export function generatePlaceholder(paragraph:string) {
//   //get al the html tags in the paragraph
//   const tags = paragraph.match(/<[^>]+>/g) as RegExpMatchArray
//   // console.log(tags);
//   //get all the text in the paragraph split by the tags
//   const texts = paragraph.split(/<[^>]+>/g) as string[]
//   // console.log(texts);

//   // loop over every text in the texts array and every text that has a length > 10 replace it with ...
//   for (let i = 0; i < texts.length; i++) {
//     if (i > 100) {
//       //if text does not have the pattern {ANYTHING} then skip it
//       if (!texts[i].match(/\{[^}]+\}/)) {
//         texts[i] = "..."
//         continue
//       }
//     }
//     if (texts[i].length > 15) {
//       // If text does not have the pattern {ANYTHING} then replace it with ...
//       if (!texts[i].match(/\{[^}]+\}/)) {
//         texts[i] = texts[i].substring(0, 15) + "..."
//       } else {
//         // Find the words just before and after the pattern {ANYTHING} and replace all other characters with ...
//         const temp = texts[i].split(" ")
//         //find all matches of the pattern {ANYTHING}
//         const matches = temp.filter((word) => word.match(/\{[^}]+\}/))
//         //console.log(matches);
//         texts[i] = ""
//         matches.map((match) => {
//           const index = temp.indexOf(match)
//           const before = temp.slice(index - 2, index).join(" ")
//           const after = temp.slice(index + 1, index + 3).join(" ")
//           texts[i] += "... " + before + " " + match + " " + after + " ..."
//         })
//       }
//     }
//   }

//   //add the tags back to the texts array
//   for (let i = 0; i < texts.length; i++) {
//     texts[i] = texts[i] + tags[i]
//   }

//   texts.splice(texts.indexOf("undefined"), 1)
//   // console.log(texts);

//   // join the texts array back to a string
//   const paragraph2 = texts.join("")
//   return paragraph2
// }
//@ts-nocheck
export function generatePlaceholder(paragraph: string) {
  const tags = paragraph.match(/<[^>]+>/g)
  // console.log(tags);
  //get all the text in the paragraph split by the tags
  const texts = paragraph.split(/<[^>]+>/g)
  // console.log(texts)

  //get first 25 lines in texts array
  //get 5% of the texts array
  const first5percent = Math.floor(texts.length * 0.05)
  console.log(texts.length)
  console.log(first5percent)
  const first25Lines = texts.slice(0, first5percent)
  // console.log(first25Lines)

  for (let i = 0; i < first25Lines.length; i++) {
    first25Lines[i] = first25Lines[i] + tags[i]
  }
  // console.log(first25Lines)

  const alert =
    '<div class="max-w-xl mx-auto text-center border-2 border-blue-500 p-5 shadow-md border-dashed"><h2 class="text-2xl font-bold sm:text-3xl">Uh oh, You have not payed yet!</h2><p class="mx-auto mt-4 text-gray-500">  Complete Payment to Access the Complete Template and Download as PDF</p><a  href=""  class="flex no-underline items-center justify-between px-5 py-3 mt-8 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 group">  <span class="text-lg font-medium group-hover:text-white">Pay To View Complete Template</span>  <span class="flex-shrink-0 p-2 ml-4 bg-white border border-blue-600 rounded-full"> <svg xmlns="http://www.w3.org/2000/svg"      class="w-5 h-5 -rotate-90"      fill="none"      viewBox="0 0 24 24"      stroke="currentColor"    >      <path        strokeLinecap="round"        strokeLinejoin="round"        strokeWidth="2"        d="M17 8l4 4m0 0l-4 4m4-4H3"      />    </svg>  </span></a></div>'

  //add the alret to the first25Lines array
  first25Lines.push(alert)
  // console.log(first25Lines)
  //get the next 15 lines in texts array
  const next15Lines = texts.slice(first5percent, 2 * first5percent)
  for (let i = 0, j = first5percent; i < next15Lines.length; i++, j++) {
    next15Lines[i] = next15Lines[i] + tags[j]
  }
  next15Lines.unshift('<div class="blur-sm select-none">')
  next15Lines.push("</div>")
  // console.log(next15Lines)

  first25Lines.push(...next15Lines)
  // console.log(first25Lines)

  //remove all null and undefined values from the array
  const cleanArray = first25Lines.filter(function (el) {
    return el != "null" && el != "undefined"
  })
  const cleanString = cleanArray.join("")
  return cleanString
}
