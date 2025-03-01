# convert-srt-utf8
Easily convert `.srt` subtitle files to UTF-8 encoding. This ensures proper display of special characters (e.g., Croatian letters) that may otherwise appear as symbols.

## How it works

- Detects the encoding of the file using chardet.
- Converts the file to UTF-8 using iconv-lite.
- Saves the output file in the same directory with `_utf8` appended to the filename.

## Install dependencies

```zsh  
npm install chardet iconv-lite fs path
```

## Usage

```zsh 
node convert-srt.js /path/to/your/file.srt
```
