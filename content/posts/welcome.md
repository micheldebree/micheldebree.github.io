---
title: "I built a new personal website with Hugo"
date: 2020-03-19T08:00:00+01:00
draft: false
tags: ["coding"]
---

Welcome to my website. In this first post I will go over some details on how
this site was created.

- The site is static HTML, generated by [Hugo](https://gohugo.io)
- Sourcecode is accessible on [Github](https://github.com/micheldebree/website)
- The generated HTML is hosted on [Github pages](https://pages.github.com)
- Based on the [hugo-coder](https://themes.gohugo.io/hugo-coder) theme

So, I didn't use a fancy CMS like Wordpress, or a platform like Medium for
example. The main reasons for doing it like this are:

- Keep it simple: The site does not need fancy stuff that requires session
  management, a database, authorization etc. I just need to **publish**
  information. Less moving parts means less maintenance and more speed and
  robustness.
- Own your own data: the content is plain Markdown files, the generated site is
  plain HTML. Both formats are easily editable and very portable.
- Developer friendly: The content and styling is maintained by myself. I get to
  use industry standard tools and proven technologies that I am comfortable
  with: Git, Markdown, HTML, CSS. I do not need to mouse around in a
  user-friendly UI.

{{< notice warning >}}
The setup described below is obsolete. I set it up much simpler now. Read all
about the new setup in [this post](/posts/website_single_repo)
{{< /notice >}}

## The setup

This is how I did it

- [I installed Hugo](https://gohugo.io/getting-started/installing) on my laptop.
  I use [Homebrew](https://brew.sh) on macOS, so:

  ```bash
  brew install hugo
  ```


- I have a [Github](https://github.com) account, where I created

  - a **source** repository for my Hugo website configuration and content,
    called [`website`](https://github.com/micheldebree/website)
  - a **target** [Github Pages](https://pages.github.com/) repository for my
    generated site called
    [`micheldebree.github.io`](https://github.com/micheldebree/micheldebree.github.io)
    (the naming convention for personal Github Pages). The site is served from
    this repository.

  This is because Github personal pages cannot be served from a subfolder in the
  repository. `hugo` generates the static website in the subfolder `public`, so
  I cannot make do with just one repository for source and target.

- In the **source** repository `website`, I created the initial website by
  following the [Hugo quickstart
  documentation](https://gohugo.io/getting-started/quick-start/).

- Now a trick to generate the website that ends up in the `public` folder,
  directly into the root of the **target** repository; checkout the **target**
  repository as a submodule of the **source** repository, with the name
  `public`:

  ```bash
  cd website
  rm -rf ./public
  git submodule add https://github.com/micheldebree/micheldebree.github.io.git public
  ```

Now I'm ready to install a theme, tweak things to my liking, and start my first
post.

### Custom domain with HTTPS

As you may have noticed, this site is not served from `micheldebree.github.io`.
That is because I setup Github Pages to use my own domain name. Check out the
[documentation](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site)
on how to do that. Basically you need to:

- Setup the DNS records at your domain provider to point to the Github servers.
- Add a file called `CNAME` to the root of your site. Because `hugo` copies
  everything in the `static` folder verbatim to the root of the generated site,
  I created the file `static/CNAME` with the following content:

  ```bash
  www.micheldebree.nl
  ```

- The best part: Github takes care of the `https` automatically, so visitors
  will see a green lock in their browser!

### Build and publish the website

I now have one `website` repository to work in, with a submodule for the
generated website. So when I make changes, I usually do a push to both
repositories:

When I made some changes that I want to commit:

```bash
git add .
git commit -m "Finally finished my first blog post"
git push
```

This pushes the changes to the **source** repository, but doesn't push the site
that is served from `micheldebree.github.io`

If I want to publish the changes:

```bash
hugo
cd public
git add .
git commit -m "Finally finished my first blog post"
git push
```

This generates the website in the `public` folder and pushes it to the
**target** repository, where Github serves it to the world.

You can see how this could easily be more automated, but for now it works fine
for me.
