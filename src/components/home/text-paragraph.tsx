import React from 'react'
import type { TextParagraph } from '../../utils/text'

interface TextParagraphComponentProps {
  texts?: TextParagraph[]
  index?: number
}

const TextParagraphComponent = (props: TextParagraphComponentProps) => {
  const { texts = [], index } = props
  return (
    <article>
      {texts.map((item: TextParagraph, idx: number) => {
        const { tag = 'p', text = '', indent = 0, bold = false } = item
        const eleProps = {
          key: idx,
          style: {
            marginLeft: `${indent * 16}px`,
            fontWeight: bold ? '500' : 'normal',
            fontSize: '14px',
            minHeight: '22px',
            lineHeight: '22px',
            marginBottom: '4px',
            marginTop: '4px',
          },
        }
        const children = index && idx === 0 ? `${index}. ${text}` : text
        return React.createElement(tag, eleProps, children)
      })}
    </article>
  )
}

export default TextParagraphComponent
