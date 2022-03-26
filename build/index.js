const fs = require('fs/promises')
const path = require('path')
const json5 = require('json5')
const gradesArray = require('./grades.json')

const resolve = dir => path.join(__dirname, dir)

// [
//   {
//     name: '',
//     children: [
//       {
//         name: '',
//         children: [
//           {
//             name: '',
//           },
//         ],
//       },
//     ],
//   }
// ]

const grades = (() => {
  const result = {}
  gradesArray.forEach((item) => {
    result[item.value] = item.label
  })
  return result
})()

const questions = []
const ignoreFiles = ['.DS_Store']

async function parseDir(dir, file, key) {
  if (ignoreFiles.includes(file)) return
  const filePath = `${dir}/${file}`
  const stat = await fs.stat(filePath)

  const [id, name] = file.split('_')
  // 上一个 id + 本次id
  const seperator = '__'
  key = key ? `${key}${seperator}${id.trim()}` : id.trim()

  // 如果文件为 json 结尾，说明是问题，进行收集
  if (file.endsWith('.json') || file.endsWith('.json5')) {
    const json = await fs.readFile(filePath, 'utf-8')
    try {
      const data = json5.parse(json)
      data.id = key
      const gradeKey = key.split(seperator)[0]
      data.grade = grades[gradeKey]
      questions.push(data)
    }
    catch (error) {
      console.log('json 解析失败，文件书写错误', error)
    }
    return
  }

  let children = []
  if (stat.isDirectory())
    children = await parse(filePath, key)

  return {
    id: key,
    name: (name && name.trim()) || id.trim(),
    children,
  }
}

async function parse(dir, key = '') {
  const files = await fs.readdir(dir)
  const result = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const parsedJson = await parseDir(dir, file, key)
    if (!parsedJson) continue
    result.push(parsedJson)
  }
  return result
}

const writeFile = (file, data) => {
  return fs.writeFile(file, data)
}

const build = async() => {
  const json = await parse(resolve('./toc'))
  writeFile(resolve('data.json'), JSON.stringify(json))
  writeFile(resolve('question.json'), JSON.stringify(questions))
}

build()
