import React from 'react'
import { Button, Col, Form, Input, Row, Select, Space, message } from 'antd'
import { All, SEPERATOR, authorList, provinceList, questionTypeList, sourceList, timelist } from '../../store/filter'
import QuestionItem from '../../components/home/question-item'
import type { Question, QuestionParagraph } from '../../store/data.d'
import styles from './edit.module.scss'

const Edit = () => {
  const initState: Question = { question: '' }
  const [config, setConfig] = React.useState(initState)
  const [fileName, setFileName] = React.useState('')
  const [url, setUrl] = React.useState('')

  const transformToUrl = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)])
    setUrl(URL.createObjectURL(blob))
  }

  const onValuesChange = (changedValues: any, allValues: any) => {
    const handleQuestion = (text?: string) => {
      if (!text) return []
      const boldSymbol = '$$'
      const indentSymbol = '#'
      const result = text.split('\n')
      const questions: QuestionParagraph[] = []
      result.forEach((item: string, index: number) => {
        if (index === 0) {
          if (result[0].startsWith(boldSymbol)) {
            const question = result[0].slice(2)
            questions.push({
              tag: 'h2',
              text: question,
            })
          }
          else {
            questions.push({
              tag: 'p',
              text: item,
            })
          }
        }
        else {
          let indent = 0
          while (item.startsWith(indentSymbol)) {
            indent += 1
            item = item.slice(1)
          }
          questions.push({
            tag: 'p',
            text: item,
            indent,
          })
        }
      })
      return questions
    }

    const join = (values?: string[]) => {
      if (!values) return ''
      return values.join(SEPERATOR)
    }

    const handleOptions = (allValues: any) => {
      const tags = ['A', 'B', 'C', 'D', 'E']
      const options: string[] = []
      tags.forEach((tag: string) => {
        const value = allValues[`option${tag}`]
        if (value)
          options.push(value)
      })
      return options
    }

    const config = {
      source: join(allValues.source),
      questionType: join(allValues.questionType),
      time: join(allValues.time),
      province: join(allValues.province),
      author: join(allValues.author),
      question: handleQuestion(allValues.question),
      options: handleOptions(allValues),
      answer: allValues.answer,
      answerDescription: allValues.answerDescription,
      createdAt: Date.now(),
    }
    setConfig(config)
    transformToUrl()
  }

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
      .then(() => {
        message.success('复制成功！')
      })
      .catch((err) => {
        message.error(`复制失败：${err}`)
      })
  }

  const renderSelectFormItem = (props: { name: string; label: string; options: Set<String> }) => {
    // eslint-disable-next-line react/prop-types
    const { name, label, options } = props
    // eslint-disable-next-line react/prop-types
    options.delete(All)
    return (
      <Col span={12}>
        <Form.Item name={name} label={label}>
          <Select mode="tags" allowClear={true}>
            {[...options].map((item: any) => (
              <Select.Option key={item} value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    )
  }

  const renderOption = (symbol: string) => {
    return (
      <Col span={12}>
        <Form.Item name={`option${symbol}`} label={`选项${symbol}`}>
          <Input allowClear={true} placeholder={`选项 ${symbol}的值`}/>
        </Form.Item>
      </Col>
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <Form onValuesChange={onValuesChange}>
          <Row gutter={24}>
            {renderSelectFormItem({ label: '来源', name: 'source', options: sourceList })}
            {renderSelectFormItem({ label: '题型', name: 'questionType', options: questionTypeList })}
            {renderSelectFormItem({ label: '时间', name: 'time', options: timelist })}
            {renderSelectFormItem({ label: '地区', name: 'province', options: provinceList })}
            {renderSelectFormItem({ label: '原创', name: 'author', options: authorList })}
          </Row>
          <Form.Item required name="question" label="问题描述" >
            <Input.TextArea placeholder="第一行的首字母为 $$ 时，表示加粗。其余行首字母为 # 号时表示缩进，多个 # 号表示缩进多次。enter 键换行等同于开始新的段落。" autoSize={{ minRows: 4, maxRows: 12 }} allowClear={true}/>
          </Form.Item>
          <Row gutter={24}>
            {['A', 'B', 'C', 'D', 'E'].map((symbol: string) => renderOption(symbol))}
          </Row>
          <Form.Item name="answer" label="正确答案">
            <Input allowClear={true} placeholder="正确答案内容"/>
          </Form.Item>
          <Form.Item name="answerDescription" label="答案描述">
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 12 }} allowClear={true} placeholder="答案描述，可以不填"/>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <QuestionItem {...config} index={1} isAnswerShow={true}></QuestionItem>
        <Space direction="vertical">
          <Input prefix={'下载文件名称：'} value={fileName} onChange={(e: any) => setFileName(e.target.value)} placeholder="这里输入下载的文件的名称（比如题目名称等）" allowClear></Input>
          <a href={url} download={`${fileName || '题目'}.json5`}>
            <Button disabled={!url} type="primary" block size="large">下载</Button>
          </a>
        </Space>
        <div className={styles.content}>
          {JSON.stringify(config, null, 2)}
        </div>
        <Button type="primary" block size="large" onClick={copy}>复制</Button>
      </div>
    </div>
  )
}

export default Edit
