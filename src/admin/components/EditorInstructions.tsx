export default function EditorInstructions({ subtemplate = false }) {
  return (
    <>
      <p className="mt-2 text-3xl font-bold sm:text-5xl p-5">
        {subtemplate ? "Subtemplate" : "Template"} Editor
      </p>
      {/* Instructions to Use the Editor  */}
      <h2 className="font-bold text-2xl">Instructions To Use the Editor</h2>
      <p className="block">
        Create desired templates using the editor window. Use the &#123;type|name&#125; to create
        new input fields for the template as required.{" "}
      </p>
      {!subtemplate ? (
        <p>
          Use the &#123;person|data&#125; block to store the values of the names and address of the
          people in the template
        </p>
      ) : (
        <p>
          Use the &#123;block|data&#125; to consume the data stored in the main template as a
          multi-select dropdown{" "}
        </p>
      )}
    </>
  )
}
