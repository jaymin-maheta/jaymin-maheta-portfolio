# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Custom Skills

This repo has custom skills in `.claude/skills/` (auto-discovered by Claude Code — invoke with `/<skill-name>`):

- **frontend-design** (`.claude/skills/frontend-design/`) — Design-thinking guidelines for building distinctive, production-grade frontend UI (typography, color, motion, layout). Use when building or styling web components, pages, or applications.
- **ui-ux-pro-max** (`.claude/skills/ui-ux-pro-max/`) — UI/UX design intelligence database (styles, palettes, font pairings, charts, stack-specific guidelines) queried via `python3 .claude/skills/ui-ux-pro-max/scripts/search.py`. Use when designing, reviewing, or improving UI/UX.
