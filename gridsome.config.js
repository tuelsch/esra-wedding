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
    }
  },
  templates: {
    Gallery: "/gallery/:title"
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
        path: "src/admin/content/*.md",
        typeName: "netlifyPages",
        remark: {}
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "src/admin/content/gallery/*.md",
        typeName: "Gallery",
        remark: {}
      }
    }
  ]
};
