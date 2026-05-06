# Sample Gallery 1

Drop your photos in this folder.

## Naming

Prefix filenames with numbers to control display order:

```
01-portrait-of-a-friend.jpg
02-sunset.jpg
03-urban-reflection.jpg
```

The numbers (`01-`, `02-`, etc.) determine the order photos appear in the gallery.
The text after the number is auto-converted into the photo's alt text for accessibility,
so use descriptive names.

## Formats

JPG, PNG, WebP, AVIF, and GIF all work. JPG is best for photographs.

## Size

Try to keep each image under ~2 MB. If your originals are larger, ask Claude to
resize them — there's a one-line `sharp` command that handles the whole folder.

## Renaming this gallery

Rename this folder (e.g. `sample-gallery-1` → `portraits`) AND update the matching
`slug` in `src/data/galleries.json` to keep them in sync.

You can delete this README once you've added photos.
