# README.md

To use docker for local server:

```bash
$ docker run --rm -it \
  -v $(pwd):/src \
  -p 1313:1313 \
  klakegg/hugo:alpine \
  server
```

To build

```bash
$ docker run --rm -it \
-v $(pwd):/src \
-p 1313:1313 \
klakegg/hugo:alpine
```

Contents found in `public`