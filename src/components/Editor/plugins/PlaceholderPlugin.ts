import Placeholder from '@tiptap/extension-placeholder'

export const PlaceholderPlugin = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === 'heading') {
      return 'What’s the title?'
    }

    return `Type '/' for actions…`
  },
  showOnlyWhenEditable: false,
  includeChildren: true,
  showOnlyCurrent: false
})
