# Plain-language code explanation

This document explains the code files in `my-project` in the same order in which the browser reads them. Lines that only contain indentation or a closing brace do not perform an independent action; their purpose is shown in the explanation of the block they close.

The project contains two pages:

- `index.html` is the information page.
- `screening.html` is the interactive screening and resource page.
- `styles.css` contains the shared visual design.
- `script.js` contains symptom matching, validation, distance calculations, and resource selection.

## `index.html`

### Document and head

- `<!DOCTYPE html>` tells the browser to use the HTML5 standard.
- `<html lang="en">` starts the document and identifies English as its language.
- `<head>` starts the section containing page settings that are not displayed as page content.
- `<meta charset="UTF-8">` allows the page to display ordinary text and symbols correctly.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` makes the layout use the device width and work on phones.
- `<title>Understanding NDDs in Children -- Kenya</title>` sets the browser-tab title.
- `<link rel="stylesheet" href="styles.css">` loads the shared stylesheet.
- `<style>` starts CSS written inside this HTML file. These rules customize the information page.
- `:root` starts the page-level color variables.
- `--soft-blue`, `--soft-blue-dark`, `--beige`, `--beige-dark`, and `--text` store reusable color values.
- The `body` rule gives this page its background gradient and text color.
- The `header` rule gives the top banner its orange gradient, white text, padding, centered text, and spacing.
- `header h1` removes the default heading margin and sets the heading size and color.
- `.subtitle` centers the subtitle, limits its width, sets its size, and makes it slightly transparent.
- `.cta-button` makes a link look like a button by setting its display, colors, padding, rounded corners, font weight, and hover transition.
- `.cta-button:hover` changes the button to a darker green while the pointer is over it.
- `main` centers the main page content and limits it to 860 pixels.
- `section` gives information sections a light background, rounded corners, padding, spacing, shadow, and orange top border.
- `h2` removes its top margin and gives section headings a dark green color.
- `.types-intro` gives the condition introduction a gray color.
- `.research-visuals` arranges research illustrations in a centered, wrapping flex layout.
- `.research-figure` removes the figure margin, centers its text, and limits its width.
- `.research-figure svg` makes each illustration fill its available width while keeping its proportions.
- `.research-figure figcaption` makes captions small, gray, and separated from the illustration.
- `.research-note` makes the research note small, gray, italic, and spaced from the graphics.
- `.condition-grid` creates a responsive grid. Each card is at least 230 pixels wide, and the number of columns changes automatically.
- `.condition-card` styles each condition with a pale background, border, rounded corners, and padding.
- `.condition-card h3` controls the condition title margin, size, and color.
- `.condition-sub` displays the expanded condition name as a smaller block of text.
- `.condition-card p` styles the short condition description.
- `.condition-card ul` controls the symptom list margin, indentation, size, and color.
- `.condition-card li` adds space below each symptom.
- `.cta-section` centers the final call to action and gives it a second light gradient.
- `.cta-section p` limits the paragraph width, centers it, and sets its color.
- `.disclaimer-small` makes the medical disclaimer small and gray. `!important` ensures its top margin wins over another paragraph rule.
- `</style>` ends the page-specific CSS.
- `</head>` ends the document settings.

### Visible page

- `<body>` starts everything visible in the browser.
- `<header>` starts the page banner.
- `<h1>` displays the main title about neurodevelopmental disorders.
- `<p class="subtitle">` displays the short parent-focused description.
- `<a href="screening.html" class="cta-button">` creates a button-like link to the screening page.
- `</header>` closes the banner.
- `<main>` starts the central information content.

### Introduction section

- `<section class="intro-section">` creates the introduction block.
- `<h2>` labels the block with the question about NDDs.
- The first `<p>` explains what a neurodevelopmental disorder is and which areas it can affect.
- The second `<p>` explains that individual traits do not automatically mean a diagnosis and that early professional support can help.
- `</section>` closes the introduction block.

### Research section

- `<section class="research-section">` creates the Kenya research block.
- `<h2>` displays the research heading.
- `<em>` italicizes the publication name.
- `<strong>` makes the key study statistic bold.
- `<div class="research-visuals">` groups the two visual summaries.
- `<figure class="research-figure">` starts the first illustration and its caption.
- `<svg viewBox="0 0 220 160" ...>` creates a scalable 220 by 160 SVG drawing and marks it as an accessible image.
- `<title>` gives the first SVG an accessible title.
- `<desc>` gives screen readers a longer description of the statistic.
- The first `<rect>` draws the rounded pale background.
- The second `<rect>` draws the tall bar representing all screened children.
- The third `<rect>` draws the short bar representing children identified with an NDD.
- The first two `<text>` elements label the screened bar.
- The next two `<text>` elements label the NDD bar.
- `</svg>` closes the first drawing.
- `<figcaption>` explains that the chart is an illustration, not an official reproduced chart.
- `</figure>` closes the first figure.
- The second `<figure>` starts the community-screening illustration.
- Its `<svg>`, `<title>`, and `<desc>` have the same accessibility purpose as the first drawing.
- Its `<rect>` creates the background.
- Its `<circle>` elements create the large and small symbolic areas.
- Its `<path>` elements draw the outlined symbol and connecting line.
- `</svg>` closes the second drawing.
- Its `<figcaption>` explains the meaning of the symbolic illustration.
- `</figure>` closes the second figure.
- `</div>` closes the visual group.
- The paragraph with class `research-note` warns that the graphics are simple site illustrations.
- `</section>` closes the research section.

### Condition cards

- `<section class="types-section">` starts the condition information section.
- `<h2>` displays the section heading.
- `<p class="types-intro">` explains that the tool suggests probable concerns, not diagnoses.
- `<div class="condition-grid">` starts the responsive card grid.
- Each `<article class="condition-card">` is one condition card.
- Each card's `<h3>` displays the short condition name.
- A nested `<span class="condition-sub">` displays the longer name where one is supplied.
- Each card's `<p>` gives a short explanation.
- Each `<ul>` starts a symptom list.
- Each `<li>` is one symptom.
- The seven cards describe ADHD, ASD, dyslexia, dysgraphia, dyscalculia, intellectual disability, and motor disorder.
- Repeated `</li>`, `</ul>`, and `</article>` tags close their current list and card.
- `</div>` closes the card grid.
- `</section>` closes the condition section.

### Final call to action

- `<section class="cta-section">` starts the final invitation block.
- `<h2>` asks whether the visitor is ready to screen a child.
- The first `<p>` explains what information the tool uses and what it returns.
- The second link to `screening.html` provides another button-like route to the tool.
- The paragraph with class `disclaimer-small` says that the tool is not a medical diagnosis.
- `</section>` closes the final block.
- `</main>` closes the main content.
- `</body>` closes the visible page.
- `</html>` closes the document.

## `screening.html`

### Document and header

- `<!DOCTYPE html>`, `<html lang="en">`, the UTF-8 meta tag, and the viewport meta tag perform the same document setup as in `index.html`.
- `<title>NDD Usaidizi Kwa Watoto</title>` sets this page's browser-tab title.
- `<link rel="stylesheet" href="styles.css">` loads the shared styles.
- `<body>` starts the visible screening page.
- `<header>` starts the page banner.
- The `home-link` anchor sends the user back to `index.html`.
- `<h1>` displays the screening tool title.
- `<p class="problem-statement">` explains why the tool exists and states the supported child age range.
- `</header>` closes the banner.
- `<main>` starts the page content.

### Research and screening form

- The first `<section class="research-section">` repeats the study context.
- Its `<h2>` is the research heading.
- Its `<p>` displays the study statistic.
- `</section>` closes that research block.
- `<section class="tool-section">` starts the form area.
- Its `<h2>` names the screening tool.
- `<p class="tool-intro">` explains that the result is a probable condition and not a diagnosis.
- `<form id="screening-form" novalidate>` creates the form. The `id` lets JavaScript find it, and `novalidate` lets JavaScript show its own validation messages.
- `<div class="form-group">` groups the symptom controls.
- `<fieldset id="symptoms" ...>` creates an accessible group of related checkboxes. Its `id` lets JavaScript find the group.
- `<legend>` labels the checkbox group.
- Each `<label class="symptom-option">` makes the text and its checkbox one clickable option.
- Each `<input type="checkbox" name="symptoms" value="...">` creates one selectable symptom. The `value` is what JavaScript reads.
- The 16 checkbox options cover attention, hyperactivity, impulsivity, social interaction, repetitive behavior, sensory sensitivity, reading, spelling, writing, numbers, milestones, life skills, coordination, balance, communication, and sleep.
- `</fieldset>` closes the symptom group.
- `#symptoms-hint` tells the user that up to 11 symptoms can be selected.
- `#symptoms-count` displays the current selection count.
- `#symptoms-error` is an initially hidden error area. `role="alert"` asks assistive technology to announce changes.
- The age `<input>` accepts a number from 3 through 16.
- The gender `<select>` provides female, male, prefer-not-to-say, and custom choices.
- `#custom-gender-group` starts hidden because it is only needed for the custom choice.
- The custom gender `<input>` accepts the user's own text.
- The county `<select>` lists the Kenyan counties. Each `<option>` supplies one value JavaScript uses to select resources.
- The submit `<button type="submit">` sends the form to the JavaScript submit handler.
- `</form>` closes the form.
- `</section>` closes the tool section.

