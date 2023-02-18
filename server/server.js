
const mongoose  = require("mongoose")
const Document = require("./Document")

//mongoose.connect('mongodb://localhost/apptwo' , {
//   useNewUrlParser : true,
//   useUnifiedTopology:true,
//   useFindAndModify: false,
//   useCreateIndex: true,   
//});

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
  mongoose.set('strictQuery', true);

const io = require("socket.io")(3001 , {
    cors: {
        origin:'http://localhost:3000' , 
        methods:['GET' , 'POST']
    },
})

const defaultValue = ""

io.on("connection" , socket =>{
    socket.on('get-document', async documentid =>{
        const document = await findOrCreateDocument(documentid)
        socket.join (documentid)
        socket.emit("load-document" , document.data)


        socket.on("send-changes" , delta => {

        socket.broadcast.to(documentid).emit("receive-changes",delta)
      })
      socket.on("save-document" , async data => {
        await Document.findByIdAndUpdate(documentid , { data })
      })   
    })
})

async function findOrCreateDocument(id){
    if(id == null) return
    const document = await Document.findById(id)
    if (document) return document    
    return await Document.create({ _id: id , data: defaultValue })

}