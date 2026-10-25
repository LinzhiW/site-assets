# site-assets

3D models and the loader script for the homepage of [linzhigettingit.com](https://www.linzhigettingit.com).

Served through jsDelivr, pinned to a tag:

```
https://cdn.jsdelivr.net/gh/LinzhiW/site-assets@v2/lz-models.js
https://cdn.jsdelivr.net/gh/LinzhiW/site-assets@v2/web/<name>.glb
```

| File | Object |
|---|---|
| `web/folder.glb` | Folder |
| `web/about-me-card.glb` | About Me card |
| `web/sunglasses.glb` | Sunglasses |
| `web/gemtronic-ring.glb` | Gemtronic ring by ASPIRIUM |
| `web/flip-phone.glb` | Flip phone |
| `web/star.glb` | Four-point star |

`lz-models.js` turns each `<div class="lz-model">` into a Google `<model-viewer>`: drag to turn,
click to follow `data-href`. Usage is documented at the top of the file.

After changing a file, push a new tag (`v2`, ...) and update the URLs on the site; jsDelivr caches a
tag's files permanently.
