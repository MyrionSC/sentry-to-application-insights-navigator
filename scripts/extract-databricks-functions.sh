#!/usr/bin/env bash
# should be run in databricks root repo
rg "^def " --json | ./extract-matches.py
