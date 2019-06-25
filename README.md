# scrape-weblink-create-list
This script can be used to scrape links from any number of input webpages and output all of the links into a text file.

<b>Usage:</b> <br>
1. Paste a list of links from where you want to scrape into the input text file. Each link must be separated by a line-break.
2. Run the application passing the selector as a parameter<br>
Example: <code> node index.js ".post > h2 > a" </code><br>
3. Output text file should have a list of all links scraped from each of the input files
