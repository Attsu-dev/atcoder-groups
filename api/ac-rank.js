const ATCODER_PROBLEMS_AC_RANK_URL =
  'https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank'

export default async function handler(request, response) {
  const user = request.query.user

  if (typeof user !== 'string' || user.length === 0) {
    response.status(400).json({ message: 'user is required' })
    return
  }

  const params = new URLSearchParams({ user })
  const upstreamResponse = await fetch(
    `${ATCODER_PROBLEMS_AC_RANK_URL}?${params.toString()}`,
  )

  response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

  if (!upstreamResponse.ok) {
    response.status(upstreamResponse.status).json({
      message: 'failed to fetch AC rank',
    })
    return
  }

  const data = await upstreamResponse.json()
  response.status(200).json(data)
}
