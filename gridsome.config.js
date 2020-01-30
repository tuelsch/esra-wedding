// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "esra-wedding",
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: [
        // ...global plugins
      ]
    },
    yaml: {}
  },
  plugins: [
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
    {
      use: "gridsome-plugin-netlify-cms-paths"
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "src/admin/content/**/*.yml",
        typeName: "netlifyPages",
        yaml: {}
      }
    }
  ]
};
