---
title: "EC2 Cloudinit and Redhat"
date: 2013-11-07
description: "EC2 RHEL bug"
---

Base Redhat AMIs do not come with aws-cfn-bootstrap installed. To use cfn-init in various cloudformation scripts, a new base image is needed with these tools installed. Here is how i did so:

{{< highlight sh "linenos=inline">}}
$ easy_install requests
$ easy_install python-daemon

$ wget https://s3.amazonaws.com/cloudformation-examples/aws-cfn-bootstrap-latest.tar.gz
$ tar -xvzf aws-cfn-bootstrap-latest.tar.gz
$ cd aws-cfn-bootstrap*
$ python setup.py build
$ python setup.py install
{{</ highlight >}}

