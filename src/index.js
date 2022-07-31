const findPublicRole = async (strapi) =>
  strapi.query('role', 'users-permissions').findOne({ type: 'public' })

const setDefaultPermissions = async (strapi) => {
  const allowedPublic = ['count', 'find', 'findone']
  const role = await findPublicRole(strapi)
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

const isFirstRun = async (strapi) => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  })
  const initHasRun = await pluginStore.get({ key: 'initHasRun' })
  await pluginStore.set({ key: 'initHasRun', value: true })
  return !initHasRun
}

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const shouldSetDefaultPermissions = await isFirstRun(strapi)
    if (shouldSetDefaultPermissions) {
      await setDefaultPermissions(strapi)
    }
  },
}
