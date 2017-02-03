# Kagyu Monlam Website

This is a website intended to replace the current [kagyumonlam.org](http://kagyumonlam.org/English/News/news_main.html).  It is a static website generator which means all of the content and code used to generate the website is contained here.  See our [design decisions](https://github.com/karmapa/kagyumonlam.org/wiki/Design-Decisions) wiki page for more on why we chose a static website generator and what this means.

## Contributing

You would like to contribute to this project? Great! We are happy to help you get up and running.

First, you'll need to get your development environment set up so you can run the website locally.  See our [Development Environment Setup](https://github.com/karmapa/kagyumonlam.org/wiki/Development-Environment-Setup) guide for instructions.

Check out the rest of this README file for more information on how the code is structured and how it all fits together.

Once you've made some changes you'll have to submit a pull request.  See our [Pull Request Workflow](https://github.com/karmapa/kagyumonlam.org/wiki/Pull-Request-Workflow) page for more info on what this means.

If you run into any trouble or would like to discuss, feel free to email us at [kagyu-monlam-web@googlegroups.com](mailto:kagyu-monlam-web@googlegroups.com).

## Understanding this Code

This codebase is a static website generator built using the [metalsmith](http://www.metalsmith.io/) framework.

The process works like this:

The `source/` directory contains all of the files needed to build the website.  When the build process completes, the `build/` directory will contain the entire website, ready for hosting on a web server.

### Directory Structure

Lets look a bit closer at the `source/` directory.  You'll see one folder called `_assets` and a bunch of others, something that looks like this:

	▾ source/
	  ▸ _assets/
	  ▸ about/
	  ▸ attend/
	  ▸ contacts/
	  ▸ media/
	  ▸ news/
	  ▸ support/
		index.md
		navigation.yaml

There are a few special items in this folder: `_assets` and `navigation.yaml`.  We will discuss those below.

The remaining folders directly map to pages of our website.  For example, lets take a look inside `about/`:

	▾ source/
	  ▸ _assets/
	  ▾ about/
		▾ bodhgaya/
			index.md
		▾ karmapa/
			index.md
		  index.md
	  ▸ attend/
	  ▸ contacts/
	  ▸ media/
	  ▸ news/
	  ▸ support/
		index.md
		navigation.yaml

### Example Markdown `about/index.md`

Inside `about/`, we have subfolders that are also website pages (one about the Bodhgaya and one about Karmapa).  This directory structure maps directly to the website URL also.  For example, in this case we would have `kagyumonlam.org/about/` and `kagyumonlam.org/about/bodhgaya/`, etc.  The `index.md` files are where the contents of each page is stored.  This content is written in Markdown format with a little header information in YAML.  See our [Technologies Used](https://github.com/karmapa/kagyumonlam.org/wiki/Technologies-Used) page for more specifics about these technologies.

For now, just take a look in `about/index.md` to get a feel for it.  First, we have our YAML header section which defines a few configuration options for the about page:

```yaml
---
layout: layout.njk
title: History of the Kagyu Monlam
---
```

this is followed by the Markdown content of the page:

```markdown
# History of the Kagyu Monlam

The name "Kagyu Monlam" originated five hundred years ago in Tibet when the [Seventh Karmapa Chödrak Gyatso](http://kagyuoffice.org/kagyu-lineage/the-golden-rosary/the-7th-karmapa-tashi-paljor/) established an annual prayer festival in order to restore the Vinaya discipline that had grown lax among the sangha, to make offerings to the buddhas, and to inspire sincere faith among those who saw or  heard it, through the grandeur of the Buddhist teachings, and the individuals present.

Held during the first lunar month, great gatherings of over ten thousand members of the sangha assembled at the Monlam. Under the guidance of the Karmapa, they performed the liturgy of the Twenty-Branch...
```

How does this seem?  If you have a feel for this, you are in pretty good shape!  This is how all of the content in this website is organized.  To change the content of the about page, just change the contents of `about/index.md`!  It's really just as simple as this.

Now let's take a look at the more special items in the `source/` directory.

### `navigation.yaml`

This file configures the navigation bar that is present throughout the website.

### `_assets/` Directory

To adjust the styling of the website or something structural in the HTML, you'll need to work inside the `_assets/` directory.  Let's take a look inside:

Inside `_assets/` we have a few subfolders:

* `layouts/`: The layouts that are used to generate the HTML structure of the page.  These are written in the Nunjucks templating language with a consideration of the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principle.
* `scripts/`: Any JavaScript that is included on the site can be put inside this directory.  For now it is just a single `index.js` that does not do much.
* `styles/`: This code generates the CSS file used to apply styles to the page.  It is written in the LESS CSS preprocessor language.

See our [Technologies Used](https://github.com/karmapa/kagyumonlam.org/wiki/Technologies-Used) page for more specifics about these technologies.

See the comments inside these files for more specific info.  As always feel free to reach out to us at [kagyu-monlam-web@googlegroups.com](mailto:kagyu-monlam-web@googlegroups.com) with any questions.

## More

For more information, see our [wiki](https://github.com/karmapa/kagyumonlam.org/wiki/).
