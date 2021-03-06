const boldSymbol = '$$'
const indentSymbol = '#'

export interface TextParagraph {
  tag?: string
  text?: string
  indent?: number
  bold?: boolean
}

export const parseText = (texts: string) => {
  if (!texts) return []
  const textArr = texts.split('\n')
  const result = textArr.map((item) => {
    const textParagraph: TextParagraph = {}
    if (item.startsWith(boldSymbol)) {
      textParagraph.bold = true
      item = item.slice(boldSymbol.length)
    }

    let indent = 0
    while (item.startsWith(indentSymbol)) {
      indent += 1
      item = item.slice(1)
    }
    textParagraph.indent = indent || 0
    textParagraph.text = item
    return textParagraph
  })
  return result
}

export const encodeText = (texts: TextParagraph[]) => {
  return texts.map((textParagraph: TextParagraph) => {
    const { text = '', bold = false, indent = 0 } = textParagraph
    let result = text
    result = indentSymbol.repeat(indent) + result
    result = bold ? boldSymbol + result : result
    return result
  }).join('\n')
}
