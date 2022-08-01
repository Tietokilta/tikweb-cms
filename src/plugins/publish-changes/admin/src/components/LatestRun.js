import React, { useState, useEffect, useRef } from 'react'
import { request, useNotification } from '@strapi/helper-plugin'
import { Link } from '@strapi/design-system/Link'
import { Stack } from '@strapi/design-system/Stack'
import { Typography } from '@strapi/design-system/Typography'
import pluginId from '../pluginId'

const LatestRun = () => {
  const [latestRun, setLatestRun] = useState({})
  const toggleNotification = useNotification()

  useEffect(() => {
    let timeout

    async function fetchLatestRun() {
      try {
        const res = await request(
          `${strapi.backendURL}/${pluginId}/runs/latest`
        )
        setLatestRun(res)
        timeout = setTimeout(fetchLatestRun, 10000)
      } catch (e) {
        toggleNotification({
          type: 'warning',
          message: e.response.payload.error,
        })
      }
    }

    fetchLatestRun()

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Stack spacing={2}>
      <Typography variant="beta">Latest run created from here:</Typography>
      <Typography>Created at: {latestRun.run_started_at}</Typography>
      <Typography>Status: {latestRun.status}</Typography>
      <Link href={latestRun.html_url}>URL</Link>
    </Stack>
  )
}

export default LatestRun