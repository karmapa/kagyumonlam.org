This is the scaffolding for a new website replacing the current [kagyumonlam.org](http://kagyumonlam.org/English/News/news_main.html).  This codebase is a static website generator built using the [metalsmith](http://www.metalsmith.io/) framework.

In the `src/` directory is the raw content of the website in [Markdown](https://daringfireball.net/projects/markdown/) and [YAML](http://yaml.org/) formats.  In the `layouts/` directory is the HTML code that defines the structure of the web site in a [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) fashion.  When the site is built, the `build/` directory will be populated with the rendered web pages and can be hosted on any web hosting provider.


To build:

    npm run build
