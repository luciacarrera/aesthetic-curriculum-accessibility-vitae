# CA-VA templates

Curriculum Aesthetic - Vitally Accessibile templates.

Making curriculums cute without forgetting about all our visually impaired internet friends.

## Requirements

- node

## How to (simple)

1. `git clone` this repo.
2. Execute `npm install`
3. Fill in `sample.json` with your data
4. If you wish to include a photo add it to the `out/assets` folder and add pathname to `sample.json`.
5. Execute `npm run pdf`

## How to (complex/custom)

If you wish to add features that are not available in the template I recommend you do steps 1-4 from the How to (simple) then.

5. Execute `npm run pdf:custom`
6. Edit the html to your liking in `out/document-ua.html`
7. Then `npm run build:pdf`.
