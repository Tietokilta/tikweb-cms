import React from 'react'
import { request, useNotification } from '@strapi/helper-plugin'
import pluginId from '../pluginId'
import { Box } from '@strapi/design-system/Box'
import { Button } from '@strapi/design-system/Button'
import { Flex } from '@strapi/design-system/Flex'
import { Stack } from '@strapi/design-system/Stack'
import { Typography } from '@strapi/design-system/Typography'
import LatestRun from './LatestRun'

const BuildFrontend = () => {
  const toggleNotification = useNotification()

  async function startBuild(environment) {
    try {
      await request(`${strapi.backendURL}/${pluginId}/runs/start`, {
        method: 'POST',
        body: { environment },
      })
      toggleNotification({
        type: 'success',
        message: `Build started for ${environment}`,
      })
    } catch (e) {
      toggleNotification({
        type: 'warning',
        message: e.response.payload.error,
      })
    }
  }

  return (
    <Box paddingTop={5} paddingLeft={7}>
      <Stack spacing={5}>
        <Typography variant="alpha">Build frontend</Typography>
        <Flex gap={5}>
          <Button onClick={() => startBuild('production')}>
            Build Production
          </Button>
          <Button onClick={() => startBuild('staging')}>Build Staging</Button>
        </Flex>
        <LatestRun />
      </Stack>
    </Box>
  )
}

export default BuildFrontend