# A.N. Cambridgian Academy

A.N. Cambridgian Academy is a CBSE-affiliated school in Gorakhpur (Chauri-Chaura, near Tehsil). The homepage carries a quick overview and an admissions notice, and the main pages follow a simple early-years-to-secondary flow.

## Live Demo

Not deployed publicly. Start locally:

```bash
cd an-cambridgian
python3 -m http.server 8101 --directory .
# open http://localhost:8101/
```

## Screenshots

The site shown below was running during capture. Relative paths, file names carry the project slug:

| Desktop | Mobile |
|---|---|
| `screenshots/desktop/an-cambridgian-index-1440x900.png` | `screenshots/mobile/an-cambridgian-index-390x844.png` |

## About the Project

A.N. Cambridgian Academy is a CBSE-affiliated school in Gorakhpur. The site is organised around the school's pages rather than a corporate style.

## Key Features


 - Homepage with school overview and admissions notice
 - About, Academics, Admission, Faculty, Facilities, Gallery pages
 - Contact page with call-to-action and phone number
 - Faculty directory with photographs of staff

## Technology Stack


HTML, CSS, JavaScript; plain static site (no build step)

## Project Structure


 - index, about, academics, admission, contact, faculty, facilities, gallery, foundation + css, js, assets, styles.css, script.js

## Installation and Setup


```bash

cd an-cambridgian

python3 -m http.server 8101 --directory .

# open http://localhost:8101/

```


## My Contribution


The site belongs to the A.N. Cambridgian trust, and this copy was prepared by the owner. The original files were kept in place, this copy was screened for secrets and documented, and the setup and README were written. No source file was rewritten or reformatted.

## Responsive Design


Homepage and inner pages were captured at 1440x900 (desktop) and 390x844 (mobile) earlier this session.

## Security and Privacy


No API keys, tokens, private keys, database credentials, or SMTP credentials were found anywhere in the repository. Public contact details that sit on the live site belong to the organisation or its people and are not something to republish beyond the repo.

## Known Limitations


- The site is a static site and is not deployed online; it is served here for review.

## Future Improvements


- Serve the site from a public host and swap in a live demo link when one becomes available.

## License


No license was found in the source, so the code is not offered for reuse. Speak to the project owner before reusing it.
