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
    content: '',
    extensions,
    editable,
    onUpdate: ({ editor }) => {
      setEditorHtmlContent(editor.getHTML())
      // pageStore.updateContentOfCurrentPage(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose px-4 focus:outline-none'
      }
    }
  })
  // React.useEffect(() => {
  //   if (!selectedPage?._id) {
  //     return
  //   }
  //
  //   editor?.commands.setContent(selectedPage?.content || '')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedPage?._id])
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
