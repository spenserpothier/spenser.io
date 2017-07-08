---
title: Setting up ephemeral disks as JBOD on EC2
date: 2014-11-11
description: "JBOD Instance Store Disks"
---

I recently had to setup the instance store blocks on some EC2 instances in a JBOD configuration, and wanted to make note of how I did this for future reference. In this example I was using <code>m3.2xlarge</code> instances with 2x80GB SSD instance stores on it. They are attached at <code>/dev/xvdb</code> and <code>/dev/xvdc</code>. I'm using LVM to do all of this, and the instances are running RHEL 6.5 

The first ephemeral disk is usually mounted on launch, so unmount it
{{< highlight sh "linenos=inline">}}
$ umount /dev/xvdb
{{</ highlight >}}
<!--more-->

Create physical volumes with pvcreate

{{< highlight sh "linenos=inline">}}
$ pvcreate /dev/xvdb
  Physical volume "/dev/xvdb" successfully created
$ pvcreate /dev/xvdc
  Physical volume "/dev/xvdc" successfully created
{{</ highlight >}}

Create volume group with vgcreate 
{{< highlight sh "linenos=inline">}}
$ vgcreate vg0 /dev/xvd[bc]
  Volume group "vg0" successfully created
{{</ highlight >}}

Create logical volume that uses all available space on the volume group using lvcreate

{{< highlight sh "linenos=inline">}}
$ lvcreate -l 100%FREE -n lvol1 vg0
  Logical volume "lvol1" created
{{</ highlight >}}

Make filessytem on this logical volume (I chose ext3)

{{< highlight sh "linenos=inline">}}
$ mkfs.ext3 /dev/vg0/lvol1
mke2fs 1.41.12 (17-May-2010)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
9830400 inodes, 39315456 blocks
1965772 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=4294967296
1200 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks:
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
	4096000, 7962624, 11239424, 20480000, 23887872

Writing inode tables: done
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done

This filesystem will be automatically checked every 35 mounts or
180 days, whichever comes first.  Use tune2fs -c or -i to override.

{{</ highlight >}}

Mount the disk and check the available disk space

{{< highlight sh "linenos=inline">}}
$ mount /dev/vg0/lvol1 /mnt
$ df -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/xvda1            9.9G  2.4G  7.1G  25% /
tmpfs                  15G     0   15G   0% /dev/shm
/dev/mapper/vg0-lvol1
                      148G  188M  140G   1% /mnt

{{</ highlight >}}

Party.
