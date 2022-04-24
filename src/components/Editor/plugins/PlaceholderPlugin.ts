import Placeholder from '@tiptap/extension-placeholder'
import './placeholder.css'
export const PlaceholderPlugin = Placeholder.configure({
  placeholder: ({ node }) => {
    return `Type '/' for actions…`
  },
  showOnlyWhenEditable: true,
  includeChildren: true,
  showOnlyCurrent: true
})
