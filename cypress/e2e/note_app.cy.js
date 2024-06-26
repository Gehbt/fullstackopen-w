describe("Note app", function () {
  this.beforeEach(function () {
    cy.viewport(1000, 1000);

    // cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // const user = {
    //   name: 'Matti Luukkainen',
    //   username: 'mluukkai',
    //   password: 'salainen'
    // }
    // cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit("http://localhost:3720");
  });

  describe("when logged in", function () {
    this.beforeEach(function () {
      // 原始：手动输入
      // cy.contains("login").click();
      // cy.get("input:first").type("root");
      // cy.get("input:last").type("salainen");
      // cy.get("#login-button").click();

      // 原始：手动发请求
      // cy.request("POST", "http://localhost:3721/api/login", {
      //   username: "root",
      //   password: "salainen",
      // }).then((response) => {
      //   localStorage.setItem(
      //     "loggedNoteappUser",
      //     JSON.stringify(response.body)
      //   );
      //   cy.visit("http://localhost:3720");
      // });

      cy.login({ username: "root", password: "salainen" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input#note-input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        // 原始：手动注入
        // cy.contains("new note").click();
        // cy.get("input#note-input").type("another note cypress");
        // cy.contains("save").click();

        cy.createNote({
          content: "another note cypress",
          important: false,
        });
      });

      it("it can be made important", function () {
        cy.get("li.note")
          .contains("another note cypress")
          .get("button.note-reset-state")
          .contains("make important")
          .click();

        cy.get("li.note")
          .contains("another note cypress")
          .get("button.note-reset-state")
          .contains("make not important");
      });

      it("then example", function () {
        cy.get("button.show").then((buttons) => {
          console.log("number of buttons", buttons.length);
          cy.wrap(buttons[0]).click();
        });
      });
      it("then example await", async function () {
        const buttons = await cy.get("button.show");
        console.log("number of buttons", buttons.length);
        cy.wrap(buttons[0]).click();
      });
      it("one of those can be made important", function () {
        cy.get("li.note")
          .contains("second note")
          .parent()
          .parent()
          .find("button")
          .click();
        cy.get("li.note")
          .contains("second note")
          .parent()
          .parent()
          .find("button")
          .should("contain", "make not important");

        // # cypress `@` `as`
        cy.contains("second note")
          .parent()
          .parent()
          .find("button")
          .as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });
});
