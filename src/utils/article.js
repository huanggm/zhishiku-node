async function deleteFile(octokit, owner, repo, path) {
  try {
    const { data: found } = await octokit.repos.getContents({
      owner,
      repo,
      path,
    })
    return deleteFileWithSha(octokit, owner, repo, path, found.sha)
  } catch (e) {}
}

function deleteFileWithSha(octokit, owner, repo, path, sha) {
  return octokit.repos.deleteFile({
    owner,
    repo,
    path,
    message: `删除文件--${path}`,
    sha,
  })
}

function createOrUpdateFile(octokit, owner, repo, path, content, sha) {
  return octokit.repos.createOrUpdateFile({
    owner,
    repo,
    path,
    message: `${sha ? '编辑' : '新增'}文章-${path}`,
    content: Buffer.from(content).toString('base64'),
    sha: sha,
  })
}

module.exports = {
  deleteFile,
  deleteFileWithSha,
  createOrUpdateFile,
}
