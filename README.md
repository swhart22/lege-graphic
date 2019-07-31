# Environment Legislation Graphic for NBC Washington.
This is a Webpack project template for a graphic used on our sites. It's configured to output an index.html and bundled script file ready to upload to our server and iframe into the CMS. It features live editing capability via Google Sheets (with Sheetsy), webpack's hot reload functionality for development, and Crosstalk to ensure responsive iframe height in the CMS.

## Requirements
Before you get started, you should have the latest version of Node installed on your machine. That should be it, but if you run into any weird errors, let me know. 

## Development
Clone the github repo or run
```
curl -fsSL https://github.com/swhart22/nbc-ots-gfx/archive/master.tar.gz | tar -xz --strip-components=1
```
From the command line. Then:
```
npm i
```
Then:
```
npm run start
```
Javascript for development for this graphic is in the `src/draw.js` folder.

## Production

Project is live [here](https://www.nbcwashington.com/multimedia/How-Lawmakers-in-Maryland-Virginia-and-DC-Have-Voted-on-Environmental-Legislation-511911552.html).

To compile javascript for production, run:
```
npm run build
```

Test the `index.html` file in your browser just to make sure everything worked, and then push to the server. 
