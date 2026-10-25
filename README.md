# Planet Explorer (Code 16)

A responsive web app that recreates the Capstone Figma mockup. Users search for a planet by name, see its details in a card, and browse a comparison table of the planets. It supports light and dark mode and loads live planet data from an API.

Design: Amaka N (Figma mockup). Built for the TS Academy capstone project.

**Live demo:** https://code-16-seven.vercel.app/

**Repository:** https://github.com/princeodoh566/code-16

## Team
| Member | GitHub |
|---|---|
| Prince (Team Lead) | [princeodoh566](https://github.com/princeodoh566) |
| Comfort (Assistant Team Lead) | [Macomi27](https://github.com/Macomi27) |
| Adeola | [Mr-Adeola](https://github.com/Mr-Adeola) |
| Sheriff | [allabouttobi](https://github.com/allabouttobi) |
| Skipper | [harrydev-pro](https://github.com/harrydev-pro) |
| Nathanael | [Nathanaelfowler](https://github.com/Nathanaelfowler) |
| AbdulRasheed | [abdrash-beep](https://github.com/abdrash-beep) |
| Fuhad | [Adexstar](https://github.com/Adexstar) |
| Blessing | [OLaditiblessing28](https://github.com/OLaditiblessing28) |
| Olusegun | [Obasprince](https://github.com/Obasprince) |
| Olumide | [OfficialBambam-Olumide](https://github.com/OfficialBambam-Olumide) |
| Ummu-l-Khayr | [Riiree](https://github.com/Riiree) |
| Christiana | [tiana9495-debug](https://github.com/tiana9495-debug) |
| Muhammed-Awal | [Focus-06](https://github.com/Focus-06) |
| Memunat | [Memunat-hub](https://github.com/Memunat-hub) |

## Components and who worked on them
| Component / function | Who worked on it | Status |
|---|---|---|
| Repository, group rules, merging, final approval | Prince | Done |
| **JavaScript patch:** all JavaScript tasks (see [JavaScript tasks and the patch](#javascript-tasks-and-the-patch)) | Prince | Done |
| Project board, README, deployment | Comfort | Done |
| Folder structure, .gitignore, base page, header HTML | Adeola | Done |
| Search section (HTML and CSS) | Fuhad | Done |
| Planet card shell and loading/error HTML | Christiana | Done |
| Planet table (HTML and CSS) | Skipper | Done |
| Footer (HTML and CSS), loading/error CSS | Blessing | Done |
| Global styles, header CSS, dark mode | Nathanael | Done |
| Planet card CSS, hover and focus states | Olusegun | Done |
| Mobile layout | Muhammed-Awal | Done |
| API fetch, loading state, table and card rendering, valid search, table-to-card link | Olumide (assigned) | Not completed by assignee. Done by Prince (patch) |
| Error state, retry, empty and invalid search, theme toggle and saved theme | AbdulRasheed (assigned) | Not completed by assignee. Done by Prince (patch) |
| Accessibility review, desktop and light/dark QA | Ummu-l-Khayr | Done |
| Mobile, search and live-site QA | Memunat | Done |
| API QA, final QA | Comfort | Done |

## JavaScript tasks and the patch
Some assigned tasks were not completed by the time the project had to ship. To keep the project working and ready to deploy, **Prince (team lead)** wrote the missing code as a patch and committed it directly to `main`. This affected about eight members' tasks, including both JavaScript assignments. The commit history on GitHub shows exactly what was committed and by whom.

The two JavaScript assignments were:

- **Olumide (JavaScript Lead):** API fetch and loading state (4.1, 4.2), table rendering (4.7), card rendering (4.8), valid search (4.9) and table-to-card link (4.10).
- **AbdulRasheed (JavaScript Developer):** error state and retry (4.3, 4.4), invalid search (4.5), empty search (4.6), theme toggle (4.11) and saved theme (4.12).

Both were written by Prince as part of the patch. The code lives in `js/script.js`, split into the same sections as the original task list, with the marker comments from the task briefs.

## Technologies
- HTML, CSS and JavaScript (no frameworks)
- Fetch API for planet data: https://anurella.github.io/json/planet.json
- Git and GitHub for teamwork
- Figma for the design
- Vercel for hosting

## Project structure
```
index.html        page structure
css/style.css     all styles (global, components, dark mode, interaction states, mobile)
js/script.js      all behavior (API, rendering, search, error and retry, theme)
assets/           images and icons
```
Each file is divided into sections with marker comments such as `/* ===== SEARCH: Fuhad (3.4) ===== */`. Code for a task sits under its marker. All file and folder names are lowercase because Vercel is case-sensitive.

## Run it locally
1. Download or clone the repo.
2. Open `index.html` in your browser.
3. You need an internet connection for the planet data.
4. If the planets don't load, run it through a local server such as the VS Code "Live Server" extension.

## Git workflow
1. Never push directly to `main`.
2. Each task has its own branch.
3. Open a pull request when the task is finished.
4. The person who opens a PR does not review and merge it.
5. Every PR is reviewed before merging.

## Member sections

### Prince
Team lead. Set up the repository and the team rules, handled final approval and merging, and wrote the patch (including all JavaScript) that completed the project. See [JavaScript tasks and the patch](#javascript-tasks-and-the-patch).

### Comfort
Assistant team lead. Invited the members, ran the project board, wrote the README, carried out the API QA and final QA, and handled the Vercel deployment.

### Adeola
HTML lead. Set up the folder structure and `.gitignore`, built the base `index.html` page and the header.

### Sheriff
Assigned the tablet layout, which is not part of this release.

### Skipper
Built the planet table in HTML and CSS, including the grouped rows for Terrestrial, Jovian (Gas Giants and Ice Giants) and Dwarf Planets.

### Nathanael
CSS lead. Wrote the global styles and the shared CSS variables, the header CSS and the dark mode.

### AbdulRasheed
Assigned the error state and retry, the empty and invalid search handling, the theme toggle and the saved theme. This code was written by Prince as part of the patch (see [JavaScript tasks and the patch](#javascript-tasks-and-the-patch)).

### Fuhad
Built the search section (HTML and CSS): the search form, input, search button and the search message.

### Blessing
Built the footer (HTML and CSS) and the CSS for the loading and error states.

### Olusegun
Wrote the planet card CSS and the hover and focus states across the page.

### Olumide
Assigned the API fetch, loading state, table and card rendering, valid search and the table-to-card link. This code was written by Prince as part of the patch (see [JavaScript tasks and the patch](#javascript-tasks-and-the-patch)).

### Ummu-l-Khayr
Design and QA. Reviewed the desktop layout, light and dark modes, and accessibility.

### Christiana
Built the HTML for the planet card shell and the loading and error states.

### Muhammed-Awal
Wrote the mobile layout CSS.

### Memunat
Design and QA. Tested the mobile layout, the search and the live site.