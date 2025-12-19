---
title: "Commander.games"
date: 2025-12-15T15:55:16-08:00
description: "Yet another EDH Counter application entirely vibe coded into existence"
tags: ["LLMs", "Vue", "Typescript", "Go", "Cloudflare Pages", "Fly.io"]
github: ""
demo: ""
website: "https://commander.games"
draft: false
---

## Overview

I had an idea during COVID lockdown for an EDH counter app that could be run on each players personal device for keeping track of score while playing remotely. Lockdown eventually ended and I never actually got around to creating the app during that time, but the idea still stuck with me. The app itself always seemed like a relatively simple CRUD app for the most part, so it felt like a pretty good candidate for learning how to thoroughly vibe code. I was able to get to a v1 having only used prompts and writing just a small amount of code that I knew I could do myself faster than figuring out how to phrase a prompt to generate said code.

Since this project was entirely vibe coded into existence, please also see my position on using LLMs at my [/ai](/ai) page.

## Technologies Used

- **Frontend**: Vue, Typescript
- **Backend**: Go
- **Infrastructure**: Cloudflare Pages, Fly.io
- **Tools**: Claude

## Features

_Pulled straight from what Claude wrote for the feature list, emojis included_

- 🎮 Real-time game state synchronization via WebSockets
- 👥 Support for 2-10 players plus spectator mode
- 💫 Track life totals, commander damage, poison counters, and custom counters
- 🎴 Commander selection via Scryfall API
- 🎲 Random player selection with "Chooser" feature
- 📱 Progressive Web App - installable on mobile devices
- 🔄 Auto-reconnection and game code persistence

<!--
## Implementation Details

Explain interesting technical details, challenges, and solutions.

## Results

Share metrics, outcomes, or feedback from the project.
-->
