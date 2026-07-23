import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const requestUrl = getRequestURL(event)

  if (requestUrl.hostname !== 'www.teke.studio') {
    return
  }

  return sendRedirect(
    event,
    `https://teke.studio${requestUrl.pathname}${requestUrl.search}`,
    301,
  )
})