### Results

- `<section id="results" class="results-section hidden">` creates the results area and hides it initially.
- Its `<h2>` names the result area.
- `.disclaimer` warns that the result is not a medical diagnosis.
- The first `.result-card` contains the probable condition.
- `#condition-result` is an empty paragraph that JavaScript fills with the condition name.
- `#condition-explanation` is filled with the condition explanation.
- `#condition-advice` is filled with support advice list items.
- The second `.result-card` contains resources.
- `#resources-heading` is changed by JavaScript to describe the search context.
- `#facility-list` is filled with resource list items.
- The `start-over` button resets the form and returns to the form view.
- `</section>`, `</main>`, and `</body>` close the results, main content, and page.
- `<script src="script.js"></script>` loads the JavaScript after the page elements exist, so the script can find them immediately.
- `</html>` closes the document.

## `styles.css`

- `*, *::before, *::after` selects every element and its generated before/after content.
- `box-sizing: border-box` makes declared widths include padding and borders.
- `body` sets the shared font, line spacing, text color, background, removes default margin, and adds horizontal and bottom padding.
- `header` creates the orange gradient banner, white text, padding, spacing, and shadow.
- `.home-link` makes the back link an inline block, white, slightly transparent, small, undecorated, and separated from the title.
- `.home-link:hover` makes the link fully opaque and underlined on hover.
- `header h1` removes the default top margin, adds a small bottom margin, and sets the title size.
- `.problem-statement` removes its margin, adjusts transparency, and sets its size.
- `main` limits the page width to 720 pixels and centers it.
- `section` sets the light background, rounded corners, padding, bottom spacing, orange top border, and shadow shared by sections.
- `h2` removes the top margin and colors headings green.
- `.tool-intro` colors the form introduction dark gray.
- `.form-group` adds space below each group of controls.
- `.form-group label` puts labels on their own line, makes them bold, and adds a small gap below them.
- `input[type="text"], input[type="number"], select, textarea` gives normal text inputs, number inputs, dropdowns, and textareas full width, consistent padding, border, rounded corners, font size, and inherited font.
- `.symptom-checklist` lays out checkboxes in a vertical grid, adds padding, border, rounded corners, and a pale background.
- `.symptom-checklist legend` adds a little horizontal space and makes the group label bold.
- `.symptom-option` puts each checkbox and its text beside one another, aligns them at the top, controls the gap, resets the general label margin/weight, and shows a pointer cursor.
- `.symptom-option input[type="checkbox"]` prevents the checkbox from shrinking, gives it a stable size, and aligns it with the text.
- `button` creates green buttons with white text, no default border, padding, rounded corners, readable size, and a pointer cursor.
- `button:hover` darkens buttons when hovered.
- `.hidden` removes an element from the layout with `display: none`.
- `.disclaimer` creates the yellow warning panel with a left border, padding, spacing, and smaller text.
- `.result-card` styles each result panel with a pale background, border, orange left border, rounded corners, padding, and spacing.
- `.result-card h3, .result-card h4` remove the top heading margin and make result headings green.
- `.condition-name` makes the probable condition larger, bold, and orange.
- `.condition-detail` colors explanations and advice dark gray.
- `.field-hint` styles helper text with small size, gray color, and close spacing.
- `.field-error` styles validation errors with a pale red background, red left border, dark red text, padding, and small size.
- `.field-error.hidden` keeps hidden errors removed from the page.
- `input[aria-invalid="true"], textarea[aria-invalid="true"]` gives invalid controls a red border.
- `.advice-list` indents the advice list.
- `.advice-list li` adds space between advice items.
- `.facility-cost` makes cost text green and slightly smaller.
- `.facility-travel` makes travel text gray, small, and italic.
- `.facility-links` places resource links on their own inline block with a small top gap.
- `.facility-links a` colors links orange and makes them bold.
- `.facility-links a:hover` changes resource links to green on hover.
- `#facility-list` indents the facility list.
- `#facility-list li` adds space between facility entries.
- `.facility-type` styles labels such as hospital, clinic, program, or online resource.
- `#start-over` gives the reset button a distinct orange color.
- `#start-over:hover` gives that button a darker orange hover color.

