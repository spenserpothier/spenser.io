---
title: Preventing flickering when clicking on "#" links
decription: "UI Flickering prevention"
date: 2013-08-30
#categories:
#- Development
---

On a recent single page website I was working on, I was using something along the lines this for my navigation menu: 

<!--more-->

{{< highlight html "linenos=inline">}}
<ul>
     <li><a href="#" id="nav1">Navigation 1</a></li>
     <li><a href="#" id="nav2">Navigation 2</a></li>
     <li><a href="#" id="nav3">Navigation 3</a></li>
</ul>
{{</ highlight >}}

I attached a click handler to each link, and I was adding a class to the active link and using jQuery to scroll the page, but before the scrolling would take place, the navigation bar would flicker. This was done with a function like:

{{< highlight javascript "linenos=inline">}}
$("#nav1").click(function () {
     // add class active class
     // scroll to correct position
});
{{</ highlight >}}

After a little bit of digging I found out that this is caused by the fact that I'm using anchor links for the navigation which have a default action of navigating to the appropriate anchor point. To fix this I updated my click handler to suppress this action like so:

{{< highlight javascript "linenos=inline">}}
$("#nav1").click(function (e) {
     e.preventDefault();
     // add class active class
     // scroll to correct position
});
{{</ highlight >}}

I hope this helps someone else too.
