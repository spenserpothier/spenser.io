---
title: "Redhat Amazon Image(AMI) Creation Issues"
date: 2013-11-15
description: "Issue with RHEL and Amazon Machine Images"
---

Continuing with my latest adventures in AWS and Redhat, I found an issue that occurs with a pretty high degree of frequency. The problem occured when I did the following:

1. Launch an image using the default RHEL image
* Configure/install all of the things needed for that instance
* Stop instance, create image from it.
* Launch instance from newly created image
* Try to connect to instance via SSH
* Connection refused. Sad face.


Turns out it's an issue that is present in the image provided by Amazon, and the /etc/ssh/sshd_config is messed durring the image creation/rebooting process.

To fix this, I commented out the following three lines from /etc/rc.d/rc.local file:

{{< highlight sh "linenos=inline">}}
cat <<EOF>> /etc/ssh/sshd_config 
UseDNS no 
PermitRootLogin without-password
{{</ highlight >}}

And the following from /etc/ssh/sshd_config
{{< highlight sh "linenos=inline">}}
permitrootlogin without-password
permitrootlogin without-passwordUseDNS no
{{</ highlight >}}

Sources:  
[Stack overflow - EC2 instance launched from AMI not reachable(ssh) after start/stop or reboot](http://stackoverflow.com/questions/17296655/ec2-instance-launched-from-ami-not-reachablessh-after-start-stop-or-reboot)  
[Redhat Bugzilla Bug #956531](https://bugzilla.redhat.com/show_bug.cgi?id=956531)  
