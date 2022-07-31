import pluginPkg from '../../package.json'
import pluginId from './pluginId'
import Initializer from './components/Initializer'
import PluginIcon from './components/PluginIcon'

const { name } = pluginPkg.strapi

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'Publish Changes',
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "publish-changes" */ './pages/App'
        )
        return component
      },
    })

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: true,
      name,
    })
  },
}