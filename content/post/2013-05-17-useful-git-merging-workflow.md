---
title: "Useful Git Merging Workflow"
#categories:
#- Development
#- Technology
#tags:
#- git
#- workflow
description: "Git workflow"
date: 2013-05-17
---

This is a useful git workflow for merging development work into the master branch in git that has made for nice clean merges. Special thanks to my Coworker Jeremy for sharing this.

This assumes you've cloned to branch "master", and are working in local branch "dev". As a best practice, you never really want to work in master, it should always be a clean copy of the remote origin.

<!--more-->

From the top, on "master":


<ol>
	<li>git checkout -b dev</li>
	<li>do some dev work</li>
	<li>git commit</li>
	<li>repeat from 2. until you're ready to commit to the remote</li>
</ol>
<hr>
<ol>
	<li value=4>git checkout master</li>
	<li>git pull</li>
	<li>git checkout dev</li>
	<li>git rebase master</li>
	<li>git checkout master</li>
	<li>git merge dev</li>
	<li>git push</li>
	<li>git checkout dev</li>
	<li>continue from 2</li>
</ol>

From his original email on this subject: "The other nice thing about this method is that you can have as many "dev" branches as you want and they wont conflict with each other as long as you only ever track to and from master. You can also make child branches from "dev" following the same rebase->merge pattern without any problems."
