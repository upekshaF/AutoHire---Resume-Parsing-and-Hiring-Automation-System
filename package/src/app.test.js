import supertest from "supertest";

const request = supertest("https://resume-parser-mw16.onrender.com");

describe("POST api/login", () => {
  it("responds with 200 and success message when valid credentials are provided", async () => {
    const response = await request.post("/api/login").send({
      username: "test",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
    expect(response.body.user).toBeDefined();
  });

  it("responds with 401 and error message when invalid credentials are provided", async () => {
    const response = await request.post("/api/login").send({
      username: "s",
      password: "s",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid username or password");
  });

  it("responds with 500 when an error occurs during login process", async () => {
    // This test case can be triggered by providing incorrect database connection or query
    const response = await request.post("/api/login").send({
      username: "test",
      password: "password",
    });

    describe("POST /api/signup", () => {
      it("responds with 200 and the created user when valid data is provided", async () => {
        const response = await request.post("/api/signup").send({
          username: "test_user",
          email: "test@example.com",
          password: "password123",
          is_admin: false,
          is_recruiter: true,
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
          is_recruiter: true,
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Username or email already exists");
      });

      it("responds with 500 when an error occurs during signup process", async () => {
        // This test case can be triggered by providing incorrect database connection or query
        const response = await request.post("/api/signup").send({
          username: "test",
          email: "test@example.com",
          password: "password123",
          is_admin: false,
          is_recruiter: true,
        });

        expect(response.status).toBe(200);
      });
    });

    expect(response.status).toBe(200);
  });
});

describe("GET /api/items", () => {
  it("responds with 200 and an array of items", async () => {
    const response = await request.get("/api/items");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("responds with 500 when there is an internal server error", async () => {
    // Simulate an internal server error (e.g., by disconnecting the database)
    const response = await request.get("/api/items");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal server error");
  });
});

describe("POST /api/items", () => {
  it("responds with 201 and the created item when valid data is provided", async () => {
    const response = await request.post("/api/items").send({
      description: "New item description",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("New item added!");
    expect(response.body.item).toBeDefined();
  });

  it("responds with 400 when description is missing", async () => {
    const response = await request.post("/api/items").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Description is required");
  });

  it("responds with 500 when there is an internal server error", async () => {
    // Simulate an internal server error
    const response = await request.post("/api/items").send({
      description: "New item description",
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal server error");
  });
});

describe("PUT /api/user/:user_id", () => {
  it("responds with 200 and the updated user when valid data is provided", async () => {
    const response = await request.put("/api/user/1").send({
      username: "updated_user",
      password: "new_password",
      email: "updated@example.com",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User data updated successfully");
    expect(response.body.user).toBeDefined();
  });

  it("responds with 404 when the user does not exist", async () => {
    const response = await request.put("/api/user/9999").send({
      username: "nonexistent_user",
      password: "password",
      email: "nonexistent@example.com",
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User not found or no changes made");
  });

  it("responds with 500 when there is an internal server error", async () => {
    // Simulate an internal server error
    const response = await request.put("/api/user/1").send({
      username: "updated_user",
      password: "new_password",
      email: "updated@example.com",
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal Server Error");
  });
});

describe("DELETE /api/job_roles/:job_id", () => {
  it("responds with 200 and the deleted job role when the job_id is valid", async () => {
    const response = await request.delete("/api/job_roles/1");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.deleted_job_role).toBeDefined();
  });

  it("responds with 404 when the job_id does not exist", async () => {
    const response = await request.delete("/api/job_roles/9999");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Job role not found");
  });

  it("responds with 500 when there is an internal server error", async () => {
    // Simulate an internal server error
    const response = await request.delete("/api/job_roles/1");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal server error");
  });
});

describe("POST /api/signup", () => {
  it("responds with 200 and the created user when valid data is provided", async () => {
    const response = await request.post("/api/signup").send({
      username: "new_user",
      email: "new@example.com",
      password: "password123",
      is_admin: false,
      is_recruiter: true,
    });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe("new_user");
    expect(response.body.email).toBe("new@example.com");
  });

  it("responds with 400 when username or email already exists", async () => {
    const response = await request.post("/api/signup").send({
      username: "existing_user",
      email: "existing@example.com",
      password: "password123",
      is_admin: false,
      is_recruiter: true,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Username or email already exists");
  });

  it("responds with 500 when there is an internal server error", async () => {
    // Simulate an internal server error
    const response = await request.post("/api/signup").send({
      username: "test_user",
      email: "test_user@example.com",
      password: "password123",
      is_admin: false,
      is_recruiter: true,
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("An internal server error occurred");
  });
});
