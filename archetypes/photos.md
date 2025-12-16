---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
description: "Photo gallery description"
draft: true
---

Add your photos to this directory and they will automatically appear in a responsive masonry gallery with lightbox functionality.

## About This Gallery

Describe the context, location, or story behind these photos.

## Gallery Features

- Masonry layout preserving aspect ratios
- Responsive design (1-4 columns)
- Lightbox view with keyboard navigation
- Automatic image optimization

## Inline Gallery Usage

You can embed specific photos within your text using the gallery shortcode:

{{</* gallery images="photo1.jpg,photo2.jpg" size="medium" */>}}

Available sizes: `small`, `medium`, `large`
Column options: `cols="1"`, `cols="2"`, `cols="3"`, or `cols="auto"`
