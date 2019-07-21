compareData = [
  {
    sha: '9daeafb9864cf43055ae93beb0afd6c7d144bfa4',
    filename: 'file0.md',
    status: 'renamed',
    additions: 0,
    deletions: 0,
    changes: 0,
    blob_url:
      'https://github.com/huanggm/learn-git/blob/67289c35fc8033b5cd5264d2aec96fa476f7afcd/file0.md',
    raw_url:
      'https://github.com/huanggm/learn-git/raw/67289c35fc8033b5cd5264d2aec96fa476f7afcd/file0.md',
    contents_url:
      'https://api.github.com/repos/huanggm/learn-git/contents/file0.md?ref=67289c35fc8033b5cd5264d2aec96fa476f7afcd',
    previous_filename: 'file9.md',
  },
  {
    sha: '0867e73e03b987e43e705e7b3ef580d9459d3f4d',
    filename: 'file7.md',
    status: 'modified',
    additions: 1,
    deletions: 0,
    changes: 1,
    blob_url:
      'https://github.com/huanggm/learn-git/blob/67289c35fc8033b5cd5264d2aec96fa476f7afcd/file7.md',
    raw_url:
      'https://github.com/huanggm/learn-git/raw/67289c35fc8033b5cd5264d2aec96fa476f7afcd/file7.md',
    contents_url:
      'https://api.github.com/repos/huanggm/learn-git/contents/file7.md?ref=67289c35fc8033b5cd5264d2aec96fa476f7afcd',
    patch: '@@ -1,2 +1,3 @@\n test\n test\n+test',
  },
  {
    sha: 'd0c7fbe024452edfea3b027eca1f33c36a09805f',
    filename: 'file8.md',
    status: 'modified',
    additions: 1,
    deletions: 0,
    changes: 1,
    blob_url:
      'https://github.com/huanggm/learn-git/blob/67289c35fc8033b5cd5264d2aec96fa476f7afcd/file8.md',
    raw_url:
      'https://github.com/huanggm/learn-git/raw/67289c35fc8033b5cd5264d2aec96fa476f7afcd/file8.md',
    contents_url:
      'https://api.github.com/repos/huanggm/learn-git/contents/file8.md?ref=67289c35fc8033b5cd5264d2aec96fa476f7afcd',
    patch: '@@ -1,3 +1,4 @@\n test\n test\n test\n+test',
  },
]

compare = {
  status: 200,
  url:
    'https://api.github.com/repos/huanggm/learn-git/compare/bf4edf1001415cfe9c121d5152d80dbfabb2345d...278fd0d8a013708d858fb64b6dec4440106ae504',
  headers: {
    'access-control-allow-origin': '*',
    'access-control-expose-headers':
      'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
    'cache-control': 'public, max-age=60, s-maxage=60',
    connection: 'close',
    'content-encoding': 'gzip',
    'content-security-policy': "default-src 'none'",
    'content-type': 'application/json; charset=utf-8',
    date: 'Sat, 20 Jul 2019 01:51:44 GMT',
    etag: 'W/"f5f4106e9d818ea19f9b66b1dcf17ba8"',
    'last-modified': 'Sat, 20 Jul 2019 01:51:36 GMT',
    'referrer-policy':
      'origin-when-cross-origin, strict-origin-when-cross-origin',
    server: 'GitHub.com',
    status: '200 OK',
    'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',
    'transfer-encoding': 'chunked',
    vary: 'Accept, Accept-Encoding',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'deny',
    'x-github-media-type': 'github.v3; format=json',
    'x-github-request-id': 'EEC4:025F:153BAA6:19C6CCD:5D3273AF',
    'x-ratelimit-limit': '60',
    'x-ratelimit-remaining': '59',
    'x-ratelimit-reset': '1563591104',
    'x-xss-protection': '1; mode=block',
  },
  data: {
    url:
      'https://api.github.com/repos/huanggm/learn-git/compare/bf4edf1001415cfe9c121d5152d80dbfabb2345d...278fd0d8a013708d858fb64b6dec4440106ae504',
    html_url:
      'https://github.com/huanggm/learn-git/compare/bf4edf1001415cfe9c121d5152d80dbfabb2345d...278fd0d8a013708d858fb64b6dec4440106ae504',
    permalink_url:
      'https://github.com/huanggm/learn-git/compare/huanggm:bf4edf1...huanggm:278fd0d',
    diff_url:
      'https://github.com/huanggm/learn-git/compare/bf4edf1001415cfe9c121d5152d80dbfabb2345d...278fd0d8a013708d858fb64b6dec4440106ae504.diff',
    patch_url:
      'https://github.com/huanggm/learn-git/compare/bf4edf1001415cfe9c121d5152d80dbfabb2345d...278fd0d8a013708d858fb64b6dec4440106ae504.patch',
    base_commit: {
      sha: 'bf4edf1001415cfe9c121d5152d80dbfabb2345d',
      node_id:
        'MDY6Q29tbWl0NzM1NDE5ODQ6YmY0ZWRmMTAwMTQxNWNmZTljMTIxZDUxNTJkODBkYmZhYmIyMzQ1ZA==',
      commit: [Object],
      url:
        'https://api.github.com/repos/huanggm/learn-git/commits/bf4edf1001415cfe9c121d5152d80dbfabb2345d',
      html_url:
        'https://github.com/huanggm/learn-git/commit/bf4edf1001415cfe9c121d5152d80dbfabb2345d',
      comments_url:
        'https://api.github.com/repos/huanggm/learn-git/commits/bf4edf1001415cfe9c121d5152d80dbfabb2345d/comments',
      author: [Object],
      committer: [Object],
      parents: [Array],
    },
    merge_base_commit: {
      sha: 'bf4edf1001415cfe9c121d5152d80dbfabb2345d',
      node_id:
        'MDY6Q29tbWl0NzM1NDE5ODQ6YmY0ZWRmMTAwMTQxNWNmZTljMTIxZDUxNTJkODBkYmZhYmIyMzQ1ZA==',
      commit: [Object],
      url:
        'https://api.github.com/repos/huanggm/learn-git/commits/bf4edf1001415cfe9c121d5152d80dbfabb2345d',
      html_url:
        'https://github.com/huanggm/learn-git/commit/bf4edf1001415cfe9c121d5152d80dbfabb2345d',
      comments_url:
        'https://api.github.com/repos/huanggm/learn-git/commits/bf4edf1001415cfe9c121d5152d80dbfabb2345d/comments',
      author: [Object],
      committer: [Object],
      parents: [Array],
    },
    status: 'ahead',
    ahead_by: 1,
    behind_by: 0,
    total_commits: 1,
    commits: [[Object]],
    files: [[Object], [Object], [Object], [Object], [Object]],
  },
}
