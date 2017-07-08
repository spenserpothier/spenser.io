---
title: "Find out which user an IAM access key belongs to"
date: 2014-07-02
description: "IAM Access Key script"
---

Found (and modified) this python script to find out which user an access key belongs to in the following Gist. This assumes that the keys specified in the ```AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY``` environment variables have permission to list IAM users.
<!--more-->

{{< gist spenserpothier cec817211f93dc0e3910 >}}

