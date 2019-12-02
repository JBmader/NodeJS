express = require('express')
app = express()

var metrics = require('./metrics')

app.set('port', 1337)
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)

app.get(
  '/hello/:name', 
  (req, res) => res.render('hello.ejs', {name: req.params.name})
)

app.get('/metrics.json', (req, res) => {
  metrics.get((err, data) => {
    if(err) throw err
    res.status(200).json(data)
  })
})

app.post('/', (req, res) => {
  // POST
})

app
  .put('/', function (req, res) {
    // PUT
  })
  .delete('/', (req, res) => {
    // DELETE
  })