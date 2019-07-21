const personalkey = '786bc817e6387618231f8a939143f27f62b9065f'
const Diff = require('diff')

const Github = require('./github')

describe('github test', () => {
  const github = new Github(personalkey)

  test('listAllRepos', async () => {
    const res = await github.listAllRepos()
    expect(res).toHaveProperty('data')
  })
  
  test('getContents', async () => {
    const res = await github.getContents('huanggm', 'blogs', 'test/abcd.md')
    expect(res).toHaveProperty('data')
  })

  test('createFile', async () => {
    const res = await github.createOrUpdateFile('huanggm', 'blogs', 'test/abcd.md', 'testtesttesttesttest abcd', 'Y29udGVudCBjb250ZW50IGNvbnRlbnQgY29udGVudCBjb250ZW50IGFiY2Q')
    expect(res).toHaveProperty('data')
  })
  
  test('updateFile', async () => {
    const res = await github.createOrUpdateFile('huanggm', 'blogs', 'test/abcd.md', 'testtesttesttesttest abcd', 'Y29udGVudCBjb250ZW50IGNvbnRlbnQgY29udGVudCBjb250ZW50IGFiY2Q', 'c800036dc9a2030d33b37e6aee6db0833ee295f8')
    expect(res).toHaveProperty('data')
  })

  test('deleteFile', async () => {
    const res = await github.deleteFile('huanggm', 'blogs', 'test/abcd.md', 'delete testtesttesttesttest', 'c800036dc9a2030d33b37e6aee6db0833ee295f8')
    expect(res).toHaveProperty('data')
  })

  test('getRef', async () => {
    const res = await github.getRef('huanggm', 'blogs', 'heads/master')
    expect(res).toHaveProperty('data')
  })
  
  test('getCommit', async () => {
    const res = await github.getCommit('huanggm', 'learn-git', 'heads/master')
    console.log(res)
    expect(res).toHaveProperty('data')
  })
  
  test('listCommits', async () => {
    const res = await github.listCommits('huanggm', 'blogs')
    expect(res).toHaveProperty('data')
  })

  test('getTree', async () => {
    const res = await github.getTree('huanggm', 'learn-git', '86a2993e3fc27542cfa3c9cec43199d38a82cd73')
    console.log(res)
    console.log('----------------------------------')
    console.log(res.data)
    console.log('----------------------------------')
    console.log(res.data.tree)
    expect(res).toHaveProperty('data')
  })

  test('getArchiveLink', async () => {
    const res = await github.getArchiveLink('huanggm', 'learn-git', 'zipball', 'b9bc9faa1fb8e4fe5ff73ea1ed0b25925ca62c51')
    console.log(res)
    expect(res).toHaveProperty('data')
  })

  test('diff test1', () => {
    const oldStr = 'aaabbbccc'
    const newStr = 'abcabcabc'
    const patch = Diff.createPatch('filename', oldStr, newStr)
    const oldStr2 = Diff.applyPatch(oldStr, patch)
    const newStr2 = Diff.applyPatch(newStr, patch)

    console.log(patch, '----------------', oldStr2, '---------------', newStr2)
  })

  test('diff test2', () => {
    const oldStr = 'test'
    const patch = '@@ -1 +1,4 @@\n+testasdf\n test\n+nihao\n+123'
    const newStr = Diff.applyPatch(oldStr, patch)

    console.log(newStr)
  })

  test.only('diff test3', () => {
    const oldStr = 'world'
    const patch = `@@ -0,0 +1,3 @@\n+test\n+ nihao\n+ hello`
    const newStr = Diff.applyPatch('', patch)

    console.log('diff test3: ----------------')
    console.log(newStr)
  })
})
