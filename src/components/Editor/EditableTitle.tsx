import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'

interface Props {
  content: string
  handleChange: (html: string) => void
  onKeyDown: (ev: any) => void
  handleOnBlur: () => void
}
/** should be a class component !! ;) */
export default class EditableTitle extends Component<Props, {}> {
  contentEditable
  constructor(args) {
    super(args)
    this.contentEditable = React.createRef()
  }
  handleChange = (evt) => {
    this.props.handleChange(evt.target.value)
  }
  onContentEditableClicked = (ev) => {
    ev.stopPropagation()
  }
  render() {
    return (
      <div className="flex-1 ">
        <ContentEditable
          onClick={this.onContentEditableClicked}
          className="text-3xl outline-0"
          innerRef={this.contentEditable}
          placeholder={'Untitled'}
          onBlur={this.props.handleOnBlur}
          onKeyDown={this.props.onKeyDown}
          html={this.props.content} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={this.handleChange} // handle innerHTML change
        />
      </div>
    )
  }
}
