/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#bootstrap
 */

module.exports = () => {}

const findPublicRole = async () =>
  strapi.query('role', 'users-permissions').findOne({ type: 'public' })

const setDefaultPermissions = async () => {
  const allowedPublic = ['count', 'find', 'findone']
  const role = await findPublicRole()
  const permissions = await strapi
    .query('permission', 'users-permissions')
    .find({ type: 'application', role: role.id })
  await Promise.all(
    permissions.map((p) =>
      strapi
        .query('permission', 'users-permissions')
        .update({ id: p.id }, { enabled: allowedPublic.includes(p.action) })
    )
  )
}

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  })
  const initHasRun = await pluginStore.get({ key: 'initHasRun' })
  await pluginStore.set({ key: 'initHasRun', value: true })
  return !initHasRun
}

module.exports = async () => {
  console.log('Running bootstrapping script')
  const shouldSetDefaultPermissions = await isFirstRun()
  if (shouldSetDefaultPermissions) {
    await setDefaultPermissions()
  }
}