## `script.js`

### Page elements and settings

- `const form = document.getElementById("screening-form")` stores the form element.
- The next constants store the results section, gender dropdown, custom-gender group, custom-gender input, and start-over button.
- `symptomsInput` stores the checkbox fieldset.
- `symptomsCount` stores the paragraph that displays the count.
- `symptomsError` stores the error paragraph.
- `MIN_KEYWORD_MATCHES = 1` says one keyword is the minimum needed for a possible match.
- `MAX_SYMPTOMS = 11` limits selections to 11.
- `MAX_RESOURCE_DISTANCE_KM = 35` defines the distance considered nearby.

### County distance data

- `COUNTY_DISTANCES` is an object containing approximate distances between selected county pairs.
- Each key such as `"Kiambu|Nairobi"` names two counties.
- Each number is the approximate road distance in kilometers.
- These records are used as edges in the county connection graph.

### Condition data

- `conditions` is an array of possible condition records.
- Each `id` is a short internal identifier used to find advice and resources.
- Each `name` is displayed as the probable result.
- Each `keywords` array contains words that can match selected symptom values.
- Each `explanation` is displayed below the probable condition.
- Each `advice` array contains support suggestions that JavaScript turns into list items.
- The same record structure is repeated for ADHD, ASD, dyslexia, dysgraphia, dyscalculia, intellectual disability, and motor disorder.
- The closing brackets and commas finish each record and the complete array.

