---
title: "Sample Gallery"
date: 2024-01-15
description: "A sample photo gallery to demonstrate the gallery functionality"
draft: True
---

This is a sample gallery to demonstrate how the photo gallery system works. Place your images in the same directory as this `index.md` file, and they will automatically be displayed in a responsive masonry grid with lightbox functionality.

## Gallery Features

- **Masonry Layout**: Images flow naturally maintaining aspect ratios
- **Responsive Design**: 1-4 columns based on screen size
- **Lightbox View**: Click any image to view in full size
- **Keyboard Navigation**: Use arrow keys and Escape in lightbox
- **Touch/Click Navigation**: Navigate with on-screen controls
- **Automatic Optimization**: Hugo generates optimized thumbnails and full-size images

## Inline Gallery Usage

You can also embed smaller galleries within your writing using the gallery shortcode:

### Small inline gallery:
{{< gallery images="image1.jpg,image2.jpg,image3.jpg" size="small" >}}

### Medium gallery with 2 columns:
{{< gallery images="image1.jpg,image2.jpg" size="medium" cols="2" >}}

### Large single image:
{{< gallery images="image1.jpg" size="large" >}}

The shortcode supports:
- **size**: `small`, `medium`, `large`
- **cols**: `auto`, `1`, `2`, `3` (for specific column layouts)
- **images**: comma-separated list of image filenames

Images will flow naturally with your content and are perfect for illustrating specific points in your writing while the main gallery below shows all images in the collection.


---

Cork it! The first stage of wine tasting is looking over the appearance of the wine. Throughout history, wine has been consumed for its intoxicating effects. You should know your grapes, forget about vodka.

{{< gallery images="image1.jpeg" size="medium" cols="auto" >}}

Don't be shy: wine experts stick their nose deep into the glass in order to pick up the complex nuances. The cabernet grape variety thrives in a variety of vineyard soil types. Chenin blanc boasts a bouquet of fresh pears, saffron, jasmine, ginger, and quince. Acid, tannin, fruitiness, oakiness, are all components of balance.

Be not offended when your ex drinks wine. {{< gallery images="image2.jpeg" size="medium" cols="auto" float="right">}} Pinot Grigio and Pinot Gris are two names for the same wine. Pertinent info is found on the label. Bouquet refers to wine's aroma.

Wine, women, and song – not necessarily in that order. The Bordeaux wine region accounts for more than sixty percent of the cabernet sauvignon grown in France. Rotten sémillon grapes are the secret to Sauternes.

The Romans cooked grape juice in lead pots to sweeten their wine... and to poison their wine. Decantering opens the wine through aeration, allowing the wine to display its full range. Younger grapes can instill herbaceous notes on the nose.

Decantering opens the wine through aeration, allowing the wine to display its full range. A complex cabernet is a good one. The Romans named Sangiovese after the blood of Jupiter; that must have been some hangover. Quip intelligently over oak-aged Chablis.

{{< gallery images="image3.jpeg" size="medium" cols="auto" >}} All grape juice is white, only the skins of purple grapes contain the dark pigment. If a husband found his wife drinking wine in the early Roman times, he was at liberty to kill her. Toasting was originally the practice of dropping toasted bread into wine to temper excessive acidity. Sommelier is an elegant euphemism for professional wino. Acid, tannin, fruitiness, oakiness, are all components of balance.

A wine has legs if it sticks to the inside of the glass when swirled. How do you hold a wine glass? There is a right and a wrong way. Swine and wine pair well. During racking, a wine is moved to a new barrel and separated from sediment in the old one. Grapes crushed and ready for fermentation are called must. Shiraz, Syrah, what's the difference? There is none. Well-regarded sparkling wines include Espumante from Portugal, and Asti from Italy.

{{< gallery images="image4.jpeg" size="medium" cols="auto" float="right" >}}You should know your grapes, forget about vodka. Smoky is usually a byproduct of oak barrels, or, less often, of drunken arson. Strong notes of cedar, gin, with a cinnamon finish. The term meritage is a blend of merit and heritage, and usually describes blended California wines. Pertinent info is found on the label.

Winemakers refer to screw caps as Stelvin enclosures, because it sounds better than "lid." Acidity is a naturally occurring component of every wine. Balance requires neither too much, nor too little, acidity. The best wines impart a lingering, complex and rich finish. Tannic, full-bodied wines are described as chewy. When Cabernet Sauvignon is paired with steak or dishes with a heavy butter cream sauce, the tannins are neutralized, allowing the fruits of the wine to be more noticeable. Amaron is made primarily from Corvina grapes dried on racks before pressing.
