#!/bin/sh -l

echo "Token: $1"
echo "Output: $2"
echo "since: $3"
echo "next: $4"
echo "filter: $5"
echo "labels: $6"

time=$(date)
echo "::set-output name=changelog::$time"