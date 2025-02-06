import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import underline from 'markdown-it-underline'

const md = new MarkdownIt()

md.use(underline)
md.use(markdownItAttrs)

export default md
