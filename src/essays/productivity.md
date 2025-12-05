---
title: All you need is 3 plain text files
date: 2025-10-04
---
It's been years since you bought Things 3. You used it a lot. Then a bit less. Now, it's decoration on your Home Screen. You watched YouTubers glorify Notion. _Databases_, _slash commands_, and _workflows_ galore! You were hooked, yet still got nothing done.

Then you read *[the essay](https://stephango.com/file-over-app)*. That was it! The truth! “Software companies are selling you access to your own data!”. Luckily, the essayist had the solution: [plain text](https://en.wikipedia.org/wiki/Plain_text) files in https://obsidian.md.

You spend months finding the perfect plugins and themes. You’re still tinkering today, ashamed of the hours wasted. Regardless, you keep coming back to the same realisation: All you need are three files! 

The holy trifecta: calendar\.md, todo\.md, and a journal file. 

Mere text files on your desktop. Or wherever you’re storing them. Plop them in iCloud. Use [Syncthing](https://syncthing.net/) and get [mad at Apple](https://mobiussync.com/). Heck, use Git, you nerd.

Text files are *[goated](https://www.merriam-webster.com/dictionary/GOATED)*.

Open them in any text editor. Use simple scripts to automate, extract, and transform them. As long as machines exist, the files will be readable.

No more lock-in for you, buddy. Enjoy the freedom.

## Calendar
We’ll start with the calendar\.md, based on [calendar.txt](https://archive.ph/6l2Vg). You can write a script to generate a few years worth of lines, or download a pre-filled file. Anyhow, it’ll look like this:

```
2025-11-17 w47 ma  11 Release +software @work.
2025-11-18 w47 di  
2025-11-19 w47 wo  10:30 Design. 14 Lunch with @Peter.
2025-11-20 w47 do  
2025-11-21 w47 vr  09:30 Launch new +initiative. 15 Retro.
2025-11-22 w47 za  
2025-11-22 w47 za  
2025-11-23 w47 zo  16-21 🍽️ Dinner with @mom
2025-11-24 w48 
2025-11-24 w48 ma  
2025-11-25 w48 di  Day in Amsterdam. 14 Check-in +corporateSite.
2025-11-26 w48 wo  
2025-11-27 w48 do  
2025-11-28 w48 vr  
2025-11-29 w48 za  +bd 
2025-11-30 w48 zo  
2025-12-01 w49  
2025-12-01 w49 ma  
2025-12-02 w49 di  15 Introduction with new PM.
2025-12-03 w49 wo  +hol 🛫 holiday. 14:30-16 AMS-COP.
2025-12-04 w49 do  +hol 🍹 holiday
2025-12-05 w49 vr  +hol 🍹 holiday. 12 Check-out 🛎️.
[..]
2027-10-13 w41 Wed  
2027-10-14 w41 Thu  
2027-10-15 w41 Fri  
2027-10-16 w41 Sat  
2027-10-17 w41 Sun  
[..]
```

Look at that. Your whole life’s planning in one astonishing list. Easily tagged and searched. No need to click around in an infuriating UI.

Find today’s date, add two spaces after the day abbreviations and type your event. Is it a whole day thing? Don’t add a timestamp. A dot denotes the end of the entry. Use plusses (+) for projects, use at symbols (@) for contexts. Adding these will allow you to easily filter lists. 

That’s all there is to it.

## Todo
Todo\.md is the exact same as [todo.txt](https://archive.ph/BMAla). I just changed the extension to .md for compatibility reasons. The syntax is slightly more complex than calendar\.md. But it isn’t rocket science.

Each line is a task. Tasks can have priorities ((A)), projects (+GarageSale), and contexts (@phone). The same concept as calendar\.md. A task's creation date can follow the priority. If you find that useful. Completed tasks begin with an x and an optional completion date. (Sometimes, it’s helpful to see what you did when.) Other info can be added with a key:value format.

```
(A) Buy insoles for winter shoes
(A) Add windscreen fluid to car
(B) Reduce own risk on our health insurances due:2025-12-24
(C) Write cancellation letter to redacted service
Pay back taxes – calculate validity due:2026-01-06
Clean fridge glass panes 🧊
Learn out how it works after a bid on a house, with a notary etc.
Add updated [[workout plan]] to Liftin'
Finish branding concept for digital @work due:2025-12-01
Make a Kanban board in Jira 🤮 for @work items
Solve tech/design debt, create better versions of search result variants @work
x 2025-11-22 (A) put pork out of freezer in fridge for tomorrow
```
I use Apple Shortcuts to append new tasks easily. No need for fancy apps.

And yes. It looks messy after a while. Luckily there are syntax highlighters ([1](https://nerdur.com/todour-pl/), [2](https://github.com/rioskit/obsidian-todo-txt-mode), [3](https://apps.apple.com/us/app/todotxt/id6443649697)) around.

## Journal
This one is often called the [One Big Text File](https://ellanew.com/2025/04/14/obtf-start-here) (OBTF). Each year, you create a file that’ll hold all your thoughts. Write anything underneath the day heading.
Your deepest, darkest secrets. Nice happy moments. And that thing you can’t stop thinking about when you wake at 02:00. Here’s a made-up 2025.md:

```
## 2025-11-23
- Trying out a new Pomodoro timer app. Seems… fine. I think my focus is more influenced by music than by time.
- Started sketching out the layout for the musicology blog. 
    - Thinking a minimalist approach, lots of white space.
- Found a great article on the history of the electric guitar.
    - Adding it to my Zotero queue here: [[The history of the electric guitar]]
    - The [[electric guitar]] was developed in the early 20th century 
    - Significant advancements occurring in the 1930s
    - [[George Beauchamp]] created the first commercially successful model, known as the "Frying Pan." 
    
## 2025-11-24
- Piano practice went well! Managed to play through a simple exercise without too many mistakes. I think it's the posture. Next session I should keep this in mind.
- Experimenting with different CSS themes for Obsidian. Gruvbox is growing on me.
- Had a good conversation with Julia about the house hunting process. She's right, we need to be more critical of the properties we view.
    - Got a good tip on #buyingHouses, always bid at the last moment. This way, the broker can't instruct anyone else to overbid.

## 2025-11-25
- Spent way too long tweaking my Neovim config. It's a rabbit hole! But it feels good to have your own crafted editor.
- Thinking about the connection between [[music and memory]]. Why do songs evoke such strong memories? I should look into that. #curios
- Finally replied to Peter about [[his design project|Peters design project]]. Sounds interesting, but I'm already overloaded. Politely declined.
```

You’ll feel awkward the first few days. “What do I write!?” I'm telling you: trust the process. Eventually you will start noticing things just pop-up. You’ll write them down and the snowball starts rolling.

Oh, if you’re doing Zettelkasten, use this file too. Write down everything you learn. From concrete insights to intuitions. Anything you find interesting. When it warrants a stand-alone note, write it and tag it here. It’ll become your learning hub.

That’s all there is to it. Now, you’ll be able to find and filter through your life. Forever.
