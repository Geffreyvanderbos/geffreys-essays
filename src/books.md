---
layout: layouts/base.njk
title: Books
permalink: /books/
---
What I'm reading, what I've read, and what I intend to read.

{% for shelf in books.shelves %}
## {{ shelf.name }}

{% if shelf.description %}_{{ shelf.description }}_{% endif %}

{% if shelf.books.length %}
<div class="bookshelf">{% for isbn in shelf.books %}{% book isbn %}{% endfor %}</div>
{% else %}
_Nothing here yet._
{% endif %}

{% endfor %}
