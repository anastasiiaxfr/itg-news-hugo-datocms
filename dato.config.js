
  module.exports = (dato, root, i18n) => {

    // Add to the existing Hugo config files some properties coming from data
    // stored on DatoCMS
    ['config.toml'].forEach(file => {
      root.addToDataFile(file, 'toml', {
        // title: dato.site.globalSeo.siteName,
        // languageCode: i18n.locale
      });
    });

    root.createDataFile('settings.yml', 'yaml', {
        // name: dato.site.globalSeo.siteName,
        // language: dato.site.locales[0],
        // iterate over all the `social_profile` item types
      });
    

      root.directory('content/news', dir => {
        // ...and for each of the works stored online...
        dato.posts.forEach((post, index) => {
          // ...create a markdown file with all the metadata in the frontmatter
          // POST fileNAME: post-23-02-02-10-34.md
          dir.createPost(`post-${post.id}.md`, 'yaml', {
            frontmatter: {
              title: post.title,
              date: post.date,
              img: post.img.url({ w: 600, fm: 'jpg', auto: 'compress' }), 
              author: post.author.title,
              tags: post.tags.map(item =>
                item.title
              ),
              cat: post.cat.map(item =>
                item.title
              ),
              
                           
            },
            content: post.content
          });
        });
      });
  
};  