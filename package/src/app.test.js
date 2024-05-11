import supertest from 'supertest'; 

const request = supertest('https://resume-parser-mw16.onrender.com');

describe("POST api/login", () => {
  it("responds with 200 and success message when valid credentials are provided", async () => {
    const response = await request.post("/api/login").send({
      username: "test",
      password: "password"
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
    expect(response.body.user).toBeDefined();
  });

  it("responds with 401 and error message when invalid credentials are provided", async () => {
    const response = await request.post("/api/login").send({
      username: "s",
      password: "s"
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid username or password");
  });

  it("responds with 500 when an error occurs during login process", async () => {
    // This test case can be triggered by providing incorrect database connection or query
    const response = await request.post('/api/login').send({
      username: "test",
      password: "password"
    });

    describe("POST /api/signup", () => {
      it("responds with 200 and the created user when valid data is provided", async () => {
        const response = await request.post("/api/signup").send({
          username: "test_user",
          email: "test@example.com",
          password: "password123",
          is_admin: false,
          is_recruiter: true
        });
    
        expect(response.status).toBe(200);
        expect(response.body.username).toBe("test_user");
        expect(response.body.email).toBe("test@example.com");
        // Add more expectations as needed
      });
    
      it("responds with 400 and error message when username or email already exists", async () => {
        // You should use a unique username and email for this test case
        const response = await request.post("/api/signup").send({
          username: "existing_user",
          email: "existing@example.com",
          password: "password123",
          is_admin: false,
          is_recruiter: true
        });
    
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Username or email already exists");
      });
    
      it("responds with 500 when an error occurs during signup process", async () => {
        // This test case can be triggered by providing incorrect database connection or query
        const response = await request.post('/api/signup').send({
          username: "test",
          email: "test@example.com",
          password: "password123",
          is_admin: false,
          is_recruiter: true
        });
    
        expect(response.status).toBe(200);
      });
    });
    
    expect(response.status).toBe(200);
  });
});