### Region and local resource data

- `REGION_MAP` maps counties to regional hubs. It documents the intended regional grouping, although the current selection function gathers the existing hub records directly.
- `resourcesByHub` is an object grouped first by hub and then by condition id.
- Every resource record has a `name`, `type`, `locationCounty`, `program`, and `cost`.
- `name` identifies the hospital, clinic, NGO, school, or program.
- `type` labels the kind of resource.
- `locationCounty` is used for distance calculations.
- `program` describes the service.
- `cost` gives an estimate or says that the service is free/subsidized.
- The repeated hub records provide local and regional options for Nairobi, Mombasa, Kisumu, Nakuru, Uasin Gishu, Meru, Kakamega, Garissa, and Turkana.
- The repeated condition arrays under each hub connect each resource to a probable condition.

### Age-, gender-, and online-aware resources

- `profileResources` is a separate array for resources that have additional audience information.
- `conditionIds` says which probable conditions the resource supports.
- `ageMin` and `ageMax` define the supported age range.
- `genders` lists accepted gender values. `any` means the resource is suitable regardless of gender.
- `online: true` tells the selection and rendering code that the resource is available online and has no county distance.
- `url` stores the direct website address instead of generating a Google Maps search.
- The profile records include online resources for ADHD, ASD, learning differences, intellectual disability, and motor/development information.
- The ADHD girls/teens resource is only eligible when the selected gender is female. The other listed online resources accept any gender.
- The `program` and `cost` fields use the same meaning as local resource records.

