describe("Login app", function () {
  beforeEach(function () {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit("http://localhost:3720");
  });
  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2022"
    );
  });
  // 未登录
  it("front page should be no user", function () {
    cy.contains("no user");
  });

  // 登录
  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.contains("cancel");
  });

  // 手动登录
  // it("a new note can be created", function () {
  //   cy.contains("login").click();
  //   cy.get("#username").type("root");
  //   cy.get("#password").type("salainen");
  //   cy.get("#login-button").click();
  // });
  // 登录
  describe("Login", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("root");
    });

    it("succeeds with correct credentials", function () {
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("#password").type("Wrong");
      cy.get("#login-button").click();
      cy.get("div.error").contains("Wrong credentials");

      cy.get("html").should("not.contain", "root logged in");
    });
    // 错误的密码
    it("fails with wrong credentials with error box", function () {
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get("div.error").should("contain", "Wrong credentials");
      // css 判断
      cy.get("div.error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get("div.error").should("have.css", "border-style", "solid");
      // ! 涉及到 "border-style"、"border-radius "和 "padding "的测试，在 Chrome 或 Electron 上会通过，但在 Firefox 上会失败。
    });
  });
});
