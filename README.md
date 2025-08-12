# README.md

To use docker for local server:

```bash
$ docker run --rm -it \
  -v $(pwd):/src \
  -p 1313:1313 \
  hugomods/hugo:latest \
  server
```

To build

```bash
$ docker run --rm -it \
-v $(pwd):/src \
hugomods/hugo:latest
```

Contents found in `public`