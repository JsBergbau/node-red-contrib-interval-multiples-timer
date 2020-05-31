# Multiples-Interval-Timer

This work is based on https://stackoverflow.com/questions/44109445/node-red-how-to-make-inject-fire-at-given-seconds-per-minute

## Purpose

A interval timer that fires at multiples of the given interval, measured from Jan 1 1970.
This is especially useful for writing values to InfluxDB. Set the precision to "s" (seconds), then InfluxDB can use run-length-encoding for timestamps and saves a significant amout of space.

## Installation

Add it via the Palette manager in Node-RED

### License
GPL v3