title: 90s Ipsum
date: 2013-02
updated: 2013-03
ongoing:
thumbnail: thumbnail.png
description: Dope filler text for your design project.
color:
vertical_layout:
reading_time: 3
featured:
categories:
tags:
- personal
- dev
---

# 90s Ipsum

<span class="lead-in">Though it's gotten its fair share of criticism</span>, [lorem ipsum](http://en.wikipedia.org/wiki/Lorem_ipsum) text is still helpful to designers and developers in many instances. Where do you go when you need filler text in a pinch?

There are a [ton](http://ipsum-generators.com/) of ipsum generators out there, and for good reason—they're fun, and relatively easy to make. But for all their creativity, few websites actually make it easy for you to copy text to your clipboard. `⌘`+`A` selects stuff you don't need. Since the text often runs longer than the page height, you're then forced to manually highlight the text and scroll down while continuing to hold down the selection.

I created 90s Ipsum wanting a better (and better looking) ipsum tool. In version 1, I utilized the [ZeroClipboard](http://zeroclipboard.org/) JavaScript library to achieve "click to copy" functionality: you can click anywhere in the text and the paragraphs are copied to your clipboard.

<img class="wide bordered rounded" src="v1.png" alt="&ldquo;Click to copy&rdquo; functionality in version 1">

---
<span class="lead-in">It worked&hellip;most of the time</span>. During times it didn't, however, text selection wasn't possible until you refreshed the page, rendering it even worse than those manual highlight-and-copy ipsum generators.

So in the second version, I simplified. I removed ZeroClipboard and focused on making text selection easier instead. No JavaScript needed. Now, only the text you want to select is selectable, so `⌘`+`A`, `⌘`+`C` will let you quickly select and copy the ipsum content.

<img class="wide bordered rounded" src="v2.png" alt="Selective text highlighting in version 2">

---
<span class="lead-in">This project</span>, for me, reinforces the value of [*primum non nocere*](http://en.wikipedia.org/wiki/Primum_non_nocere)—first, do no harm. The benefits gotten from "click to copy" didn't outweigh the cost of adding complexity and introducing bugs (with no graceful degradation, to boot). Copying text the usual way worked just fine; it just needed a little tweaking.

Fewer parts means fewer things that can break or have to be maintained. The best solution is usually the simplest one.

###### View [90s Ipsum](http://justinjaywang.com/90s-ipsum/).
