# CA-VA templates

Curriculum Aesthetic - Vitally Accessible templates.

Making curriculums cute without forgetting about all our visually impaired internet friends.

## Requirements

- node

## How to (simple)

1. `git clone` this repo.
2. Execute `npm install`
3. Fill in `sample.json` with your data
4. If you wish to include a photo add it to the `out/assets` folder and add pathname to `sample.json`.
5. Execute `npm run pdf -- JSON_FILENAME`

> [!WARNING]
> Please substitute `JSON_FILENAME` for the name of your json file. Ex: `npm run pdf -- sample`. Do NOT include the `.json`.

## Available layouts

The information is divided into a header, a main and an aside. There are two available layouts "F" and "T" which coincidentally are the letters that seem to be formed by the invisible divisions in each layout.

![T layout](./src/assets/layout_T.png)
![F layout](./src/assets/layout_F.png)

## How to make your own theme

1. Go to `styles/themes.css`
2. Fill in the `data-theme: custom` to your liking

Variables available for modification:

| Variable                  | Tailwind token         | Description                                          |
| ------------------------- | ---------------------- | ---------------------------------------------------- |
| --bg-photo                | bg-photo               | changes photo background colour                      |
| --bg-aside                | bg-aside               | changes aside background colour                      |
| --bg-main                 | bg-main                | changes main background colour                       |
| --bg-header               | bg-header              | changes header background colour                     |
| --bg-main-headers         | bg-main-headers        | changes headers in main content's background colour  |
| --bg-aside-headers        | bg-aside-headers       | changes headers in aside content's background colour |
| --bg-name                 | bg-name                | changes your name's background colour                |
| --bg-brief-description    | bg-brief-description   | changes your brief description's background colour   |
| --text-normal             | text-normal            | changes all the normal text's colour                 |
| --text-soft               | text-soft              | changes the footer's text colour                     |
| --padding-content         | pl-content, pr-content | changes padding between aside and main content       |
| --rounded-all-headers     | rounded-all-headers    | changes rounded corners in all headers               |
| --width-name              | w-name                 | changes name's width                                 |
| --width-brief-description | w-brief-description    | changes brief description's width                    |
| --width-headers           | w-headers              | changes main and aside headers' width                |
| --                        |                        |                                                      |

> [!CAUTION]
> Technically `--padding-page-x` and `--padding-page-y` tokens are available for modification but I recommend you do not modify them as your cv might not be printable.

## How to modify the html then generate the pdf

I recommend creating your own theme instead of this, but if you wish to add features directly to the html, you should do steps 1-4 from the How to (simple) then:

5. Execute `npm run pdf:custom -- JSON_FILENAME`
6. Edit the html to your liking in `out/document-ua.html`
7. Then `npm run build:pdf -- JSON_FILENAME`.

> [!WARNING]
> Please substitute `JSON_FILENAME` for the name of your json file. Ex: `npm run pdf -- sample`. Do NOT include the `.json`.

## Check compliance

I would hope you don't blindly trust my program and want to check that it is actually accessible, so here are some free online resources:

- Checks that it meets PDF/UA && WCAG requirements: [axesCheck](https://check.axes4.com/en/)
- Checks that it meets WCAG color contrast AA & AAA levels on `Firefox`: [WCAG Color contrast checker](https://addons.mozilla.org/en-US/firefox/addon/wcag-contrast-checker/)
- Checks that it meets WCAG color contrast AA & AAA levels on `Chrome`: [WCAG Color contrast checker](https://chromewebstore.google.com/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf?hl=es)

## Recommended contact hrefs

`href` are links that will be "underneath" the value of your contact value. For example, this will make the email clickable and it will redirect the user to send an email. I recommend the following `href`'s according to the contact type you input:

| Contact type | href         |
| ------------ | ------------ |
| email        | mailto:VALUE |
| phone        | tel:VALUE    |

> [!NOTE]
> Substitute VALUE for your email/phone.

## Can I remove the Prince (horizontal P) logo?

Yes if you buy a Prince license or if you replace the prince pdf/ua tagged generator for another one.
