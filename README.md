# README.md

To use docker for local server:

```bash
$ docker run --rm -it \
  -v $(pwd):/src \
  -p 1313:1313 \
  klakegg/hugo:0.101.0 \
  server
```