---
title: Building Gesture Fan
description: Project writeup of a fan controlled with computer vision
date: 2026-05-18
icon: sparkles
---

Gesture Fan began with a simple annoyance: a fan that blows air at an empty corner of the room while you sit just out of its reach.

![The Gesture Fan prototype](posts/placeholder.svg)

## The idea

What if the fan could see? Not in a creepy way — just enough to know roughly where a person is and point itself at them. And if it could see hands, it could skip the remote entirely.

## How it works

The prototype runs a lightweight pose model on a small camera mounted above the grille. Three things fall out of that:

- It tracks the nearest person and slowly rotates to follow them
- It recognises a handful of hand gestures for speed and oscillation
- It pairs with a companion app over the local network for fine control

The motor control turned out to be the hard part. Cheap stepper motors are noisy, and nobody wants a fan that sounds like a printer.

## What I learned

Hardware is humbling. Software bugs you fix in a hot reload; a wiring mistake you fix with a soldering iron at midnight. But there is nothing quite like the moment a thing you built physically turns to look at you.

More writeups to come as the project grows.
