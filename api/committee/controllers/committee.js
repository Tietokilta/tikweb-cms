'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    find: ctx => {
        return strapi.query('committee').find(ctx.query, [
           { path: 'committeePosition' },
            { path: 'position' },
            { path: 'holder' },
            { path: 'people' },
        ]);
    },
};
