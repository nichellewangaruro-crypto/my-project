# NDD Usaidizi Kwa Watoto

## Short Overview

NDD Usaidizi Kwa Watoto is a browser-based information and referral tool for parents and caregivers in Kenya. Users select a child's symptoms, age, gender, and county to receive a probable condition category, practical support suggestions, and condition-specific referral resources.

## Problem Statement

Neurodevelopmental disorders are group of conditions that affect how the brain grows and functions. It can be difficult to recognise, and many children in Kenya may not receive timely information, assessment, or support. Families may also have difficulty finding relevant services near their county and understanding possible costs. This usually happens because most parents lack the knowledge of NDDs, how to spot them and how to support their child.

## Solution Statement

This tool provides an accessible first step for identifying a possible area of concern and locating relevant hospitals, clinics, programmes, and learning-support services. It prioritises resources in the selected county, then searches nearby counties and finally provides the nearest available condition-specific resource when closer options are unavailable.

The tool is for information and referral only. It does not provide a formal diagnose for medical conditions.

## Tools Used

- HTML for the page structure and form controls
- CSS for responsive layout, styling, and the sunset-orange and forest-green visual theme
- JavaScript for symptom matching, county-distance calculations, resource selection, estimated costs, and map links
- Google Maps search links for resource locations
- Git and GitHub for version control and project hosting
- Visual Studio Code to present the code for index.html, styles.css and script.js for editing

## Known Limitations

- The probable condition is based on selected keywords and is not a clinical diagnosis.
- Resource information, estimated costs, availability, and services may change and should be confirmed with the provider.
- County distances are approximate route estimates between county centres, not live travel times or exact facility distances.
- The tool can only recommend resources included in its local dataset.
- Google Maps links open an external service and may show search results rather than a verified facility profile.
- The tool does not replace assessment by a qualified healthcare professional.

## Data Privacy Note

The tool runs in the browser and does not send submitted information to a project server or store it in a project database. The information entered into the form is used only to generate the result during the current browser session. Users should avoid entering names, telephone numbers, identification numbers, or other unnecessary personal or sensitive information.

External map links open Google Maps, which is governed by Google's own privacy policy and terms. Users should review those policies before using external services.
