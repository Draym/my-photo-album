const axios = require('axios');
const fs = require('fs')
const path = require('path')

const iconsUrl = {
  'icon-521x512.png':
    'https://drive.google.com/thumbnail?sz=w512-h512&id=1uvrCQxbhr_8EvkoFwXrb_gziwBJTfrE_',
  'icon-192x192.png':
    'https://drive.google.com/thumbnail?sz=w192-h192&id=1uvrCQxbhr_8EvkoFwXrb_gziwBJTfrE_'
}
Object.keys(iconsUrl).forEach((key) => {
  axios.get(iconsUrl[key], { responseType: 'stream' })
    .then((response) => {
      const dest = fs.createWriteStream(
        path.join(__dirname, `../public/icons/${key}`)
      )
      response.data.pipe(dest);
    })
    .catch((err) => console.error('Error downloading icon:', err))
})
