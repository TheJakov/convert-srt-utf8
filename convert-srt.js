const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const chardet = require('chardet');

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Usage: node convert-srt.js <path-to-file>');
    process.exit(1);
}

const inputFile = args[0];
const outputFile = path.join(
    path.dirname(inputFile),
    path.basename(inputFile, path.extname(inputFile)) + '_utf8.srt'
);

// Detect encoding
fs.readFile(inputFile, (err, buffer) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const detectedEncoding = chardet.detect(buffer) || 'win1250'; // Fallback to 'win1250' if detection fails
    console.log(`Detected encoding: ${detectedEncoding}`);

    const decodedText = iconv.decode(buffer, detectedEncoding);
    const utf8Text = iconv.encode(decodedText, 'utf8');

    fs.writeFile(outputFile, utf8Text, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log(`Converted ${inputFile} to UTF-8 as ${outputFile}`);
    });
});
