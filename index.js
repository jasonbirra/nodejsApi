const express = require('express');
const app = express();

app.use(express.json());

const students=[
    {id:1, name: 'Jorge', age: 20, enroll: true },
    {id:2, name: 'Mariana', age: 30,  enroll: false},
    {id:3, name: 'Antonio', age: 25,  enroll: false},
];

//Metodos

app.get('/',(req, res) => {
    res.send('NODE JS - API');
});

//Metodo que muestra todos los estudiantes registrados.

app.get('/api/students', (req, res) => {
    res.send(students);
});


//Metodo que muestra solo el estudiante consultado por su id.
app.get('/api/students/:id',(req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no fue encontrado');
    else res.send(student);
})

//Metodo para agregar un nuevo estudiante.
app.post('/api/students', (req, res) => {    
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };

    students.push(student);
    res.send(student);
});

//Metodo de eliminacion por id.
app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no fue encontrado');
    
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

//Metodo para modificar estudiante.
app.put('/api/students/:id', (req, res) => {    
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no fue encontrado');
        if (student) {
            student.name = (req.body.name)?req.body.name: student.name,
            student.age = (parseInt(req.body.age))?parseInt(req.body.age): student.age,
            student.enroll = (req.body.enroll)?req.body.enroll: student.enroll
        }       
      
    //students.push(student);
    res.send(student);
});

// Puerto donde queremos escuchar (puerto 80)
const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));
