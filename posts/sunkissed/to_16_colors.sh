#!/bin/sh
convert -depth 8 -alpha remove -alpha off "$1" tmp.png
pngquant --nofs --speed 1 --posterize 4 --output "$1.png" tmp.png

