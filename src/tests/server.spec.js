const request = require("supertest");
// const express = require("express");
const app = require("../app");
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use("/", server)



describe("Validaciones a rutas definidas", () => {
  it("Validar Inicio Sesión ", async () => {
const email = 'usuario.test@prueba.cl';
const password = '$2a$10$lIHTV3/htlBP15CKyttzhuz.CIj2lfmsWPcAKN0xLpun5waIOFjpi';


    const resultado = await request(app).post("/login").send(email, password) 
    .then(response => console.log(response))
    expect(resultado.statusCode).toBe(200);
  });

  it("Validar registro de usuario ", async () => {
    const usuario = {
      id: 5,
      nombre: "Usuario",
      apellido_paterno: "Prueba",
      rut: "11.111.111-1",
      email: "usuario.prueba@test.cl",
      telefono: "123456789",
      direccion: "Los Tulipanes 15",
      comuna: "Villa Alemana",
      region: "Valparaiso",
      tipo_user: 0,
      password: "123123",
    };
    const resultado = await request(app).post("/registro").send(usuario)
    expect(resultado.statusCode).toBe(201);
    // expect(resultado.body).toContainEqual(usuario);
  });

  it("Validar actualizar usuario", async () => {
    const usuario = {
      id: 8,
      nombre: "Usuario",
      apellido_paterno: "Prueba Editado",
      rut: "11.111.111-1",
      email: "usuario.test@prueba.cl",
      telefono: "987654321",
      direccion: "Las acacias 20",
      comuna: "Villa Alemana",
      region: "Valparaiso",
      tipo_user: 0,
      password: "123123",
    };
    const resultado = await request(app)
      .put(`/usuario/${usuario.id}`)
      .send(usuario)
    expect(resultado.statusCode).toBe(201);
  });

  it("Validar registro del recinto ", async () => {
    const recinto = {
      id: 1,
      usuarios_id: 8,
      nombre: "Recinto de prueba",
      telefono: "123456789",
      email: "recinto.prueba@test.cl",
      direccion: "San Enrique 15",
      comuna: "Villa Alemana",
      estado: true,
    };
    const resultado = await request(app)
      .post("/registro/recinto")
      .send(recinto)
    expect(resultado.statusCode).toBe(201);
    // expect(resultado.body).toContainEqual(recinto);
  });

  it("Validar actualizar recinto", async () => {
    const recinto = {
      id: 11,
      usuarios_id: 8,
      nombre: "Recinto de prueba editado",
      telefono: "123456789",
      email: "recinto.test.editado@test.cl",
      direccion: "San Enrique 15",
      comuna: "Villa Alemana",
      estado: false,
    };
    const id_recinto = 11;
    const resultado = await request(app)
      .put(`/recinto/${id_recinto}`)
      .send(recinto);
    expect(resultado.statusCode).toBe(201);
  });
});