### Error and symptom functions

- `showSymptomsError(message)` defines the function used to display a symptom error.
- `symptomsError.textContent = message` puts the supplied message into the error paragraph as safe text.
- `classList.remove("hidden")` makes the error visible.
- `setAttribute("aria-invalid", "true")` marks the symptom group as invalid for accessibility and CSS.
- `clearSymptomsError()` defines the opposite operation.
- It clears the message, hides the error, and removes the invalid attribute.
- `getSelectedSymptoms()` finds checked inputs whose name is `symptoms`, converts the result to an array, and returns their values.

### Checkbox limit handler

- `symptomsInput.addEventListener("change", (event) => {` runs whenever a checkbox changes.
- It obtains the current checked values.
- If the number is greater than 11, `event.target.checked = false` immediately unchecks the newly selected checkbox.
- It then displays the maximum-selection error.
- If the number is allowed, it clears any old error.
- The final assignment updates the counter to show the current number and maximum.
- The closing `});` ends the event handler.

### County graph functions

- `getDistanceBetweenCounties(fromCounty, toCounty)` returns a direct distance.
- The equality check returns zero when both counties are the same.
- The sorted array and `join("|")` create the same lookup key regardless of argument order.
- The nullish fallback returns infinity when no direct distance is recorded.
- `getCountyHops(startCounty, maxHops)` finds counties within a maximum number of connections.
- `hops` records the starting county at zero connections.
- `queue` stores counties waiting to be visited.
- The `while` loop processes the queue until it is empty.
- `currentCounty` removes the next county from the queue.
- `currentHops` reads how many connections away that county is.
- The maximum-hop check stops the search from going farther than requested.
- The `for` loop examines every recorded county pair.
- `split("|")` turns a pair key into its two county names.
- The `if` and `else if` statements identify the neighbor connected to the current county.
- The `nextCounty` check avoids missing or already visited counties.
- `hops.set` records the neighbor and `queue.push` schedules it for processing.
- `return hops` returns all discovered connection counts.
- `getShortestCountyDistances(startCounty)` calculates shortest route distances using a Dijkstra-like process.
- `distances` starts the selected county at zero.
- `unvisited` contains the starting county and every county mentioned in the distance data.
- The outer `while` loop continues while there are unvisited counties.
- `currentCounty` and `currentDistance` track the closest unvisited county.
- The inner loop chooses the unvisited county with the smallest known distance.
- If none can be reached, `break` stops the algorithm.
- `unvisited.delete` marks the chosen county as processed.
- The next loop examines its connected counties.
- `routeDistance` adds the current route distance and the next road segment.
- The comparison updates a route only when it is shorter than the old route.
- `return distances` returns the shortest known distance to each reachable county.

### Condition matching

- `matchCondition(symptomsText)` receives the comma-separated selected symptom values.
- `toLowerCase()` makes matching independent of capitalization.
- `bestMatch`, `bestScore`, and `tied` store the current winning condition and tie state.
- The outer loop checks every condition.
- The inner loop checks every keyword for that condition.
- `text.includes(keyword)` tests whether the symptom text contains that keyword.
- Every match increases that condition's score by one.
- A higher score replaces the previous best condition.
- A tied positive score marks the result as unclear.
- If there is no match or the score is below the minimum, the function returns `{ isUnclear: true }`.
- A one-keyword tie is also treated as unclear instead of making an unreliable suggestion.
- Otherwise the winning condition record is returned.

### Resource filtering and ranking

