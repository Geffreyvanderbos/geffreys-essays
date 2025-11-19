---
title: Converting Mela .recipes to Markdown
date: 2025-01-10
---

[Mela.recipes](https://mela.recipes/) is a recipe manager that I highly recommend. I'd also like to have the recipes in plain text for safekeeping. The bash script below converts the [.melarecipes export](https://mela.recipes/fileformat/index.html) to Markdown. I then use Obsidian bases to display and filter through the recipes.

To have the first image show up in the Obsidian Bases card layout I did the following:

1. Add a custom property, name it `cover-image` or something similar.
2. Add the following formula: `image(file.embeds.filter(value.containsAny("png", "jpg", "gif"))[0])`. This will go through the embeds in the markdown file and 'selects' the first image.
3. Then, in the Configure View of the Cards layout, choose 'cover-image' as image property.

The conversion script makes use of ImageMagick and if that's not installed, it uses SIPS (MacOS default). I believe it'll work on Linux and Windows too, but didn't test it.

> EDIT: I have hosted the script on Codeberg. This way I can update it without needing to paste it in this blog. Find it here: [https://codeberg.org/geffrey/geffreys-pile-of-scripts/src/branch/main/mela-to-markdown.sh](https://codeberg.org/geffrey/geffreys-pile-of-scripts/src/branch/main/mela-to-markdown.sh)
