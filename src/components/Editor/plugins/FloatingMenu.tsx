import { Editor, FloatingMenu as TipTapFloatingMenu } from '@tiptap/react'

type FloatingMenuProps = {
  editor: Editor
}
function FloatingMenu({ editor }: FloatingMenuProps) {
  if (!editor) return null
  return (
    <TipTapFloatingMenu
      className="floating-menu"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
    </TipTapFloatingMenu>
  )
}
export default FloatingMenu