- `resourceMatchesProfile(resource, age, gender)` checks whether a profile resource fits the submitted child.
- The age expression accepts resources without an age limit or checks that the age is between `ageMin` and `ageMax`.
- The gender expression accepts resources without gender restrictions, resources marked `any`, or resources containing the selected gender.
- The function returns true only when both checks pass.
- `getResourcesForCountyAndCondition(county, conditionId, age, gender)` gathers and ranks resources.
- `seen` prevents duplicate names.
- `allResources` collects resources from all hubs.
- `countyHops` calculates nearby county connections.
- `countyDistances` calculates shortest route distances.
- The nested loops gather local records that support the selected condition.
- The `profileResources` loop adds only records supporting the condition and matching age and gender.
- The mapping step adds direct distance, county hops, route distance, and a relevance score to each resource.
- Online resources receive infinite location distance because they are not tied to a county.
- Online resources receive a profile relevance score so they are included and ranked intentionally.
- `nearbyResources` keeps local resources within 35 km and all eligible online resources.
- Its sort puts profile-aware online resources first, then nearer local resources.
- If no nearby/local or online resources exist, the next selection uses resources within one or two county connections.
- If that also fails, the fallback takes the single resource with the shortest known route.
- The final `map` adds a human-readable travel note to every resource.
- Online resources get the message that they are available anywhere in Kenya.
- Same-county resources say they are within the user's county.
- Connected-county resources explain the county and approximate distance.
- Resources with a known route distance describe that route.
- `mapUrl` uses the resource's direct URL when it is online; otherwise it builds a Google Maps search URL.
- `encodeURIComponent` safely places the resource name and county inside the URL.

### Rendering advice and facilities

- `renderAdvice(adviceItems)` displays support suggestions.
- It finds the advice list and removes old list items.
- The loop creates one `<li>` for each advice string.
- `textContent` inserts advice as text rather than interpreting it as HTML.
- `appendChild` adds the new item to the page.
- `renderFacilities(county, conditionId, age, gender)` displays matching resources.
- It finds the resource list and heading.
- It calls the selection function with condition, county, age, and gender.
- `usedFallback` checks whether any displayed resource is beyond the nearby threshold.
- The heading changes to say either nearest resources or resources near the county and includes the child's age.
- The list is cleared before new entries are added.
- If there are no items, a helpful referral message is inserted and the function returns.
- For each facility, a new list item is created.
- `innerHTML` builds its name, type, program, cost, travel note, and link.
- Online entries use `Open online resource`; other entries use the map/resource wording.
- `appendChild` adds the facility entry to the results list.

### Gender controls

- `getGenderValue()` reads the dropdown value.
- If the choice is custom, it returns trimmed custom text or the fallback word `custom`.
- Otherwise it returns the selected dropdown value.
- The gender change listener runs whenever the dropdown changes.
- `isCustom` records whether the custom option is selected.
- `classList.toggle` shows the custom field only for that option.
- The custom input becomes required only when needed.
- When another option is selected, its old custom text is cleared.

### Form submission

- The submit listener runs when the form is submitted.
- `event.preventDefault()` stops a page reload.
- `clearSymptomsError()` removes an old symptom error.
- `new FormData(form)` reads the form values.
- The selected symptoms are read and joined into text for keyword matching.
- The age is converted from form text to a number.
- `getGenderValue()` resolves either a standard or custom gender.
- The county is read from the form.
- The first validation rejects an empty symptom selection.
- The second rejects more than 11 symptoms.
- The age validation accepts only ages 3 through 16.
- The custom gender validation rejects an empty custom value.
- Each validation displays an error or alert, focuses the relevant control where appropriate, and returns early.
- `matchCondition(symptoms)` calculates the probable condition.
- An unclear result displays a detailed message asking for clearer symptom information and stops submission.
- For a valid result, the condition name and explanation are inserted into the results elements.
- `renderAdvice(result.advice)` fills the support list.
- `renderFacilities(county, result.id, age, gender)` searches using all four relevant inputs: county, condition, age, and gender.
- The form's tool section is hidden.
- The results section is shown.
- `scrollIntoView({ behavior: "smooth" })` moves the user smoothly to the results.

### Start over

- The start-over listener runs when the reset button is clicked.
- `form.reset()` restores the original form values.
- The symptom counter returns to zero.
- Any symptom error is cleared.
- The custom gender group is hidden and its required state is removed.
- The results section is hidden.
- The form section is shown again.
- `window.scrollTo` smoothly returns the page to the top.

### Important data behavior

The condition result is a keyword-based suggestion and is not a diagnosis. Existing county resources are generally available to all supported children. Profile resources add explicit age and gender rules, and online resources remain available even when a local hospital or clinic is also found. Resource names, costs, services, and links should be checked regularly because they can change.
