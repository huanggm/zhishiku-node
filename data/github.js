const Octokit = require('@octokit/rest')

class Github {
  constructor(auth) {
    this.octokit = Octokit({ auth })
  }

  listAllRepos() {
    return this.octokit.repos.list()
  }
  
  getContents(owner, repo, path) {
    return this.octokit.repos.getContents({ owner, repo, path })
  }
  
  createOrUpdateFile(owner, repo, path, message, content, sha) {
    return this.octokit.repos.createOrUpdateFile({
      owner,
      repo,
      path,
      message,
      content,
      sha,
    })
  }
  
  deleteFile(owner, repo, path, message, sha) {
    return this.octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message,
      sha,
    })
  }
  
  getRef(owner, repo, ref) {
    return this.octokit.git.getRef({
      owner,
      repo,
      ref,
    })
  }
  
  getCommit(owner, repo, ref) {
    return this.octokit.repos.getCommit({
      owner,
      repo,
      ref,
    })
  }
  
  listCommits(owner, repo) {
    return this.octokit.repos.listCommits({
      owner,
      repo,
    })
  }
  
  getTree(owner, repo, tree_sha, recursive = 1) {
    return this.octokit.git.getTree({
      owner,
      repo,
      tree_sha,
      recursive,
    })
  }
  
  getArchiveLink(
    owner,
    repo,
    archive_format = 'zipball',
    ref = 'master'
  ) {
    return this.octokit.repos.getArchiveLink({
      owner,
      repo,
      archive_format,
      ref,
    })
  }
}

module.exports = Github