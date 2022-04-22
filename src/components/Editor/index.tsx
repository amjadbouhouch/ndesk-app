import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import type { Extensions } from '@tiptap/react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { htmlToMarkdown } from 'components/Editor/helpers/turndown'
// import lowlight from 'lowlight'
import React from 'react'
import { PlaceholderPlugin } from './plugins'
import { Popover } from './Popover'
// import { pageStore, useCurrentPage } from 'renderer/stores/store'

// import { Toolbar } from './Toolbar';

type EditorProps = {
  content?: string
  editable?: boolean
  // withToolbar?: boolean;
  withPopover?: boolean
  // withTypographyExtension?: boolean;
  withLinkExtension?: boolean
  withCodeBlockLowlightExtension?: boolean
  withTaskListExtension?: boolean
  // withPlaceholderExtension?: boolean;
  // withMentionSuggestion?: boolean;
  // withEmojiSuggestion?: boolean;
  // withEmojisReplacer?: boolean;
  // withHexColorsDecorator?: boolean;
}

const Editor = ({
  content = '',
  editable = true,
  // withToolbar = false,
  withPopover = true,
  withLinkExtension = false,
  withCodeBlockLowlightExtension = false,
  withTaskListExtension = false
}: // withPlaceholderExtension = false,
// withMentionSuggestion = false,
// withEmojiSuggestion = false,
// withEmojisReplacer = false,
// withHexColorsDecorator = false,
EditorProps) => {
  // const currentPage = useCurrentPage().get()
  // console.log(currentPage)
  const extensions: Extensions = [
    StarterKit.configure({
      ...(withCodeBlockLowlightExtension && { codeBlock: false })
    }),
    PlaceholderPlugin
  ]

  if (withLinkExtension) {
    extensions.push(
      Link.configure({
        linkOnPaste: false,
        openOnClick: false
      })
    )
  }

  // if (withCodeBlockLowlightExtension) {
  //   extensions.push(
  //     CodeBlockLowlight.configure({
  //       lowlight
  //     })
  //   )
  // }

  if (withTaskListExtension) {
    extensions.push(TaskList, TaskItem)
  }

  // if (withMentionSuggestion) {
  //   extensions.push(MentionSuggestion);

  //   /* extensions.push(
  //       MentionSuggestion.configure({
  //           suggestion: {
  //               char: '+',
  //           },
  //       }),
  //   ) */
  // }

  // if (withEmojiSuggestion) {
  //   extensions.push(EmojiSuggestion);
  // }

  // if (withEmojisReplacer) {
  //   extensions.push(EmojiReplacer);
  // }

  // if (withHexColorsDecorator) {
  //   extensions.push(HexColorDecorator);
  // }

  const [editorHtmlContent, setEditorHtmlContent] = React.useState(content)
  const [turndownMarkdownContent, setTurndownMarkdownContent] =
    React.useState('')

  const editor = useEditor({
    content: `<h2>
    Hi there,
  </h2>
  <p>
    this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>
  <p>
    Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code class="language-css">body {
display: none;
}</code></pre>
  <p>
    I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <blockquote>
    Wow, that’s amazing. Good work, boy! 👏
    <br />
    — Mom
  </blockquote>
`,
    extensions,
    editable,
    onUpdate: ({ editor }) => {
      setEditorHtmlContent(editor.getHTML())
      // pageStore.updateContentOfCurrentPage(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
      }
    }
  })
  // React.useEffect(() => {
  //   if (!currentPage) return
  //   const content = currentPage.content || ''
  //   editor?.commands.setContent(content)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage?._id])
  React.useEffect(
    function convertHtmlToMarkdown() {
      setTurndownMarkdownContent(htmlToMarkdown(editorHtmlContent))
    },
    [editorHtmlContent]
  )

  if (!editor) {
    return null
  }
  return (
    <div className="flex-1">
      {withPopover ? <Popover editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
