title: llllyrics
date: 2014-11
published:
thumbnail: edit.gif
description: Collaboratively edited lyrics.
color: rgb(127,149,255)
vertical_layout: 1
reading_time: 8
featured: 1
categories:
tags:
- personal
---

# llllyrics

Lyrics websites are notoriously bad. Anyone who’s ever searched for lyrics online knows this. They’re always slow, full of ads and pop-ups, and look like they were made over a decade ago (most probably were). No care or thought has been put into the typography of the lyrics themselves—pretty offensive when you consider that, well, they're lyrics sites.

I wanted to build a better lyrics website—one that's accurate, easy to use, and values readability.

---
### Initial planning

Early on, I had to decide where to get the lyrics content. I didn't want to depend on a third party. Doing so, I've learned, leaves you at the whim of API upgrades and changes—as they change, so must you. I wanted a more hands-off approach.

The solution? Crowdsource the lyrics. Anyone can add a song, and if there's a mistake to an existing song, they can make edits. This strategy requires the least maintenance while improving the accuracy of the lyrics.

### Version 1: MVP

For the minimum viable product (MVP), I used [AngularJS](https://angularjs.org/) as the framework and focused only on the features that were absolutely necessary: discover, view, and add or edit a song.

*Discover*. Lyrics sites visitors are often one-off, spontaneously looking to find lyrics to a particular song they've just heard or are listening to at the moment. Given this, the interface was designed to be entirely search-focused. No browse latest or view popular. Right away, you can just type the song you’re looking for into the huge search field in the middle of the screen.

*View*. On the view page especially, readability was a priority. This meant good typography as well as having the appropriate context—ads and other unnecessary elements that can detract from the reading experience are nowhere to be found.

*Add or edit*. The edit page doesn’t look like a typical web form. Instead, it was made to look just like the view page. This way, when you see a mistake, you can seamlessly and quickly correct it, then go back to viewing the song.

<img class="default" src="temp/v1/edit.gif" alt="Editing a song in version 1.">

### Version 1.1: improvements

In the second iteration, I made a number of usability improvements that I found were needed from using the site myself.

*Advanced search*. Search functionality in the first release was admittedly primitive. To address this, advanced operators were added to provide more control over the search results. With these, you can restrict your search to a particular field or use quotes to find an exact phrase (for example, `album:youth` limits the query `youth` to the album only and excludes matches to other fields). I favored this approach over, say, explicit field searches in order to keep the interface as simple as possible, at least on the surface. More functionality is there, but only for those who need it.

*Remember previous search*. Navigating back from the view page used to clear the search query that got you to that song. But what if you had chosen the wrong song or wanted to view other results from that query? Now, your previous search query and results are remembered when you navigate back, which was a dramatic improvement.

*Autocomplete*. In first iteration, having to completely type in the artist and album name posed a barrier to adding songs. It also opened the door for having formatting or spelling differences for the same intended entry (e.g., both *Belle & Sebastian* and *Belle and Sebastian*). Autocomplete solved both of these problems.

<img class="default" src="temp/v1/autocomplete.png" alt="Autocomplete for artist and album.">

---
### Version 2: remake

About a year went by, and I had slowly built up a long list of ways to improve the site.

*Back-end refactor*. By this time, AngularJS had gone some major upgrades and I decided to switch to the latest version to take advantage of all the features. Doing so required a lot of code refactoring and reorganization (in fact, everything was written again from scratch), but it was worth it to do things right. I also added automated tasks with [Gulp](http://gulpjs.com/). Browse the [source code](https://github.com/justinjaywang/llllyrics) for more details.

*Caching*. Speed was one of my original tenets, yet I wasn't happy with the performance. I improved speed in the newer version using a cached version of the data most of the time, only refreshing the cache when a song has been added or updated.

*Loading indicator*. In the previous version, there was no indication that the page was loading or querying the database. It was confusing, so naturally I decided to add a loading indicator.

<!-- PICTURE: lllloading GIF -->

<!-- search query URLs -->
*Search query URLs*. The web is all about URLs. That's how you share something. It was a shame, that in the last version you couldn't have a dedicated URL for a particular search. I solved this in version 2 by rewriting the URL per the search query. In effect, now you have a dedicated page for artists or albums at no extra cost; for example `llllyrics.com/?q=artist:Radiohead`.

<!-- visual refinements, new branding -->
*Visual refinement*. The visual design of llllyrics got a facelift in this second version. Letter spacing and line height were refined, and the accent color changed from bright green (kind of silly) to a more respectable periwinkle.

<!-- PICTURE: gif showing evolution of search page -->

<!-- moved buttons to bar -->
*Sticky header bar*. One of the major drawbacks of the action buttons of edit—cancel, save—was that they were towards the bottom of the lyrics. You had to scroll to the bottom. I moved all the controls to the header and created a uniform system. The home button is always in the top left, and contextual actions are top right. I retained the bright "save" on edit page and bright "add" for the add page.

The header is affixed when needed—when scrolling upwards or when you've scrolled all the way to the bottom. This comes in handy when you've gotten to the end of a long set of song lyrics and want to go back—now you don't need to scroll all the way up to do so.

<!-- PICTURE: gif showing bar when scrolled to bottom? -->

---
<!-- learnings -->
As with other personal projects I’ve done in the past, llllyrics was motivated by a need I had (in this case, a need to view lyrics on a non-ugly website). llllyrics was iterated on after the first version, and again after the second. And the majority of these insights for improvement came through using it myself.

- I feel that this time around, I approached it having greater development skills and a more refined visual sense. <!-- fix that wording -->
- continue improving upon a product over time
- with each new iteration, you'll have improved your skills and taste each time

It's for this reason I believe a successful product must be one you use yourself. Only then will you really care and devote energy to crafting the best possible solution. At its best, it's a product you love to use. If you love to use it, others will too.
