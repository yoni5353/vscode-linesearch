# Linesearch extension

This extension adds a fuzzy Search command that finds all matching lines in the workspace, and feels much quicker to use then the VSCode's search panel.

The search is fuzzy, which makes searching much more convenient. For instance, searching for all react imports is as trivial as _"import react"_.

> Inspired by the great https://github.com/jacobdufault/vscode-fuzzy-search, in which the searching only works for the current active document.

### How to use
Search for the "Linesearch: Search" command, or bind linesearch.search to a keyboard shortcut.

### vs. VSCode's Quick Text Search
VSCode recenetly added a new similar "Quick Text Search" command (@workbench.action.experimental.quickTextSearch). However, it is still experimental and lacks some features, namely the fuzziness, searching for currently selected text, and previewing the current relevant file/line in the editor -- which is very handy.
