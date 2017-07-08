---
title: "Bootstrapping Chef with configs stored in S3"
date: 2014-07-11
description: "Bootstrapping Chef with configs stored in S3"
---

Bootstrapping Chef with configs stored in S3 for fun and profit!

Create an S3 bucket, upload client.rb and chef-validator.pem


Within IAM Roles, create a new role (I used "chef-client") of AWS Service Roles - Amazon EC2 type, with the following policy:

<!--more-->
{{< highlight json "linenos=inline">}}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1405116665000",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::BUCKET-NAME",
        "arn:aws:s3:::BUCKET-NAME/*"
      ]
    }
  ]
}
{{</ highlight >}}

Launch an EC2 Instance, specify the IAM Role you just created, and place the following in the user-data

{{< highlight sh "linenos=inline">}}
#!/bin/bash

# install the omnibus client
true && curl -L https://www.opscode.com/chef/install.sh | bash
# make a directory for chef stuff
mkdir /etc/chef

# Using awscli because it does some voodoo magic with IAM Roles specififed on an EC2 instance
easy_install pip
pip install awscli

# grab our private key for talking to hosted chef
aws s3 cp --region AWS-REGION s3://BUCKET-NAME/chef-validator.pem /etc/chef/chef-validator.pem
# grab a minimal client.rb for getting the chef-client registered
aws s3 cp --region AWS_REGION s3://BUCKET-NAME/client.rb /etc/chef/client.rb

#kick off the first chef run
/usr/bin/chef-client
{{</ highlight >}}
