import React, { useRef, useState } from 'react'
import type { FormInstance } from 'antd/es/form'
import { Button, Col, Form, Input, Row, Select, Space, Upload, message } from 'antd'
import json5 from 'json5'
import { All, SEPERATOR, authorList, provinceList, questionTypeList, sourceList, timelist } from '../../store/filter'
import QuestionItem from '../../components/home/question-item'
import type { Question } from '../../store/data.d'
import { encodeText, parseText } from '../../utils/text'
import styles from './edit.module.scss'
const { Dragger } = Upload

const Edit = () => {
  const initState: Question = { question: '' }
  const [config, setConfig] = useState(initState)
  const [fileName, setFileName] = useState('')
  const [url, setUrl] = useState('')
  const formRef = useRef<FormInstance>(null)

  const transformToUrl = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)])
    setUrl(URL.createObjectURL(blob))
  }

  const onValuesChange = (changedValues: any, allValues: any) => {
    const join = (values?: string[]) => {
      if (!values) return ''
      return values.join(SEPERATOR)
    }

    const handleOptions = (allValues: any) => {
      const tags = ['A', 'B', 'C', 'D', 'E', 'F']
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
      question: parseText(allValues.question),
      options: handleOptions(allValues),
      answer: parseText(allValues.answer),
      answerDescription: parseText(allValues.answerDescription),
      createdAt: Date.now(),
    }
    setConfig(config)
    transformToUrl()
  }

  const reset = () => {
    formRef.current?.resetFields()
    setConfig(initState)
    setFileName('')
    setUrl('')
  }

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2))
      .then(() => {
        message.success('???????????????')
      })
      .catch((err) => {
        message.error(`???????????????${err}`)
      })
  }

  const handleUpload = (info: any) => {
    const file = info.file && info.file.originFileObj
    if (!file) return
    if (window.FileReader) {
      const reader = new FileReader()
      reader.onloadend = function(e) {
        if (e.target?.readyState === FileReader.DONE) {
          const split = (values?: string) => {
            if (!values) return []
            return values.split(SEPERATOR)
          }

          const generateOptions = (options: string[]) => {
            const tags = ['A', 'B', 'C', 'D', 'E', 'F']
            const result = {}
            tags.forEach((tag, index) => {
              result[`option${tag}`] = options[index] || ''
            })
            return result
          }

          try {
            const config = json5.parse(e.target.result as string)
            formRef.current?.setFieldsValue({
              source: split(config.source),
              questionType: split(config.questionType),
              time: split(config.time),
              province: split(config.province),
              author: split(config.author),
              question: encodeText(config.question),
              ...generateOptions(config.options),
              answer: encodeText(config.answer),
              answerDescription: encodeText(config.answerDescription),
              createdAt: Date.now(),
            })
            setConfig(config)
            setFileName(file.name.replace(/\.json5?$/, ''))
            transformToUrl()
          }
          catch {
            message.error('???????????????????????????????????????')
          }
        }
      }
      reader.readAsText(file)
    }
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

  const renderOptionItem = (symbol: string) => {
    return (
      <Col span={12}>
        <Form.Item name={`option${symbol}`} label={`??????${symbol}`}>
          <Input allowClear={true} placeholder={`?????? ${symbol}??????`}/>
        </Form.Item>
      </Col>
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <Space
          direction="vertical"
          style={{ width: '100%', marginBottom: '20px' }}
        >
          <a href="https://www.yuque.com/silence94/nshgbk/pbtoi1" target="__blank">
            <Button block>????????????</Button>
          </a>
          <Button onClick={reset} danger block>??????????????????</Button>
          <Dragger onChange={handleUpload} accept=".json,.json5" showUploadList={false}>
             ?????????????????? json/json5 ??????
          </Dragger>
        </Space>

        <Form ref={formRef} onValuesChange={onValuesChange}>
          <Row gutter={24}>
            {renderSelectFormItem({ label: '??????', name: 'source', options: sourceList })}
            {renderSelectFormItem({ label: '??????', name: 'questionType', options: questionTypeList })}
            {renderSelectFormItem({ label: '??????', name: 'time', options: timelist })}
            {renderSelectFormItem({ label: '??????', name: 'province', options: provinceList })}
            {renderSelectFormItem({ label: '??????', name: 'author', options: authorList })}
          </Row>
          <Form.Item required name="question" label="????????????" >
            <Input.TextArea placeholder="1.???????????? $$ ?????????????????????2.???????????? # ??????????????????????????? # ????????????????????????3.enter ???????????????????????????????????????" autoSize={{ minRows: 4, maxRows: 20 }} allowClear={true}/>
          </Form.Item>
          <Row gutter={24}>
            {['A', 'B', 'C', 'D', 'E', 'F'].map((symbol: string) => renderOptionItem(symbol))}
          </Row>
          <Form.Item name="answer" label="????????????">
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 20 }} allowClear={true} placeholder="???????????????????????????"/>
          </Form.Item>
          <Form.Item name="answerDescription" label="????????????">
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 20 }} allowClear={true} placeholder="???????????????????????????"/>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <QuestionItem {...config} index={1} isAnswerShow={true}></QuestionItem>
        <Space direction="vertical">
          <Input prefix={'?????????????????????'} value={fileName} onChange={(e: any) => setFileName(e.target.value)} placeholder="???????????????????????????????????????????????????????????????" allowClear></Input>
          <a href={url} download={`${fileName || '??????'}.json5`}>
            <Button disabled={!url} type="primary" block size="large">??????</Button>
          </a>
        </Space>
        <div className={styles.content}>
          {JSON.stringify(config, null, 2)}
        </div>
        <Button type="primary" block size="large" onClick={copy}>??????</Button>
      </div>
    </div>
  )
}

export default Edit
